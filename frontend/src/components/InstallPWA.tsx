import { useEffect, useState } from 'react';
import { Download, X } from 'phosphor-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export default function InstallPWA() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('pwa-install-dismissed') === '1',
  );
  const [installed, setInstalled] = useState(isStandalone);

  useEffect(() => {
    const onInstallReady = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener('beforeinstallprompt', onInstallReady);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onInstallReady);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed || dismissed || !installEvent) return null;

  const handleInstall = async () => {
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') setInstallEvent(null);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', '1');
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md lg:left-auto lg:right-6 lg:max-w-sm">
      <div className="card shadow-xl border border-indigo-100 dark:border-indigo-900/50 p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
          <Download size={20} className="text-white" weight="bold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 dark:text-white text-sm">Install CalorieTracker</p>
          <p className="text-xs text-slate-500 mt-0.5">Add to your home screen for quick access like a native app.</p>
          <div className="flex gap-2 mt-3">
            <button type="button" onClick={handleInstall} className="btn-primary text-xs py-2 px-3">
              Install
            </button>
            <button type="button" onClick={handleDismiss} className="btn-secondary text-xs py-2 px-3">
              Not now
            </button>
          </div>
        </div>
        <button type="button" onClick={handleDismiss} className="text-slate-400 hover:text-slate-600 p-1">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
