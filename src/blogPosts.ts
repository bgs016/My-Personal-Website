import hardwarePost from './posts/hardware-vs-software-pm.txt?raw'
import behavioralPost from './posts/pm-meets-behavioral-economics.txt?raw'

export type BlogCategory = 'Product management' | 'Behavioral economics'

export type BlogPost = {
  title: string
  date: string
  excerpt: string
  category: BlogCategory
  bodyParagraphs?: string[]
}

function splitBody(text: string): string[] {
  return text
    .trim()
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
}

export const blogPosts: BlogPost[] = [
  {
    title: 'Hardware Product Management Is Not Software Product Management',
    date: 'March 2026',
    excerpt:
      'Product management is often described as a single discipline. In practice, the role changes substantially depending on what is being built—and hardware vs. software product work follows different laws of execution.',
    category: 'Product management',
    bodyParagraphs: splitBody(hardwarePost),
  },
  {
    title: 'Where Product Management Meets Behavioral Economics',
    date: 'March 2026',
    excerpt:
      'Frameworks assume clearer analysis yields better decisions. Product work is also a problem of judgment: how people behave inside prioritization, roadmaps, and trade-offs when information is incomplete.',
    category: 'Behavioral economics',
    bodyParagraphs: splitBody(behavioralPost),
  },
]
