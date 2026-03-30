/**
 * Blog-only: floating “Back to Contents” + intersection visibility.
 * Call after Blog page DOM is mounted; returns cleanup for route changes.
 */
export function setupBlogToc(): () => void {
  const toc = document.getElementById('blog-toc')
  const btn = document.getElementById('blog-back-toc')
  if (!toc || !btn) return () => {}

  const setBackTocVisible = (visible: boolean) => {
    btn.classList.toggle('fab--visible', visible)
    btn.setAttribute('aria-hidden', String(!visible))
    if (visible) btn.removeAttribute('tabindex')
    else btn.setAttribute('tabindex', '-1')
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const tocInView = entries.some((e) => e.isIntersecting)
      setBackTocVisible(!tocInView)
    },
    { root: null, threshold: 0 },
  )
  observer.observe(toc)

  const onBtnClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    toc.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    toc.focus({ preventScroll: true })
  }
  btn.addEventListener('click', onBtnClick)

  return () => {
    observer.disconnect()
    btn.removeEventListener('click', onBtnClick)
    setBackTocVisible(false)
  }
}
