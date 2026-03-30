import './style.css'
import { blogPosts } from './blogPosts'

const year = new Date().getFullYear()

/** Served from <code>public/profile.png</code>. */
const PROFILE_IMG_SRC = '/profile.png'

/** Bio — primary narrative for the site. */
const bioParagraphs = [
  `I am a senior product leader with a multidisciplinary foundation in engineering, business, and behavioral economics. My work focuses on the intersection of product strategy, decision-making, and innovation, with an emphasis on translating complex technological and organizational challenges into clear, structured, and commercially relevant product outcomes.`,
  `I currently serve as Senior Product Line Manager for the Mobility Platform at <a href="https://www.linkedin.com/company/notraffic/" target="_blank" rel="noopener noreferrer">NoTraffic</a>, where I lead product strategy for AI- and edge computing-based solutions designed to optimize intersection management and advance city-scale mobility systems. In this role, I work across the full product lifecycle, aligning strategic direction, roadmap planning, design, engineering execution, go-to-market activities, and post-launch performance. My work requires close coordination across multidisciplinary teams and stakeholders in both Hebrew and English, with a constant focus on creating products that are technically robust, operationally scalable, and strategically differentiated.`,
  `Before joining NoTraffic, I served as Director of Product Management at Radware. Earlier in my career, I spent many years at Motorola Solutions in a range of product and engineering leadership roles. My experience there covered LTE and rugged mobile devices, in-vehicle broadband platforms, public safety communications, and hardware and RF technologies. I was involved in defining global product roadmaps, leading Agile execution, working closely with customers and partners, and supporting collaboration with emerging technology companies through Motorola Solutions Venture Capital. Across these roles, I developed a strong ability to bridge deep technological understanding with market needs, business priorities, and execution discipline.`,
  `My professional focus includes product strategy, prioritization, and cross-functional decision-making, particularly in environments characterized by uncertainty, trade-offs, and competing stakeholder demands. I am especially interested in how product teams assess value, allocate limited resources, and make prioritization decisions under real-world constraints. Frameworks such as RICE are central to this work, not only as operational tools but also as decision architectures that shape organizational judgment. My approach combines analytical rigor, strategic thinking, and practical execution, with a strong interest in improving decision quality rather than relying only on intuition or convention.`,
  `My academic background reflects the same interdisciplinary orientation that shapes my professional work. I hold a B.E. in Electrical and Electronics Engineering from Ruppin Academic Center, earned cum laude, an MBA in Technology Management from Tel Aviv University, also earned cum laude, an M.A. in Behavioral Economics, and a Product Management Diploma from the Technion, completed cum laude. My academic research examines how cognitive biases influence product prioritization decisions and how behavioral insights can be used to improve decision-making processes within product organizations.`,
  `What distinguishes my perspective is a sustained interest in connecting fields that are often treated separately: technology, economics, psychology, and business strategy. I am particularly drawn to questions around how organizations choose what to build, why certain product decisions appear compelling even when they are systematically biased, and how better decision frameworks can help teams think more clearly and act more effectively. Through this website, I share ideas and insights on product management, behavioral economics, and the practical challenges of decision-making in technology-driven organizations.`,
]

const patentIntroParagraphs = [
  `I am listed as an inventor on multiple U.S. and international patent publications in the fields of wireless communication and hardware design. These patents reflect work spanning RF systems, communication technologies, and engineering solutions for complex embedded and connected devices.`,
]

type PatentPublication = {
  publicationIds: string[]
  title: string
  detail: string
  links: { label: string; url: string }[]
}

