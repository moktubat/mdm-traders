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
            'body-camera': 'Body Camera',
            'apx': 'APX',
            'mototrbo': 'MOTOTRBO',
            'tetra': 'TETRA',
        }
        return names[category] || category
    }

    // Build description based on whether product has subcategory
    const buildDescription = () => {
        if (product.cardDescription) {
            return product.cardDescription
        }
        
        const mainCat = getCategoryName(product.mainCategory)
        
        // Body Camera products don't have subcategories
        if (product.mainCategory === 'body-camera') {
            return `${product.title} - Professional ${mainCat}. High-performance body-worn camera solution.`
        }
        
        // Radio products have subcategories
        const subCat = product.subCategory && product.subCategory !== 'none' 
            ? getCategoryName(product.subCategory) 
            : ''
        
        return `${product.title} - Professional ${mainCat} from ${subCat} series. High-performance radio communication solution.`
    }

    // Build keywords
    const keywords = [
        product.title,
        getCategoryName(product.mainCategory),
        'professional communication',
    ]
    
    // Add subcategory to keywords if exists
    if (product.subCategory && product.subCategory !== 'none') {
        keywords.push(getCategoryName(product.subCategory))
    }
    
    // Add category-specific keywords
    if (product.mainCategory === 'body-camera') {
        keywords.push('body worn camera', 'BWC', 'police camera')
    } else {
        keywords.push('two-way radio', 'radio communication', 'professional radio')
    }

    return {
        title: product.title,
        description: buildDescription(),
        keywords,
        openGraph: {
            title: `${product.title} | MDM Traders Limited`,
            description: product.cardDescription || buildDescription(),
            images: product.images?.[0] ? [
                {
                    url: `/api/og?title=${encodeURIComponent(product.title)}`,
                    width: 1200,
                    height: 630,
                }
            ] : ['/favicon.ico'],
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
    // For Body Camera: match by mainCategory
    // For Radio products: match by subCategory
    const relatedProducts = await client.fetch<Product[]>(relatedProductsQuery, {
        subCategory: product.subCategory || 'none',
        mainCategory: product.mainCategory,
        currentId: product._id,
    })

    return <ProductDetail product={product} relatedProducts={relatedProducts} />
}