import { blogPosts } from './blogPosts'
import { careerTimelineHtml } from './careerTimelineHtml'
import {
  bioParagraphs,
  CONTACT_PHONE_HREF,
  CONTACT_PHONE_LABEL,
  patentIntroParagraphs,
  patentPublications,
  PROFILE_IMG_SRC,
  year,
} from './siteData'
import { setupBackToTop } from './setupBackToTop'
import { setupBlogToc } from './setupBlogToc'
import { blogPostSlug, escapeHtml } from './utils/html'
import { hrefForRoute, pathnameToRoute, type SiteRoute } from './routes'

const PAGE_TITLES: Record<SiteRoute, string> = {
  home: 'Guy Shimon — Bio',
  career: 'Guy Shimon — Career Path',
  blog: 'Guy Shimon — Blog',
  contact: 'Guy Shimon — Contact',
}

let blogTocCleanup: (() => void) | null = null
let backToTopCleanup: (() => void) | null = null

function renderPatentsList(): string {
  return patentPublications
    .map(
      (p) => `
            <li class="patent-list__item">
              <p class="patent-list__id">${p.publicationIds.map((id) => `<span class="patent-list__id-num">${escapeHtml(id)}</span>`).join('<span class="patent-list__id-sep" aria-hidden="true"> · </span>')}</p>
              <p class="patent-list__title">${escapeHtml(p.title)}</p>
              ${p.detail ? `<p class="patent-list__detail">${escapeHtml(p.detail)}</p>` : ''}
              <div class="patent-list__links">
                ${p.links
                  .map(
                    (l) =>
                      `<a class="patent-list__link" href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`,
                  )
                  .join('')}
              </div>
            </li>
          `,
    )
    .join('')
}

function renderIntro(): string {
  return `
    <section id="top" class="intro" aria-labelledby="intro-title">
      <div class="intro-grid">
        <div class="intro-copy">
          <h1 id="intro-title">Guy <span class="name-accent">Shimon</span></h1>
          <p class="hero-lead">Senior product leader in AI, complex HW/SW products, and product strategy.</p>
          <p class="hero-tags">Product Management · Behavioral Economics · Electrical Engineering · Inventor on 3 patents</p>
        </div>
        <div class="intro-visual">
          <div class="profile-frame">
            <img
              class="profile-img"
              src="${PROFILE_IMG_SRC}"
              width="210"
              height="210"
              alt="Guy Shimon"
            />
          </div>
        </div>
      </div>
    </section>`
}

function renderBioSection(): string {
  return `
    <div class="page-section section-surface">
      <div class="prose prose--bio">
        <div class="read-stack--wide">
          <h2 class="panel-title" id="panel-heading-bio">Bio</h2>
          ${bioParagraphs.map((p) => `<p class="panel-text">${p}</p>`).join('')}
        </div>
        <div class="read-stack--wide">
          <h3 class="patents-heading">Patents</h3>
          ${patentIntroParagraphs.map((p) => `<p class="panel-text">${p}</p>`).join('')}
        </div>
        <h4 class="patents-subheading read-stack--wide">Selected Patent Publications</h4>
        <ul class="patent-list">
          ${renderPatentsList()}
        </ul>
      </div>
    </div>`
}

function renderBlogBody(): string {
  return `
        <div class="prose prose--blog">
        <div class="read-stack--wide">
          <h2 class="panel-title" id="panel-heading-blog">Blog</h2>
          <p class="panel-lead">
            Notes on <strong>product management</strong> and <strong>behavioral economics</strong> — frameworks, trade-offs, and field notes from building complex products.
          </p>
        </div>
        <nav class="blog-toc" id="blog-toc" aria-labelledby="blog-toc-heading" tabindex="-1">
          <h3 id="blog-toc-heading" class="blog-toc__heading">Table of Contents</h3>
          <ol class="blog-toc__list">
            ${blogPosts
              .map((post) => {
                const slug = blogPostSlug(post.title)
                const catClass = post.category === 'Product management' ? 'pm' : 'be'
                return `
            <li class="blog-toc__item">
              <a class="blog-toc__link" href="#blog-post-${slug}">
                <span class="blog-toc__link-body">
                  <span class="blog-toc__link-title-row">
                    <span class="blog-toc__link-text">${escapeHtml(post.title)}</span>
                    <span class="blog-toc__link-arrow" aria-hidden="true">
                      <svg class="blog-toc__arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
                    </span>
                  </span>
                  <span class="blog-toc__meta">
                    <span class="blog-toc__cat blog-cat blog-cat--${catClass}">${escapeHtml(post.category)}</span>
                    <span class="blog-toc__date">${escapeHtml(post.date)}</span>
                  </span>
                </span>
              </a>
            </li>`
              })
              .join('')}
          </ol>
        </nav>
        <ul class="blog-list">
          ${blogPosts
            .map(
              (post) => {
                const slug = blogPostSlug(post.title)
                return `
            <li class="blog-card" id="blog-post-${slug}">
              <span class="blog-meta">
                <span class="blog-cat blog-cat--${post.category === 'Product management' ? 'pm' : 'be'}">${escapeHtml(post.category)}</span>
                <span class="blog-date">${escapeHtml(post.date)}</span>
              </span>
              <h3 class="blog-title">${escapeHtml(post.title)}</h3>
              <p class="blog-excerpt">${escapeHtml(post.excerpt)}</p>
              ${
                post.bodyParagraphs?.length
                  ? `<div class="blog-body">${post.bodyParagraphs.map((para) => `<p class="blog-body__p">${escapeHtml(para)}</p>`).join('')}</div>`
                  : ''
              }
            </li>`
              },
            )
            .join('')}
        </ul>
        </div>`
}

