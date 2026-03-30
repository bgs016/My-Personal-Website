/** Public folder URLs (respect Vite `base` for e.g. GitHub Pages project sites). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const p = path.replace(/^\/+/, '')
  return `${base}${p}`
}
