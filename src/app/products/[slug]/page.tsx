import { client } from '@/lib/sanity'
import { productBySlugQuery, relatedProductsQuery } from '@/lib/queries'
import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/pages/Products/product/ProductDetail'
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await client.fetch<Product>(productBySlugQuery, { slug })

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    // Helper function to get category display name
    const getCategoryName = (category: string) => {
        const names: Record<string, string> = {
            'portable-radio': 'Portable Radio',
            'mobile-radio': 'Mobile Radio',
            'apx': 'APX',
            'mototrbo': 'MOTOTRBO',
            'tetra': 'TETRA',
        }
        return names[category] || category
    }

    return {
        title: product.title,
        description: product.cardDescription || `${product.title} - Professional ${getCategoryName(product.mainCategory)} from ${getCategoryName(product.subCategory)} series. High-performance radio communication solution.`,
        keywords: [
            product.title,
            getCategoryName(product.subCategory),
            getCategoryName(product.mainCategory),
            'two-way radio',
            'radio communication',
            'professional radio'
        ],
        openGraph: {
            title: `${product.title} | MDM Traders Limited`,
            description: product.cardDescription || `Professional ${getCategoryName(product.mainCategory)} solution`,
            images: product.images?.[0] ? [
                {
                    url: `/api/og?title=${encodeURIComponent(product.title)}`,
                    width: 1200,
                    height: 630,
                }
            ] : ['/favicon.png'],
        },
    }
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