function renderContactSection(): string {
  return `
    <section id="contact" class="section section-tint section-contact" aria-labelledby="contact-title">
      <div class="prose prose--contact">
      <h2 id="contact-title" class="section-heading">Contact Me</h2>
      <ul class="contact-list">
        <li>
          <a
            class="contact-list__link"
            href="https://www.linkedin.com/in/guy-shimon-2b99585/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="contact-list__icon contact-list__icon--linkedin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a class="contact-list__link" href="mailto:romcarmel2@gmail.com">
            <svg class="contact-list__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
            <span>romcarmel2@gmail.com</span>
          </a>
        </li>
        <li>
          <a class="contact-list__link" href="${CONTACT_PHONE_HREF}">
            <svg class="contact-list__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>${CONTACT_PHONE_LABEL}</span>
          </a>
        </li>
      </ul>
      </div>
    </section>`
}

function renderBlogBackButton(): string {
  return `
  <button
    type="button"
    class="fab fab--blog-toc blog-back-toc"
    id="blog-back-toc"
    aria-hidden="true"
    tabindex="-1"
    aria-controls="blog-toc"
    aria-label="Back to Table of Contents"
  >
    <svg class="blog-back-toc__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 6h16M4 12h10M4 18h16" />
    </svg>
    <span class="blog-back-toc__label">Back to Contents</span>
  </button>`
}

function renderBackToTopButton(): string {
  return `
  <button
    type="button"
    class="fab fab--back-top"
    id="back-to-top"
    aria-hidden="true"
    tabindex="-1"
    aria-label="Back to the top"
  >
    <span class="fab__label">Back to the top</span>
  </button>`
}

function renderFooter(): string {
  return `
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="site-footer__copy">© ${year} - Guy Shimon</p>
      <p class="site-footer__quote">“It takes a long time to become young.”</p>
      <p class="site-footer__attr"><span class="site-footer__dash" aria-hidden="true">— </span>Pablo Picasso</p>
    </div>
  </footer>`
}

function renderContactDock(): string {
  return `
  <div class="contact-dock" role="navigation" aria-label="Quick contact">
    <div class="contact-dock__inner">
      <a
        href="https://www.linkedin.com/in/guy-shimon-2b99585/"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-dock__link contact-dock__link--linkedin"
        title="LinkedIn"
      >
        <svg class="contact-dock__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="mailto:romcarmel2@gmail.com" class="contact-dock__link" title="Email">
        <svg class="contact-dock__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
      </a>
      <a href="${CONTACT_PHONE_HREF}" class="contact-dock__link" title="Phone">
        <svg class="contact-dock__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
    </div>
  </div>`
}

function renderHeader(): string {
  const links: { route: SiteRoute; label: string }[] = [
    { route: 'home', label: 'Bio' },
    { route: 'career', label: 'Career Path' },
    { route: 'blog', label: 'Blog' },
    { route: 'contact', label: 'Contact Me' },
  ]
  return `
  <header class="site-header" id="site-header">
    <nav class="nav" aria-label="Primary">
      ${links
        .map(
          (l) =>
            `<a href="${hrefForRoute(l.route)}" class="nav-link" data-route="${l.route}">${l.label}</a>`,
        )
        .join('')}
    </nav>
  </header>`
}

function renderMain(route: SiteRoute): string {
  switch (route) {
    case 'home':
      return `
  <main id="main" class="main-animate page-main">
    ${renderIntro()}
    ${renderBioSection()}
  </main>`
    case 'career':
      return `
  <main id="main" class="main-animate page-main">
    ${careerTimelineHtml}
  </main>`
    case 'blog':
      return `
  <main id="main" class="main-animate page-main">
    <div class="page-section section-surface">
      ${renderBlogBody()}
    </div>
  </main>`
    case 'contact':
      return `
  <main id="main" class="main-animate page-main">
    ${renderContactSection()}
  </main>`
    default:
      return ''
  }
}

function setActiveNav(route: SiteRoute): void {
  document.querySelectorAll<HTMLElement>('.nav-link[data-route]').forEach((el) => {
    const r = el.dataset.route as SiteRoute
    const on = r === route
    el.classList.toggle('nav-link--active', on)
    if (on) el.setAttribute('aria-current', 'page')
    else el.removeAttribute('aria-current')
  })
}

function setDocumentTitle(route: SiteRoute): void {
  document.title = PAGE_TITLES[route]
}

function scrollToBlogPostIfHash(): void {
  const hash = window.location.hash.slice(1)
  if (!hash.startsWith('blog-post-')) return
  const el = document.getElementById(hash)
  if (!el) return
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })
}

export function mountApp(): void {
  blogTocCleanup?.()
  blogTocCleanup = null
  backToTopCleanup?.()
  backToTopCleanup = null

  const route = pathnameToRoute(location.pathname)
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
  <div class="ambient-bg" aria-hidden="true">
    <div class="ambient-glow ambient-glow--cyan"></div>
    <div class="ambient-glow ambient-glow--blue"></div>
  </div>
  <a class="skip" href="#main">Skip to content</a>
  <div class="page-layer">
  ${renderHeader()}
  ${renderMain(route)}
  ${renderFooter()}
  </div>
  ${route !== 'blog' ? renderBackToTopButton() : ''}
  ${route === 'blog' ? renderBlogBackButton() : ''}
  ${renderContactDock()}
  `

  setActiveNav(route)
  setDocumentTitle(route)

  if (route === 'blog') {
    blogTocCleanup = setupBlogToc()
    if (window.location.hash.startsWith('#blog-post-')) {
      scrollToBlogPostIfHash()
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  } else {
    backToTopCleanup = setupBackToTop()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}
