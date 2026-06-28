import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { registerSW } from 'virtual:pwa-register'
import { queryClient } from './lib/queryClient'
import App from './App.tsx'
import './index.css'

// Remove stale dev service workers left over from earlier PWA dev mode
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => void registration.unregister())
  })
  void caches?.keys().then((keys) => {
    keys.forEach((key) => void caches.delete(key))
  })
}

if (import.meta.env.PROD) {
  registerSW({
    onNeedRefresh() {
      if (confirm('A new version is available. Reload to update?')) {
        window.location.reload()
      }
    },
    onOfflineReady() {
      console.info('CalorieTracker is ready to work offline.')
    },
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
