import { toast } from 'react-toastify';
import { useStore } from '@nanostores/react';
import { herenowConnection } from '~/lib/stores/herenow';
import { workbenchStore } from '~/lib/stores/workbench';
import { webcontainer } from '~/lib/webcontainer';
import { path } from '~/utils/path';
import { useState } from 'react';
import type { ActionCallbackData } from '~/lib/runtime/message-parser';
import { chatId } from '~/lib/persistence/useChatHistory';
import { formatBuildFailureOutput } from './deployUtils';

export function useHereNowDeploy() {
  const [isDeploying, setIsDeploying] = useState(false);
  const herenowConn = useStore(herenowConnection);
  const currentChatId = useStore(chatId);

  const handleHereNowDeploy = async () => {
    // Anonymous publish needs no connection — a token only upgrades the site to permanent.
    if (!currentChatId) {
      toast.error('No active chat found');
      return false;
    }

    try {
      setIsDeploying(true);

      const artifact = workbenchStore.firstArtifact;

      if (!artifact) {
        throw new Error('No active project found');
      }

      // Create a deployment artifact for visual feedback
      const deploymentId = `deploy-artifact`;
      workbenchStore.addArtifact({
        id: deploymentId,
        messageId: deploymentId,
        title: 'here.now Deployment',
        type: 'standalone',
      });

      const deployArtifact = workbenchStore.artifacts.get()[deploymentId];

      // Notify that build is starting
      deployArtifact.runner.handleDeployAction('building', 'running', { source: 'herenow' });

      // Set up build action
      const actionId = 'build-' + Date.now();
      const actionData: ActionCallbackData = {
        messageId: 'herenow build',
        artifactId: artifact.id,
        actionId,
        action: {
          type: 'build' as const,
          content: 'npm run build',
        },
      };

      artifact.runner.addAction(actionData);
      await artifact.runner.runAction(actionData);

      const buildOutput = artifact.runner.buildOutput;

      if (!buildOutput || buildOutput.exitCode !== 0) {
        deployArtifact.runner.handleDeployAction('building', 'failed', {
          error: formatBuildFailureOutput(buildOutput?.output),
          source: 'herenow',
        });
        throw new Error('Build failed');
      }

      // Notify that build succeeded and deployment is starting
      deployArtifact.runner.handleDeployAction('deploying', 'running', { source: 'herenow' });

      const container = await webcontainer;

      // Remove /home/project from buildPath if it exists
      const buildPath = buildOutput.path.replace('/home/project', '');

      let finalBuildPath = buildPath;

      // List of common output directories to check if the specified build path doesn't exist
      const commonOutputDirs = [buildPath, '/dist', '/build', '/out', '/output', '/.next', '/public'];

      let buildPathExists = false;

      for (const dir of commonOutputDirs) {
        try {
          await container.fs.readdir(dir);
          finalBuildPath = dir;
          buildPathExists = true;
          console.log(`Using build directory: ${finalBuildPath}`);
          break;
        } catch (error) {
          console.log(`Directory ${dir} doesn't exist, trying next option. ${error}`);
          continue;
        }
      }

      if (!buildPathExists) {
        throw new Error('Could not find build output directory. Please check your build configuration.');
      }

      // NOTE: files are read as utf-8 strings — fine for HTML/CSS/JS/JSON/SVG (what legal
      // tools mostly emit). Binary images/fonts (png/woff2) may need base64 handling as a follow-up.
      async function getAllFiles(dirPath: string): Promise<Record<string, string>> {
        const files: Record<string, string> = {};
        const entries = await container.fs.readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dirPath, entry.name);

          if (entry.isFile()) {
            const content = await container.fs.readFile(fullPath, 'utf-8');
            const deployPath = fullPath.replace(finalBuildPath, '');
            files[deployPath] = content;
          } else if (entry.isDirectory()) {
            const subFiles = await getAllFiles(fullPath);
            Object.assign(files, subFiles);
          }
        }

        return files;
      }

      const fileContents = await getAllFiles(finalBuildPath);

      // Re-publish to the same site for this chat when we have a stored slug.
      const existingSlug = localStorage.getItem(`herenow-site-${currentChatId}`);

      const response = await fetch('/api/herenow-deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: fileContents,
          token: herenowConn.token || undefined,
          slug: existingSlug || undefined,
          chatId: currentChatId,
          displayName: artifact.title || 'LawJam tool',
        }),
      });

      const data = (await response.json()) as {
        siteUrl?: string;
        slug?: string;
        anonymous?: boolean;
        claimToken?: string;
        claimUrl?: string;
        expiresInSeconds?: number;
        error?: string;
      };

      if (data.error || !data.siteUrl) {
        deployArtifact.runner.handleDeployAction('deploying', 'failed', {
          error: data.error || 'Invalid publish response',
          source: 'herenow',
        });
        throw new Error(data.error || 'Invalid publish response');
      }

      // Store the slug so the next publish updates the same site.
      if (data.slug) {
        localStorage.setItem(`herenow-site-${currentChatId}`, data.slug);
      }

      deployArtifact.runner.handleDeployAction('complete', 'complete', {
        url: data.siteUrl,
        source: 'herenow',
      });

      toast.success(`🌐 Published to ${data.siteUrl}`);

      if (data.anonymous) {
        toast.info('Live for 24h — connect a here.now API key to keep it permanently.');

        if (data.claimUrl) {
          console.log('here.now claim URL:', data.claimUrl, 'claimToken:', data.claimToken);
        }
      }

      return true;
    } catch (error) {
      console.error('Publish error:', error);
      toast.error(error instanceof Error ? error.message : 'Publish failed');

      return false;
    } finally {
      setIsDeploying(false);
    }
  };

  return {
    isDeploying,
    handleHereNowDeploy,
    isConnected: !!herenowConn.token,
  };
}
