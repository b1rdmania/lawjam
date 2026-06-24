import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => [
  { title: 'LawJam — build a legal tool. Just describe it.' },
  {
    name: 'description',
    content: 'LawJam lets lawyers build working legal tools by describing them — no code, grounded in real law.',
  },
];

export const loader = () => json({});

// LawJam home = the builder (chat-first, like Bolt/Lovable). Marketing pages live at /about, /faq, /signup.
export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
