/**
 * Non-blog pages: show floating “Back to the top” when the site header scrolls out of view.
 */
export function setupBackToTop(): () => void {
  const btn = document.getElementById('back-to-top')
  const header = document.getElementById('site-header')
  if (!btn || !header) return () => {}

  const setVisible = (visible: boolean) => {
    btn.classList.toggle('fab--visible', visible)
    btn.setAttribute('aria-hidden', String(!visible))
    if (visible) btn.removeAttribute('tabindex')
    else btn.setAttribute('tabindex', '-1')
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const headerVisible = entries[0]?.isIntersecting ?? true
      setVisible(!headerVisible)
    },
    { root: null, threshold: 0, rootMargin: '0px' },
  )
  observer.observe(header)

  const onClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  btn.addEventListener('click', onClick)

  return () => {
    observer.disconnect()
    btn.removeEventListener('click', onClick)
    setVisible(false)
  }
}
