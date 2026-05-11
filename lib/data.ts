import type { Project, Service, ProcessStep, Client } from '@/types'

export const projects: Project[] = [
  {
    id: 'maison-noir',
    title: 'Maison Noir',
    client: 'Maison Noir Wines',
    category: 'identity',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80',
  },
  {
    id: 'folio-quarterly',
    title: 'Folio Quarterly',
    client: 'Folio Publishing',
    category: 'editorial',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=80',
  },
  {
    id: 'arc-packaging',
    title: 'Arc Spirits',
    client: 'Arc Distillery',
    category: 'packaging',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=900&q=80',
  },
  {
    id: 'atlas-brand',
    title: 'Atlas Brand System',
    client: 'Atlas Architecture',
    category: 'identity',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  },
  {
    id: 'meridian-print',
    title: 'Meridian Annual',
    client: 'Meridian Capital',
    category: 'print',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=900&q=80',
  },
  {
    id: 'verve-web',
    title: 'Verve Digital',
    client: 'Verve Agency',
    category: 'web',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
  },
]

export const services: Service[] = [
  {
    id: 'identity',
    number: '01',
    title: 'Brand Identity',
    description: 'Visual systems that define how a brand occupies space — in print, digital, and memory.',
    tags: ['Logo Systems', 'Visual Identity', 'Brand Guidelines', 'Art Direction'],
  },
  {
    id: 'print',
    number: '02',
    title: 'Print Production',
    description: 'From business cards to large-format — produced with precision and obsessive material attention.',
    tags: ['Business Print', 'Large Format', 'Specialty Finishes', 'Proofing'],
  },
  {
    id: 'editorial',
    number: '03',
    title: 'Editorial & Publications',
    description: "Magazines, lookbooks, and annual reports that read as well as they're held.",
    tags: ['Magazines', 'Lookbooks', 'Annual Reports', 'Catalogs'],
  },
  {
    id: 'packaging',
    number: '04',
    title: 'Packaging Design',
    description: 'Structural and graphic packaging that turns product into experience at the moment of touch.',
    tags: ['Product Packaging', 'Label Design', 'Structural Design', 'Retail Displays'],
  },
  {
    id: 'web',
    number: '05',
    title: 'Web Design',
    description: 'Digital spaces that carry the same weight and intention as the print work they accompany.',
    tags: ['Web Design', 'Motion', 'UI Systems', 'Development'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin with deep listening. Understanding your brand, audience, and objectives before a single mark is made.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Strategic creative exploration. Multiple directions developed with rigorous rationale, not aesthetic whim.',
  },
  {
    number: '03',
    title: 'Refinement',
    description: 'Collaborative iteration toward a singular solution. Every detail interrogated until nothing can be improved.',
  },
  {
    number: '04',
    title: 'Production',
    description: 'From approved concept to finished artifact — managed with the same precision as the design itself.',
  },
]

export const clients: Client[] = [
  { name: 'Maison Noir' },
  { name: 'Atlas Architecture' },
  { name: 'Meridian Capital' },
  { name: 'Verve Agency' },
  { name: 'Arc Distillery' },
  { name: 'Folio Publishing' },
  { name: 'Studio Novak' },
  { name: 'Harbour & Co.' },
  { name: 'The Vine Group' },
  { name: 'Kessler & Bloom' },
]
