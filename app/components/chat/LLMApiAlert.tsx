import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { LlmErrorAlertType } from '~/types/actions';
import { classNames } from '~/utils/classNames';

interface Props {
  alert: LlmErrorAlertType;
  clearAlert: () => void;
}

export default function LlmErrorAlert({ alert, clearAlert }: Props) {
  const { description, provider, errorType } = alert;
  const [showDetails, setShowDetails] = useState(false);

  const getErrorMessage = () => {
    switch (errorType) {
      case 'authentication':
        return `Authentication failed with ${provider}. Please check your API key.`;
      case 'rate_limit':
        return `Rate limit exceeded for ${provider}. Please wait a moment and try again.`;
      case 'quota':
        return `Quota exceeded for ${provider}. Please check your account limits.`;
      default:
        return 'Something went wrong building that. Try again, or rephrase your request.';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 px-4 py-3 mb-2"
      >
        <div className="flex items-start gap-3">
          <div className="i-ph:warning-circle-duotone text-base text-accent-700 mt-0.5 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-sm text-bolt-elements-textPrimary leading-relaxed">{getErrorMessage()}</p>

            <div className="mt-2 flex items-center gap-3 text-xs">
              <button
                onClick={clearAlert}
                className="text-accent-700 font-medium hover:underline focus:outline-none"
              >
                Try again
              </button>

              {description && (
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  className={classNames(
                    'flex items-center gap-1 text-bolt-elements-textSecondary',
                    'hover:text-bolt-elements-textPrimary focus:outline-none transition-colors',
                  )}
                >
                  <span>Details</span>
                  <span className={showDetails ? 'i-ph:caret-up' : 'i-ph:caret-down'} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {showDetails && description && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <pre className="mt-2 whitespace-pre-wrap break-words font-mono text-xs text-bolt-elements-textSecondary bg-bolt-elements-background-depth-3 rounded p-2.5">
                    {description}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
