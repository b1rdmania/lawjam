import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames('flex items-center px-4 border-b h-[var(--header-height)]', {
        'border-transparent': !chat.started,
        'border-bolt-elements-borderColor': chat.started,
      })}
    >
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-bold flex items-center tracking-[-0.02em]">
          <span className="text-bolt-elements-textPrimary">Law</span>
          <span className="text-accent">Jam</span>
        </a>
      </div>
      {chat.started ? (
        <>
          <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
            <ClientOnly>{() => <ChatDescription />}</ClientOnly>
          </span>
          <ClientOnly>
            {() => (
              <div className="">
                <HeaderActionButtons chatStarted={chat.started} />
              </div>
            )}
          </ClientOnly>
        </>
      ) : (
        <nav className="ml-auto flex items-center gap-6 text-sm text-bolt-elements-textSecondary">
          <a href="/about" className="hover:text-bolt-elements-textPrimary transition-theme">
            About
          </a>
          <a href="/faq" className="hover:text-bolt-elements-textPrimary transition-theme">
            FAQ
          </a>
        </nav>
      )}
    </header>
  );
}
