import { PortableTextBlock } from '@portabletext/types'

export interface ProductImage {
  _key: string
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  isMainImage?: boolean
}

export interface Product {
  _id: string
  _type: 'product'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
    _type: 'slug'
  }
  mainCategory: 'motorola-solutions' | 'cambium-networks'
  subCategory?: 'apx-series' | 'talkabout' | 'tetra' | 'mototrbo' | 'none'
  images: ProductImage[]
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  sortOrder: number
}

export interface ProductsResponse {
  products: Product[]
  total: number
}