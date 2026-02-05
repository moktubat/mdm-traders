export interface Project {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  description: string
  category: 'completed' | 'in-progress'
  contractDate: string
  location: string
  client: string
  image: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  fullDescription?: any[]
  sortOrder?: number
}