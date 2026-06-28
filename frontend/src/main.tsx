import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { registerSW } from 'virtual:pwa-register'
import { queryClient } from './lib/queryClient'
import App from './App.tsx'
import './index.css'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
