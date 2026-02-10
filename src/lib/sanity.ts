import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '13zwx11y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-02',
  useCdn: true,
  perspective: 'published',
})

// Helper function to generate image URLs - using named export
const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}