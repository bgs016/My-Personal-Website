export type SiteRoute = 'home' | 'career' | 'blog' | 'contact'

export function normalizePathname(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') || ''
  let path = pathname
  if (base && path.startsWith(base)) path = path.slice(base.length) || '/'
  path = path.replace(/\/$/, '') || '/'
  return path
}

export function pathnameToRoute(pathname: string): SiteRoute {
  const path = normalizePathname(pathname)
  if (path === '/' || path === '/bio') return 'home'
  if (path === '/career-path') return 'career'
  if (path === '/blog') return 'blog'
  if (path === '/contact') return 'contact'
  return 'home'
}

/** Href for nav links (respects Vite `base` for subpath deploys). */
export function hrefForRoute(route: SiteRoute): string {
  const b = import.meta.env.BASE_URL
  if (route === 'home') return b
  const seg = route === 'career' ? 'career-path' : route === 'blog' ? 'blog' : 'contact'
  return `${b}${seg}`.replace(/\/{2,}/g, '/')
}
