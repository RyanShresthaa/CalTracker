import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

export default function InstallPWA() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('pwa-install-dismissed') === '1',
  )
  const [installed, setInstalled] = useState(isStandalone)

  useEffect(() => {
    const onInstallReady = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setInstallEvent(null)
    }

    window.addEventListener('beforeinstallprompt', onInstallReady)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onInstallReady)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed || dismissed || !installEvent) return null

  const handleInstall = async () => {
    await installEvent.prompt()
    const { outcome } = await installEvent.userChoice
    if (outcome === 'accepted') setInstallEvent(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', '1')
    setDismissed(true)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md lg:left-auto lg:right-6 lg:max-w-sm">
      <Card>
        <CardContent className="p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0">
            <Download className="h-5 w-5 text-on-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm">Install CalTracker</p>
            <p className="text-xs text-muted mt-0.5">Add to your home screen for quick access.</p>
            <div className="flex gap-2 mt-3">
              <Button type="button" onClick={handleInstall} size="sm" className="text-xs">
                Install
              </Button>
              <Button type="button" onClick={handleDismiss} variant="outline" size="sm" className="text-xs">
                Not now
              </Button>
            </div>
          </div>
          <Button type="button" onClick={handleDismiss} variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
