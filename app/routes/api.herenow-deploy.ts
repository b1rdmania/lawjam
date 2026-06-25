import { type ActionFunctionArgs, json } from '@remix-run/cloudflare';

interface DeployRequestBody {
  files: Record<string, string>;
  token?: string;
  slug?: string;
  chatId: string;
  displayName?: string;
}

const HERENOW_HOST = 'https://here.now';
const CLIENT_HEADER = 'lawjam/publish';

// Minimal extension -> MIME map for the static files legal tools emit.
const MIME_BY_EXT: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  woff2: 'font/woff2',
  ico: 'image/x-icon',
  txt: 'text/plain; charset=utf-8',
  map: 'application/json; charset=utf-8',
  webmanifest: 'application/manifest+json',
};

function contentTypeFor(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() ?? '';
  return MIME_BY_EXT[ext] ?? 'application/octet-stream';
}

async function sha256Hex(content: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function readError(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return `${response.status} ${response.statusText}`;
  }
}

export async function action({ request, context }: ActionFunctionArgs) {
  try {
    const { files, token, slug, chatId, displayName } = (await request.json()) as DeployRequestBody;

    if (!files || Object.keys(files).length === 0) {
      return json({ error: 'No files to publish' });
    }

    // Resolve the key: prefer the request token, else the env binding. No key = anonymous publish.
    const apiKey = token || context.cloudflare?.env?.HERENOW_API_KEY || '';
    const isAnonymous = !apiKey;

    const baseHeaders: Record<string, string> = {
      'content-type': 'application/json',
      'X-HereNow-Client': CLIENT_HEADER,
    };

    if (apiKey) {
      baseHeaders.Authorization = `Bearer ${apiKey}`;
    }

    // NOTE: files arrive as utf-8 strings (matching bolt's Netlify path). Fine for
    // HTML/CSS/JS/JSON/SVG. Binary assets (png/woff2/etc) would need base64 handling
    // for both the size/hash and the presigned PUT body — follow-up, not blocking.

    // STEP 1 — Build the manifest and create (or update) the site.
    const manifest = await Promise.all(
      Object.entries(files).map(async ([path, content]) => {
        const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
        return {
          path: normalizedPath,
          size: new TextEncoder().encode(content).length,
          contentType: contentTypeFor(normalizedPath),
          hash: await sha256Hex(content),
        };
      }),
    );

    const body = JSON.stringify({
      files: manifest,
      ttlSeconds: null,
      displayName: displayName || 'LawJam tool',
      displayDescription: 'Built with LawJam',
    });

    const createUrl = slug ? `${HERENOW_HOST}/api/v1/publish/${slug}` : `${HERENOW_HOST}/api/v1/publish`;
    const createResponse = await fetch(createUrl, {
      method: slug ? 'PUT' : 'POST',
      headers: baseHeaders,
      body,
    });

    if (!createResponse.ok) {
      return json({ error: `Failed to create site: ${await readError(createResponse)}` });
    }

    const created = (await createResponse.json()) as any;
    const upload = created.upload;

    if (!upload || !Array.isArray(upload.uploads)) {
      return json({ error: 'Unexpected response from here.now (no upload plan)' });
    }

    // Map normalized path -> content for the upload step.
    const contentByPath: Record<string, string> = {};

    for (const [path, content] of Object.entries(files)) {
      contentByPath[path.startsWith('/') ? path.slice(1) : path] = content;
    }

    // STEP 2 — Upload each presigned file (server-side to avoid CORS). Skipped files are already stored.
    for (const entry of upload.uploads) {
      const fileContent = contentByPath[entry.path];

      if (fileContent === undefined) {
        return json({ error: `Missing content for upload path ${entry.path}` });
      }

      const putResponse = await fetch(entry.url, {
        method: entry.method || 'PUT',
        headers: entry.headers || {},
        body: fileContent,
      });

      if (!putResponse.ok) {
        return json({ error: `Failed to upload ${entry.path}: ${await readError(putResponse)}` });
      }
    }

    // STEP 3 — Finalize.
    const finalizeUrl = upload.finalizeUrl || `${HERENOW_HOST}/api/v1/publish/${created.slug}/finalize`;
    const finalizeResponse = await fetch(finalizeUrl, {
      method: 'POST',
      headers: baseHeaders,
      body: JSON.stringify({ versionId: upload.versionId }),
    });

    if (!finalizeResponse.ok) {
      return json({ error: `Failed to finalize: ${await readError(finalizeResponse)}` });
    }

    const finalized = (await finalizeResponse.json()) as any;

    return json({
      siteUrl: finalized.siteUrl || created.siteUrl,
      slug: finalized.slug || created.slug,
      anonymous: isAnonymous,
      claimToken: created.claimToken,
      claimUrl: created.claimUrl,
      expiresInSeconds: upload.expiresInSeconds,
    });
  } catch (error) {
    console.error('here.now deploy error:', error);
    return json({ error: error instanceof Error ? error.message : 'Publish failed' });
  }
}
