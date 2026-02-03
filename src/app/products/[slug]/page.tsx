import { client } from '@/lib/sanity'
import { productBySlugQuery, relatedProductsQuery } from '@/lib/queries'
import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/pages/Products/product/ProductDetail'

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
    // Await params to get the slug
    const { slug } = await params

    // Fetch product by slug
    const product = await client.fetch<Product>(productBySlugQuery, { slug })
    if (!product) notFound()

    // Fetch related products
    const relatedProducts = await client.fetch<Product[]>(relatedProductsQuery, {
        subCategory: product.subCategory,
        currentId: product._id,
    })

    return <ProductDetail product={product} relatedProducts={relatedProducts} />
}