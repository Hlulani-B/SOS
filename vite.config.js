import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env for the dev server too. Prefix '' loads every variable,
  // including RESEND_API_KEY, which deliberately has no VITE_ prefix so
  // it is never injected into the client bundle.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // The browser cannot call api.resend.com directly (CORS blocks it),
        // so the app posts to /api/emails on its own origin and the dev
        // server forwards the request to Resend, attaching the API key
        // server-side where it is never exposed to the client.
        '/api/emails': {
          target: 'https://api.resend.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY || ''}`
          }
        }
      }
    }
  }
})
