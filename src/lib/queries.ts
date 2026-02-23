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

// ─── PRODUCT QUERIES ──────────────────────────────────────────────────────────

export const productsQuery = groq`
  *[_type == "product"] | order(sortOrder asc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    mainCategory,
    subCategory,
    subSubCategory,
    subSubSubCategory,
    images,
    cardDescription,
    shortDescription,
    sortOrder
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    mainCategory,
    subCategory,
    subSubCategory,
    subSubSubCategory,
    images,
    cardDescription,
    shortDescription,
    fullDescription,
    sortOrder
  }
`

// Related products query — matches deepest available category level
export const relatedProductsQuery = groq`
  *[_type == "product" && _id != $currentId &&
    (
      // Match by deepest level first: subSubSubCategory
      ($subSubSubCategory != null && subSubSubCategory == $subSubSubCategory) ||
      // Then subSubCategory
      ($subSubCategory != null && $subSubSubCategory == null && subSubCategory == $subSubCategory) ||
      // Then subCategory (for accessories without deeper levels, or radio products)
      ($subCategory != null && $subSubCategory == null && subCategory == $subCategory) ||
      // Fallback: same mainCategory (body camera / accessories at top level)
      (mainCategory == $mainCategory && subCategory == null)
    )
  ] | order(sortOrder asc) [0...4] {
    _id,
    title,
    slug,
    images,
    mainCategory,
    subCategory,
    subSubCategory,
    subSubSubCategory,
    cardDescription,
    shortDescription
  }
`