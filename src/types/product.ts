export interface Product {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  mainCategory: 'portable-radio' | 'mobile-radio' | 'body-camera' | 'accessories'
  subCategory?: 'apx' | 'mototrbo' | 'tetra' | 'none' | 'mototrbo-two-way-radios' | 'consumer-two-way-radios'
  subSubCategory?:
  | 'batteries'
  | 'charger-accessories'
  | 'portable-radios-accessories'
  | 'audio-accessories'
  | 'batteries-and-chargers'
  | 'headphones-earpieces-microphones'
  | 'cases-and-carry-accessories'
  subSubSubCategory?:
  | 'multi-unit-chargers'
  | 'single-unit-chargers'
  | 'impres-batteries'
  | 'original-two-way-radio-batteries'
  | '800m-antenna'
  | 'adapters-for-antennas'
  | 'uhf-antenna-portable-radios'
  | 'ear-microphone-solutions'
  | 'earsets-and-earpieces'
  | 'headsets'
  images: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    isMainImage?: boolean
  }[]
  cardDescription: string
  shortDescription: any[]
  fullDescription?: any[]
  sortOrder?: number
}