import './style.css'

const year = new Date().getFullYear()

/** LinkedIn profile photos can’t be reliably hotlinked. Add `public/profile.jpg` and set this to <code>'/profile.jpg'</code>. */
const PROFILE_IMG_SRC = '/profile.svg'

/** Summarized from your public LinkedIn “About” (linkedin.com/in/guy-shimon-2b99585). */
const bioParagraphs = [
  `I’m a Senior Product Line Manager for the Mobility Platform at <a href="https://www.linkedin.com/company/notraffic/" target="_blank" rel="noopener noreferrer">NoTraffic</a>—working on AI and edge computing for smarter, safer intersections and city-scale mobility. I’m bilingual (Hebrew/English) and focus on aligning strategy, roadmap, design, engineering, go-to-market, and post-launch performance so product value is clear in the market.`,
  `Earlier I was Director of Product Management at Radware and spent many years at Motorola Solutions in product and engineering leadership—LTE and rugged devices, in-vehicle broadband, public safety communications, and hardware/RF—leading global roadmaps, Agile execution with engineering, customer-facing work (VoC, conventions), and startup partnerships via Motorola Solutions Venture Capital.`,
  `Education: BE in Electrical and Electronics Engineering (Ruppin Academic Center, cum laude), MBA in Technology Management (Tel Aviv University, cum laude), and a Product Management Diploma (Technion, cum laude). On this site I write longer notes on product management and behavioral economics.`,
]

/** USPTO Assignment Center — assignor SHIMON, GUY (authoritative list of assignments). */
const USPTO_ASSIGNMENTS_URL =
  'https://assignmentcenter.uspto.gov/search/patent/assigneeAssignorDetails%3FexactAssignorName%3DSHIMON,%20GUY'

/**
 * Title + publication/grant id. Replace `US …` for the first two with your exact U.S. numbers from the USPTO link below if they differ.
 * Tetra DMO: WO publication verified on Google Patents (Guy Shimon, Motorola); adjust if your third patent is different.
 */
const patents: { title: string; number: string }[] = [
  {
    title:
      'Adapter frame with a set of electrical pads on its top and bottom surfaces for a board-to-board connection',
    number: 'US …',
  },
  {
    title: 'Frequency generation in a wireless communication unit',
    number: 'US …',
  },
  {
    title: 'Tetra DMO range extension',
    number: 'WO 2009/134649 A1',
  },
]

/**
 * LinkedIn doesn’t list personal hobbies. Below: interests that match your profile—replace or extend freely.
 */
const hobbies = [
  'Smart mobility, traffic safety, and how cities adopt AI at the edge',
  'Agile delivery, roadmaps, and cross-functional product leadership',
  'Hardware–software products: from RF and devices to cloud-connected platforms',
  'Personal time: add what you love outside work—sports, music, travel, etc.',
]

type BlogCategory = 'Product management' | 'Behavioral economics'

type BlogPost = {
  title: string
  date: string
  excerpt: string
  category: BlogCategory
}

