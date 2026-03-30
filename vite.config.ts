import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Connect, Plugin } from 'vite'
import { defineConfig } from 'vite'

/**
 * GitHub Pages project sites are served at https://<user>.github.io/<repo>/
 * Vite must use base=/repo/ so /assets/* resolves under the repo (otherwise CSS/JS 404).
 *
 * Vercel/Netlify/Cloudflare: always base=/ (root). Only use repo subpath on GitHub Actions
 * (GITHUB_ACTIONS=true), so a stray GITHUB_REPOSITORY env on Vercel cannot break the build.
 */
function resolveBase(): string {
  if (process.env.VERCEL || process.env.VERCEL_ENV || process.env.NETLIFY || process.env.CF_PAGES) {
    return '/'
  }

  const explicit = process.env.VITE_BASE_URL?.trim()
  if (explicit) {
    return explicit.endsWith('/') ? explicit : `${explicit}/`
  }

  if (process.env.GITHUB_ACTIONS === 'true') {
    const gh = process.env.GITHUB_REPOSITORY
    if (gh) {
      const repo = gh.split('/')[1]
      if (repo) return `/${repo}/`
    }
  }

  return '/'
}

/** Root-absolute `/favicon.svg` in index.html does not get `base`; rewrite for subpath deploys. */
function injectHtmlBaseHref(base: string): Plugin {
  return {
    name: 'inject-html-base-href',
    transformIndexHtml(html: string) {
      return html.replace(/href="\/favicon\.svg"/g, `href="${base}favicon.svg"`)
    },
  }
}

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

/**
 * Netlify / Cloudflare Pages read `dist/_headers`. First match wins — list assets before `/*`.
 * Prefix matches Vite `base` (e.g. `/repo/` on GitHub Pages project sites).
 */
function emitDeployHeadersFile(base: string): Plugin {
  const prefix = base === '/' ? '' : base.replace(/\/$/, '')
  return {
    name: 'emit-deploy-headers',
    closeBundle() {
      const assetPath = prefix ? `${prefix}/assets/*` : '/assets/*'
      const indexPath = prefix ? `${prefix}/index.html` : '/index.html'
      const notFoundPath = prefix ? `${prefix}/404.html` : '/404.html'
      const starPath = prefix ? `${prefix}/*` : '/*'
      const content = `${assetPath}
  Cache-Control: public, max-age=31536000, immutable

${indexPath}
  Cache-Control: no-cache, must-revalidate

${notFoundPath}
  Cache-Control: no-cache, must-revalidate

${starPath}
  Cache-Control: public, max-age=0, must-revalidate
`
      writeFileSync(resolve(process.cwd(), 'dist', '_headers'), content, 'utf8')
    },
  }
}

const base = resolveBase()

export default defineConfig({
  base,
  plugins: [injectHtmlBaseHref(base), spaFallbackPlugin(), copy404Plugin(), emitDeployHeadersFile(base)],
  build: {
    target: 'es2020',
    cssMinify: true,
  },
})
