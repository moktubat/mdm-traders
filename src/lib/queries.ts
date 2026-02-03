import { groq } from 'next-sanity'

// Get all products
export const productsQuery = groq`
  *[_type == "product"] | order(sortOrder asc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    mainCategory,
    subCategory,
    images,
    shortDescription,
    sortOrder
  }
`

// Get single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    mainCategory,
    subCategory,
    images,
    shortDescription,
    fullDescription,
    sortOrder
  }
`

// Get 4 related products from same sub-category (excluding current product)
export const relatedProductsQuery = groq`
  *[_type == "product" && subCategory == $subCategory && _id != $currentId] | order(sortOrder asc) [0...4] {
    _id,
    title,
    slug,
    images,
    mainCategory,
    subCategory,
    shortDescription
  }
`