/** Starter posts — replace or extend as you publish. */
const blogPosts: BlogPost[] = [
  {
    title: 'Why prioritization is a behavioral problem, not a spreadsheet problem',
    date: 'Coming soon',
    excerpt:
      'Frameworks help, but the hard part is attention, social proof, and what feels “safe” to stakeholders. A short note on what actually moves the roadmap.',
    category: 'Product management',
  },
  {
    title: 'Defaults, friction, and the stories we tell users',
    date: 'Coming soon',
    excerpt:
      'A placeholder for a piece on choice architecture in product flows — when to nudge, when to stay out of the way, and how to test ethically.',
    category: 'Behavioral economics',
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
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="logo" href="#top">GS</a>
    <nav class="nav" aria-label="Primary">
      <a href="#top">Home</a>
      <a href="#panels" data-tab="bio">Bio</a>
      <a href="#panels" data-tab="hobbies">Hobbies</a>
      <a href="#panels" data-tab="blog">Blog</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main id="main">
    <section id="top" class="intro" aria-labelledby="intro-title">
      <div class="intro-grid">
        <div class="intro-visual">
          <img
            class="profile-img"
            src="${PROFILE_IMG_SRC}"
            width="280"
            height="280"
            alt="Portrait"
          />
        </div>
        <div class="intro-copy">
          <p class="eyebrow">Hello — I'm</p>
          <h1 id="intro-title">Guy Shimon</h1>
          <p class="lede">
            Senior Product Line Manager (Mobility Platform) at NoTraffic — smart intersections, AI, and the next generation of traffic operations.
            I also write here about product management and behavioral economics.
          </p>
        </div>
      </div>
    </section>

    <div id="panels" class="tab-section">
      <div class="tab-bar-wrap">
        <div class="tab-bar" role="tablist" aria-label="About sections">
          <button type="button" class="tab" role="tab" id="tab-bio" aria-selected="true" aria-controls="panel-bio">Bio</button>
          <button type="button" class="tab" role="tab" id="tab-hobbies" aria-selected="false" aria-controls="panel-hobbies">Hobbies</button>
          <button type="button" class="tab" role="tab" id="tab-blog" aria-selected="false" aria-controls="panel-blog">Blog</button>
        </div>
      </div>

      <div
        class="tab-panel"
        id="panel-bio"
        role="tabpanel"
        aria-labelledby="tab-bio"
      >
        <h2 class="panel-title">Bio</h2>
        ${bioParagraphs.map((p) => `<p class="panel-text">${p}</p>`).join('')}
        <h3 class="patents-heading">Patents</h3>
        <p class="panel-text">I’m named on three patents:</p>
        <ul class="patent-plain">
          ${patents
            .map(
              (p) => `
            <li>
              <span class="patent-title">${escapeHtml(p.title)}</span>
              <span class="patent-sep" aria-hidden="true"> — </span>
              <span class="patent-number">${escapeHtml(p.number)}</span>
            </li>
          `,
            )
            .join('')}
        </ul>
        <p class="panel-text patent-uspto-link">
          <a href="${USPTO_ASSIGNMENTS_URL}" target="_blank" rel="noopener noreferrer">USPTO Assignment Center</a>
          (assignor: SHIMON, GUY)
        </p>
      </div>

      <div
        class="tab-panel tab-panel--hidden"
        id="panel-hobbies"
        role="tabpanel"
        aria-labelledby="tab-hobbies"
        hidden
      >
        <h2 class="panel-title">Hobbies</h2>
        <p class="panel-text">Interests aligned with my LinkedIn profile, plus room for personal hobbies:</p>
        <ul class="hobby-list">
          ${hobbies.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>

      <div
        class="tab-panel tab-panel--hidden"
        id="panel-blog"
        role="tabpanel"
        aria-labelledby="tab-blog"
        hidden
      >
        <h2 class="panel-title">Blog</h2>
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
`

function setupTabs(): void {
  const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="tablist"] [role="tab"]'))
  const panels = {
    'tab-bio': document.getElementById('panel-bio')!,
    'tab-hobbies': document.getElementById('panel-hobbies')!,
    'tab-blog': document.getElementById('panel-blog')!,
  }

  function showTab(selectedId: string): void {
    const panelMap: Record<string, HTMLElement> = {
      'tab-bio': panels['tab-bio'],
      'tab-hobbies': panels['tab-hobbies'],
      'tab-blog': panels['tab-blog'],
    }

    tabs.forEach((tab) => {
      const on = tab.id === selectedId
      tab.setAttribute('aria-selected', on ? 'true' : 'false')
      tab.tabIndex = on ? 0 : -1
    })

    Object.entries(panelMap).forEach(([id, panel]) => {
      const on = id === selectedId
      panel.hidden = !on
      panel.classList.toggle('tab-panel--hidden', !on)
    })
  }

  const tabIdFromNav: Record<string, string> = {
    bio: 'tab-bio',
    hobbies: 'tab-hobbies',
    blog: 'tab-blog',
  }

  function syncHashFromTabId(tabId: string): void {
    const hash = Object.entries(tabIdFromNav).find(([, v]) => v === tabId)?.[0]
    if (hash) history.replaceState(null, '', `#${hash}`)
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

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      showTab(tab.id)
      syncHashFromTabId(tab.id)
    })
    tab.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(tab)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const next = tabs[(i + 1) % tabs.length]
        next.focus()
        showTab(next.id)
        syncHashFromTabId(next.id)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = tabs[(i - 1 + tabs.length) % tabs.length]
        prev.focus()
        showTab(prev.id)
        syncHashFromTabId(prev.id)
      } else if (e.key === 'Home') {
        e.preventDefault()
        tabs[0].focus()
        showTab(tabs[0].id)
        syncHashFromTabId(tabs[0].id)
      } else if (e.key === 'End') {
        e.preventDefault()
        const last = tabs[tabs.length - 1]
        last.focus()
        showTab(last.id)
        syncHashFromTabId(last.id)
      }
    })
  })

  // Deep link: #bio #hobbies #blog
  const hash = window.location.hash.slice(1)
  if (hash && tabIdFromNav[hash]) {
    showTab(tabIdFromNav[hash])
    document.getElementById(tabIdFromNav[hash])?.focus()
  }

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.slice(1)
    if (h && tabIdFromNav[h]) showTab(tabIdFromNav[h])
  })
}

setupTabs()
