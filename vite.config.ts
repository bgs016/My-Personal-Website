import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Connect } from 'vite'
import { defineConfig } from 'vite'

function spaFallbackMiddleware(middlewares: Connect.Server): void {
  middlewares.use((req, _res, next) => {
    if (req.method !== 'GET' || req.url === undefined) return next()
    const path = req.url.split('?')[0]
    if (
      path === '/' ||
      path.startsWith('/@') ||
      path.startsWith('/src/') ||
      path.startsWith('/node_modules') ||
      /\.[a-zA-Z0-9]+$/.test(path)
    ) {
      return next()
    }
    req.url = '/index.html'
    next()
  })
}

/**
 * SPA fallback so `/blog`, `/career-path`, etc. serve `index.html` in dev and preview.
 */
function spaFallbackPlugin(): {
  name: string
  configureServer: (server: { middlewares: Connect.Server }) => void
  configurePreviewServer: (server: { middlewares: Connect.Server }) => void
} {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      spaFallbackMiddleware(server.middlewares)
    },
    configurePreviewServer(server) {
      spaFallbackMiddleware(server.middlewares)
    },
  }
}

/** Static hosts (e.g. GitHub Pages) need `404.html` = SPA shell with hashed assets. */
function copy404Plugin(): { name: string; closeBundle: () => void } {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [spaFallbackPlugin(), copy404Plugin()],
  build: {
    target: 'es2020',
    cssMinify: true,
  },
})