const patentPublications: PatentPublication[] = [
  {
    publicationIds: ['US9831579B1'],
    title:
      'Adapter frame with a set of electrical pads on its top and bottom surfaces for a board-to-board connection',
    detail: 'U.S. Patent, granted November 28, 2017',
    links: [
      {
        label: 'View publication',
        url: 'https://patents.google.com/patent/US9831579B1/en',
      },
    ],
  },
  {
    publicationIds: ['US20040137858A1', 'EP1422822A2'],
    title: 'Frequency generation in a wireless communication unit',
    detail:
      'Same patent family: published as a U.S. patent application (July 15, 2004) and as a European patent publication.',
    links: [
      {
        label: 'View US publication',
        url: 'https://patents.google.com/patent/US20040137858A1/en',
      },
      {
        label: 'View European publication',
        url: 'https://patents.google.com/patent/EP1422822A2/en',
      },
    ],
  },
  {
    publicationIds: ['WO 2009/134649 A1'],
    title: 'Tetra DMO range extension',
    detail: '',
    links: [
      {
        label: 'View Patent publication',
        url: 'https://patents.google.com/patent/WO2009134649A1/en',
      },
    ],
  },
]

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="ambient-bg" aria-hidden="true">
    <div class="ambient-glow ambient-glow--cyan"></div>
    <div class="ambient-glow ambient-glow--blue"></div>
  </div>
  <a class="skip" href="#main">Skip to content</a>
  <div class="page-layer">
  <header class="site-header">
    <nav class="nav" aria-label="Primary">
      <a href="#top">Home</a>
      <a href="#panels" data-tab="bio" id="nav-bio" class="nav-link">Bio</a>
      <a href="#panels" data-tab="blog" id="nav-blog" class="nav-link">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main id="main" class="main-animate">
    <section id="top" class="intro" aria-labelledby="intro-title">
      <div class="intro-grid">
        <div class="intro-copy">
          <h1 id="intro-title">Guy <span class="name-accent">Shimon</span></h1>
          <button type="button" class="hero-card glow-hover" id="hero-scroll-panels" aria-label="Scroll to about sections">
            <span class="hero-card__sub">Senior product leader focused on AI, complex HW/SW products, and product strategy in technology-driven environments.</span>
          </button>
        </div>
        <div class="intro-visual">
          <div class="profile-frame">
            <img
              class="profile-img"
              src="${PROFILE_IMG_SRC}"
              width="238"
              height="238"
              alt="Portrait"
            />
          </div>
        </div>
      </div>
    </section>

    <div id="panels" class="tab-section">
      <div
        class="tab-panel"
        id="panel-bio"
        role="tabpanel"
        aria-labelledby="panel-heading-bio"
      >
        <h2 class="panel-title" id="panel-heading-bio">Bio</h2>
        ${bioParagraphs.map((p) => `<p class="panel-text">${p}</p>`).join('')}
        <h3 class="patents-heading">Patents</h3>
        ${patentIntroParagraphs.map((p) => `<p class="panel-text">${p}</p>`).join('')}
        <h4 class="patents-subheading">Selected Patent Publications</h4>
        <ul class="patent-list">
          ${patentPublications
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
            .join('')}
        </ul>
      </div>

      <div
        class="tab-panel tab-panel--hidden"
        id="panel-blog"
        role="tabpanel"
        aria-labelledby="panel-heading-blog"
        hidden
      >
        <h2 class="panel-title" id="panel-heading-blog">Blog</h2>
        <p class="panel-text">
          Notes on <strong>product management</strong> and <strong>behavioral economics</strong> — frameworks, failures, and field notes from building.
        </p>
        <ul class="blog-list">
          ${blogPosts
            .map(
              (post) => `
            <li class="blog-card">
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
            </li>
          `,
            )
            .join('')}
        </ul>
      </div>
    </div>

    <section id="contact" class="section section-tint" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <p class="panel-text">Best place to connect is LinkedIn — email below is also on my public profile.</p>
      <ul class="contact-list">
        <li><a href="https://www.linkedin.com/in/guy-shimon-2b99585/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="mailto:romcarmel2@gmail.com">romcarmel2@gmail.com</a></li>
        <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> <span class="contact-hint">(add your profile URL)</span></li>
      </ul>
    </section>
  </main>
  <footer class="site-footer">
    <p>© ${year} — Guy Shimon · Personal site</p>
  </footer>
  </div>

  <div class="contact-dock" role="navigation" aria-label="Quick contact">
    <div class="contact-dock__inner glass">
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
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="contact-dock__link" title="GitHub">
        <svg class="contact-dock__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
    </div>
  </div>
`

function setupTabs(): void {
  const panels = {
    'tab-bio': document.getElementById('panel-bio')!,
    'tab-blog': document.getElementById('panel-blog')!,
  }

  const tabIdFromNav: Record<string, string> = {
    bio: 'tab-bio',
    blog: 'tab-blog',
  }

  function updateNavActive(selectedId: string): void {
    document.querySelectorAll<HTMLAnchorElement>('a[data-tab].nav-link').forEach((a) => {
      const key = a.dataset.tab
      const tid = key && tabIdFromNav[key]
      const on = tid === selectedId
      a.classList.toggle('nav-link--active', on)
      if (on) a.setAttribute('aria-current', 'page')
      else a.removeAttribute('aria-current')
    })
  }

  function showTab(selectedId: string): void {
    const panelMap: Record<string, HTMLElement> = {
      'tab-bio': panels['tab-bio'],
      'tab-blog': panels['tab-blog'],
    }

    Object.entries(panelMap).forEach(([id, panel]) => {
      const on = id === selectedId
      panel.hidden = !on
      panel.classList.toggle('tab-panel--hidden', !on)
    })
    updateNavActive(selectedId)
  }

  document.querySelectorAll<HTMLAnchorElement>('a[data-tab]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const key = a.dataset.tab
      const tid = key && tabIdFromNav[key]
      if (tid) {
        e.preventDefault()
        showTab(tid)
        document.getElementById('panels')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `#${key}`)
      }
    })
  })

  // Deep link: #bio #blog
  const hash = window.location.hash.slice(1)
  if (hash && tabIdFromNav[hash]) {
    showTab(tabIdFromNav[hash])
    document.getElementById(`nav-${hash}`)?.focus()
  } else {
    showTab('tab-bio')
  }

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.slice(1)
    if (h && tabIdFromNav[h]) showTab(tabIdFromNav[h])
  })
}

setupTabs()

document.getElementById('hero-scroll-panels')?.addEventListener('click', () => {
  document.getElementById('panels')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})
