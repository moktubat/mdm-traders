import { groq } from 'next-sanity'

// Get all projects (for projects page)
export const projectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc, contractDate desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    category,
    contractDate,
    location,
    client,
    image,
    sortOrder
  }
`

// Get single project by slug (for future project detail pages)
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    category,
    contractDate,
    location,
    client,
    image,
    fullDescription,
    sortOrder
  }
`

// Get projects by category
export const projectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(sortOrder asc, contractDate desc) {
    _id,
    title,
    slug,
    description,
    category,
    contractDate,
    location,
    client,
    image
  }
`

// Get featured/recent projects (limit 3-6)
export const featuredProjectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc, contractDate desc) [0...6] {
    _id,
    title,
    slug,
    description,
    category,
    contractDate,
    location,
    client,
    image
  }
`

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
