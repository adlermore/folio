export interface Project {
  id: string
  title: string
  client: string
  category: 'identity' | 'print' | 'editorial' | 'packaging' | 'web'
  year: string
  image: string
  accentColor?: string
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  tags: string[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Client {
  name: string
}

export interface ContactFormValues {
  name: string
  email: string
  company?: string
  service: string
  message: string
}
