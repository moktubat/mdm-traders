export interface Product {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  mainCategory: 'portable-radio' | 'mobile-radio' | 'body-camera'
  subCategory?: 'apx' | 'mototrbo' | 'tetra' | 'none'
  images: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    isMainImage?: boolean
  }[]
  cardDescription: string // For product cards in listings (plain text)
  shortDescription: any[] // Portable Text for detail page under title
  fullDescription?: any[] // Portable Text blocks for full details
  sortOrder?: number
}