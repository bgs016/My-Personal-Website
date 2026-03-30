import './style.css'
import { blogPosts } from './blogPosts'

const year = new Date().getFullYear()

/** Served from <code>public/profile.png</code>. */
const PROFILE_IMG_SRC = '/profile.png'

/** Phone — <code>href</code> must be E.164 (<code>tel:+&lt;country&gt;&lt;number&gt;</code>, no spaces). */
const CONTACT_PHONE_HREF = 'tel:+972524800434'
const CONTACT_PHONE_LABEL = '+972 52-4800434'

/** Bio — primary narrative for the site. */
const bioParagraphs = [
  `I am a senior product leader with a multidisciplinary foundation in engineering, business, and behavioral economics. My work focuses on the intersection of product strategy, decision-making, and innovation, with an emphasis on translating complex technological and organizational challenges into clear, structured, and commercially relevant product outcomes.`,
  `I currently serve as Senior Product Line Manager for the Mobility Platform at <a href="https://www.linkedin.com/company/notraffic/" target="_blank" rel="noopener noreferrer">NoTraffic</a>, where I lead product strategy for AI- and edge computing-based solutions designed to optimize intersection management and advance city-scale mobility systems. In this role, I work across the full product lifecycle, aligning strategic direction, roadmap planning, design, engineering execution, go-to-market activities, and post-launch performance. My work requires close coordination across multidisciplinary teams and stakeholders in both Hebrew and English, with a constant focus on creating products that are technically robust, operationally scalable, and strategically differentiated.`,
  `Before joining NoTraffic, I served as Director of Product Management at Radware. Earlier in my career, I spent many years at Motorola Solutions in a range of product and engineering leadership roles. My experience there covered LTE and rugged mobile devices, in-vehicle broadband platforms, public safety communications, and hardware and RF technologies. I was involved in defining global product roadmaps, leading Agile execution, working closely with customers and partners, and supporting collaboration with emerging technology companies through Motorola Solutions Venture Capital. Across these roles, I developed a strong ability to bridge deep technological understanding with market needs, business priorities, and execution discipline.`,
  `My professional focus includes product strategy, prioritization, and cross-functional decision-making, particularly in environments characterized by uncertainty, trade-offs, and competing stakeholder demands. I am especially interested in how product teams assess value, allocate limited resources, and make prioritization decisions under real-world constraints. Frameworks such as RICE are central to this work, not only as operational tools but also as decision architectures that shape organizational judgment. My approach combines analytical rigor, strategic thinking, and practical execution, with a strong interest in improving decision quality rather than relying only on intuition or convention.`,
  `My academic background reflects the same interdisciplinary orientation that shapes my professional work. I hold a B.Eng. in Electrical and Electronics Engineering from Ruppin Academic Center, earned cum laude, an MBA in Technology Management from Tel Aviv University, also earned cum laude, an M.A. in Behavioral Economics, and a Product Management Diploma from the Technion, completed cum laude. My academic research examines how cognitive biases influence product prioritization decisions and how behavioral insights can be used to improve decision-making processes within product organizations.`,
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

/** Career timeline — rendered as static HTML for the Career Path section. */
const careerTimelineHtml = `
    <section id="career-path" class="section section-career section-surface" aria-labelledby="career-heading">
      <div class="prose prose--career">
        <h2 id="career-heading" class="section-heading">Career Path</h2>
        <p class="career-lead">Professional experience and progression across product, engineering, and technology leadership</p>
        <h3 class="career-experience-title" id="career-experience">Experience</h3>
        <div class="timeline">
          <article class="timeline__item">
            <span class="timeline__dot" aria-hidden="true"></span>
            <div class="timeline__content">
              <h4 class="timeline__company"><a href="https://www.linkedin.com/company/notraffic/" target="_blank" rel="noopener noreferrer">NoTraffic</a></h4>
              <p class="timeline__role">Senior Product Line Manager, Mobility Platform</p>
              <p class="timeline__meta"><time datetime="2024-10">Oct 2024</time> – Present</p>
              <div class="timeline__body">
                <p>Leading product strategy for AI- and edge-powered mobility infrastructure, focused on intelligent intersections, real-time traffic operations, and safer, more efficient urban mobility.</p>
              </div>
              <details class="timeline__details" aria-label="Full description: NoTraffic">
                <summary class="timeline__details-summary">Read more</summary>
                <div class="timeline__details-body">
                  <p>Lead product strategy for the Mobility Platform at NoTraffic, advancing AI- and edge-computing solutions for intelligent intersections and city-scale traffic operations. The platform transforms signalized intersections into cloud-connected, automated mobility hubs that detect, classify, and respond in real time to private vehicles, public transportation, emergency services, pedestrians, and other road users. The work is focused on improving traffic flow, reducing emissions, and strengthening road safety through smarter infrastructure.</p>
                </div>
              </details>
            </div>
          </article>

          <article class="timeline__item">
            <span class="timeline__dot" aria-hidden="true"></span>
            <div class="timeline__content">
              <h4 class="timeline__company"><a href="https://www.linkedin.com/company/radware/" target="_blank" rel="noopener noreferrer">Radware</a></h4>
              <p class="timeline__role">Director of Product Management</p>
              <p class="timeline__meta"><time datetime="2021-11">Nov 2021</time> – <time datetime="2024-10">Oct 2024</time></p>
              <div class="timeline__body">
                <p>Led product management in cybersecurity, spanning strategy, partnerships, and cross-functional execution in a complex enterprise environment.</p>
              </div>
              <details class="timeline__details" aria-label="Full description: Radware">
                <summary class="timeline__details-summary">Read more</summary>
                <div class="timeline__details-body">
                  <p>Led product management in a cybersecurity environment, with responsibility spanning product strategy, strategic partnerships, and cross-functional execution. Worked across business, technology, and market-facing functions to shape product direction, strengthen commercial positioning, and support delivery in a complex enterprise setting.</p>
                </div>
              </details>
            </div>
          </article>

          <article class="timeline__item timeline__item--major">
            <span class="timeline__dot" aria-hidden="true"></span>
            <div class="timeline__content">
              <h4 class="timeline__company"><a href="https://www.linkedin.com/company/motorolasolutions/" target="_blank" rel="noopener noreferrer">Motorola Solutions</a></h4>
              <p class="timeline__role timeline__role--era">Product, Engineering, and Technology Leadership</p>
              <p class="timeline__meta timeline__meta--range"><time datetime="1999-11">Nov 1999</time> – <time datetime="2021-11">Nov 2021</time></p>
              <div class="timeline__body">
                <p>Progressed across engineering, hardware leadership, product management, and portfolio strategy in public safety and mobile communications.</p>
              </div>
              <details class="timeline__details" aria-label="Full description: Motorola Solutions overview">
                <summary class="timeline__details-summary">Read more</summary>
                <div class="timeline__details-body">
                  <p>Built a long-term career across engineering, hardware leadership, product management, and portfolio strategy in public safety and mobile communications. Progressed through increasingly senior roles spanning secure devices, broadband solutions, rugged LTE products, and strategic partnerships.</p>
                </div>
              </details>

              <div class="timeline__nested" role="group" aria-label="Roles at Motorola Solutions">
                <div class="timeline__nested-block">
                  <p class="timeline__role">Senior Product Manager, LTE Mobile Devices Portfolio Manager</p>
                  <p class="timeline__meta"><time datetime="2019-05">May 2019</time> – <time datetime="2021-11">Nov 2021</time></p>
                  <div class="timeline__body">
                    <p>Led global strategy, roadmap, go-to-market, and partnerships for rugged LTE mobile devices and related software ecosystems.</p>
                  </div>
                  <details class="timeline__details" aria-label="Full description: LTE Mobile Devices Portfolio Manager">
                    <summary class="timeline__details-summary">Read more</summary>
                    <div class="timeline__details-body">
                      <p>Provided global product leadership across strategy, business development, roadmap planning, positioning, go-to-market strategy, and backlog management for LTE mobile device portfolios in the public safety domain.</p>
                      <p class="timeline__key-label">Key contributions included:</p>
                      <ul class="timeline__bullets">
                        <li>Led portfolio strategy and roadmap development to support sustained business growth and alignment with company objectives.</li>
                        <li>Translated customer needs into product requirements and business documentation, including MRDs, business plans, and training materials.</li>
                        <li>Managed rugged LTE smartphone and in-vehicle product lines, while expanding the ecosystem through internal and external mobile application partnerships.</li>
                        <li>Defined and owned a Unify SDK used by multiple Motorola internal applications and external partners to streamline workflows and integration.</li>
                        <li>Gathered market insight through customer research, sales feedback, and participation in major global industry events.</li>
                        <li>Worked across product teams to prioritize large cross-platform initiatives and strengthen the overall value proposition.</li>
                        <li>Led Agile execution in partnership with architecture and engineering teams, with responsibility for timelines, budgets, release planning, and delivery coordination.</li>
                        <li>Collaborated with Motorola Solutions Venture Capital to identify promising Israeli startups and integrate selected solutions into Motorola&rsquo;s portfolio.</li>
                      </ul>
                    </div>
                  </details>
                </div>

                <div class="timeline__nested-block">
                  <p class="timeline__role">Product Manager, In-Vehicle Broadband Solutions</p>
                  <p class="timeline__meta"><time datetime="2017-01">Jan 2017</time> – <time datetime="2019-05">May 2019</time></p>
                  <div class="timeline__body">
                    <p>Owned product definition, documentation, and business development for in-vehicle broadband solutions.</p>
                  </div>
                  <details class="timeline__details" aria-label="Full description: In-Vehicle Broadband Solutions">
                    <summary class="timeline__details-summary">Read more</summary>
                    <div class="timeline__details-body">
                      <p>Led product definition and business development for in-vehicle broadband solutions, with responsibility for end-to-end strategy and core product documentation.</p>
                      <p class="timeline__key-label">Key contributions included:</p>
                      <ul class="timeline__bullets">
                        <li>Defined product requirements through user stories, epics, MRDs, and business plans.</li>
                        <li>Supported end-to-end product strategy for in-vehicle broadband solutions.</li>
                        <li>Contributed to business development efforts and product-market alignment in a specialized communications environment.</li>
                      </ul>
                    </div>
                  </details>
                </div>

                <div class="timeline__nested-block">
                  <p class="timeline__role">Technical Engineering Manager, Public Safety Broadband Encrypted Devices</p>
                  <p class="timeline__meta"><time datetime="2014-01">Jan 2014</time> – <time datetime="2017-12">Dec 2017</time></p>
                  <div class="timeline__body">
                    <p>Led hardware development of secure Android devices for public safety applications.</p>
                  </div>
                  <details class="timeline__details" aria-label="Full description: Technical Engineering Manager, broadband encrypted devices">
                    <summary class="timeline__details-summary">Read more</summary>
                    <div class="timeline__details-body">
                      <p>Led multidisciplinary hardware development for secure Android-based public safety devices, guiding programs from concept through launch and production.</p>
                      <p class="timeline__key-label">Key contributions included:</p>
                      <ul class="timeline__bullets">
                        <li>Directed the hardware group in the development of a secure Android smartphone for public safety use cases.</li>
                        <li>Led multidisciplinary teams from project initiation through customer launch, ensuring delivery against performance and timing expectations.</li>
                        <li>Coordinated across global development centers to improve execution, communication, and alignment.</li>
                        <li>Supported the transition from development to production across multiple factories worldwide while maintaining quality standards.</li>
                        <li>Served as a central point of contact for vendors, suppliers, and production teams on design and materials issues.</li>
                        <li>Supported onboarding and development of new employees through training and ongoing guidance.</li>
                      </ul>
                    </div>
                  </details>
                </div>

                <div class="timeline__nested-block">
                  <p class="timeline__role">Hardware Engineer, Team Leader, and RF Group Manager</p>
                  <p class="timeline__meta"><time datetime="1999-11">Nov 1999</time> – <time datetime="2014-01">Jan 2014</time></p>
                  <div class="timeline__body">
                    <p>Held engineering and leadership roles across hardware and RF development for encrypted public safety devices.</p>
                  </div>
                  <details class="timeline__details" aria-label="Full description: Hardware Engineer and RF Group Manager era">
                    <summary class="timeline__details-summary">Read more</summary>
                    <div class="timeline__details-body">
                      <p>Held a series of engineering and team leadership roles across hardware and RF development for encrypted public safety devices. This period established a strong technical foundation in product development, systems thinking, and cross-functional execution that later supported the transition into broader product leadership roles.</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="ambient-bg" aria-hidden="true">
    <div class="ambient-glow ambient-glow--cyan"></div>
    <div class="ambient-glow ambient-glow--blue"></div>
  </div>
  <a class="skip" href="#main">Skip to content</a>
  <div class="page-layer">
  <header class="site-header">
    <nav class="nav" aria-label="Primary">
      <a href="#panels" data-tab="bio" id="nav-bio" class="nav-link">Bio</a>
      <a href="#career-path">Career Path</a>
      <a href="#panels" data-tab="blog" id="nav-blog" class="nav-link">Blog</a>
      <a href="#contact">Contact Me</a>
    </nav>
  </header>
  <main id="main" class="main-animate">
    <section id="top" class="intro" aria-labelledby="intro-title">
      <div class="intro-grid">
        <div class="intro-copy">
          <h1 id="intro-title">Guy <span class="name-accent">Shimon</span></h1>
          <p class="hero-lead">Senior product leader across AI, complex HW/SW products, and product strategy</p>
          <p class="hero-tags">Product Management · Behavioral Economics · Inventor on 3 patents</p>
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
    </section>

    <div id="panels" class="tab-section section-surface">
      <div
        class="tab-panel"
        id="panel-bio"
        role="tabpanel"
        aria-labelledby="panel-heading-bio"
      >
        <div class="prose prose--bio">
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
      </div>

      <div
        class="tab-panel tab-panel--hidden"
        id="panel-blog"
        role="tabpanel"
        aria-labelledby="panel-heading-blog"
        hidden
      >
        <div class="prose prose--blog">
        <h2 class="panel-title" id="panel-heading-blog">Blog</h2>
        <p class="panel-lead">
          Notes on <strong>product management</strong> and <strong>behavioral economics</strong> — frameworks, trade-offs, and field notes from building complex products.
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
    </div>

    ${careerTimelineHtml}

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
    </section>
  </main>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <p class="site-footer__copy">© ${year} - Guy Shimon</p>
      <p class="site-footer__quote">“It takes a long time to become young.”</p>
      <p class="site-footer__attr"><span class="site-footer__dash" aria-hidden="true">— </span>Pablo Picasso</p>
    </div>
  </footer>
  </div>

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
