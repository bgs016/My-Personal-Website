export const year = new Date().getFullYear()

/** Served from <code>public/profile.png</code>. */
export const PROFILE_IMG_SRC = '/profile.png'

/** Phone — <code>href</code> must be E.164. */
export const CONTACT_PHONE_HREF = 'tel:+972524800434'
export const CONTACT_PHONE_LABEL = '+972 52-4800434'

export const bioParagraphs = [
  `I am a senior product leader with a multidisciplinary foundation in engineering, business, and behavioral economics. My work focuses on the intersection of product strategy, decision-making, and innovation, with an emphasis on translating complex technological and organizational challenges into clear, structured, and commercially relevant product outcomes.`,
  `I currently serve as Senior Product Line Manager for the Mobility Platform at <a href="https://www.linkedin.com/company/notraffic/" target="_blank" rel="noopener noreferrer">NoTraffic</a>, where I lead product strategy for AI- and edge computing-based solutions designed to optimize intersection management and advance city-scale mobility systems. In this role, I work across the full product lifecycle, aligning strategic direction, roadmap planning, design, engineering execution, go-to-market activities, and post-launch performance. My work requires close coordination across multidisciplinary teams and stakeholders in both Hebrew and English, with a constant focus on creating products that are technically robust, operationally scalable, and strategically differentiated.`,
  `Before joining NoTraffic, I served as Director of Product Management at Radware. Earlier in my career, I spent many years at Motorola Solutions in a range of product and engineering leadership roles. My experience there covered LTE and rugged mobile devices, in-vehicle broadband platforms, public safety communications, and hardware and RF technologies. I was involved in defining global product roadmaps, leading Agile execution, working closely with customers and partners, and supporting collaboration with emerging technology companies through Motorola Solutions Venture Capital. Across these roles, I developed a strong ability to bridge deep technological understanding with market needs, business priorities, and execution discipline.`,
  `My professional focus includes product strategy, prioritization, and cross-functional decision-making, particularly in environments characterized by uncertainty, trade-offs, and competing stakeholder demands. I am especially interested in how product teams assess value, allocate limited resources, and make prioritization decisions under real-world constraints. Frameworks such as RICE are central to this work, not only as operational tools but also as decision architectures that shape organizational judgment. My approach combines analytical rigor, strategic thinking, and practical execution, with a strong interest in improving decision quality rather than relying only on intuition or convention.`,
  `My academic background reflects the same interdisciplinary orientation that shapes my professional work. I hold a B.Eng. in Electrical and Electronics Engineering from Ruppin Academic Center, earned cum laude, an MBA in Technology Management from Tel Aviv University, also earned cum laude, an M.A. in Behavioral Economics, and a Product Management Diploma from the Technion, completed cum laude. My academic research examines how cognitive biases influence product prioritization decisions and how behavioral insights can be used to improve decision-making processes within product organizations.`,
  `What distinguishes my perspective is a sustained interest in connecting fields that are often treated separately: technology, economics, psychology, and business strategy. I am particularly drawn to questions around how organizations choose what to build, why certain product decisions appear compelling even when they are systematically biased, and how better decision frameworks can help teams think more clearly and act more effectively. Through this website, I share ideas and insights on product management, behavioral economics, and the practical challenges of decision-making in technology-driven organizations.`,
]

export const patentIntroParagraphs = [
  `I am listed as an inventor on multiple U.S. and international patent publications in the fields of wireless communication and hardware design. These patents reflect work spanning RF systems, communication technologies, and engineering solutions for complex embedded and connected devices.`,
]

export type PatentPublication = {
  publicationIds: string[]
  title: string
  detail: string
  links: { label: string; url: string }[]
}

export const patentPublications: PatentPublication[] = [
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
