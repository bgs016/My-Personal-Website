import { mountApp } from './appRender'
import { normalizePathname } from './routes'

const APP_PATHS = new Set(['/', '/bio', '/career-path', '/blog', '/contact'])

function isAppPath(pathname: string): boolean {
  return APP_PATHS.has(normalizePathname(pathname))
}

export function initRouter(): void {
  window.addEventListener('popstate', () => {
    mountApp()
  })

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a')
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return
    const href = a.getAttribute('href')
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return

    let u: URL
    try {
      u = new URL(a.href, location.href)
    } catch {
      return
    }
    if (u.origin !== location.origin) return
    if (!isAppPath(u.pathname)) return

    const next = normalizePathname(u.pathname)
    const cur = normalizePathname(location.pathname)
    if (next === cur && u.hash) return

    if (next === cur && !u.hash) {
      e.preventDefault()
      return
    }

    e.preventDefault()
    history.pushState({}, '', u.pathname + u.search + u.hash)
    mountApp()
  })
}
