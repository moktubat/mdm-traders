'use client'

import { useCompare } from '@/hooks/useCompare'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowLeft } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

// Helper to get main image
function getThumbnailImage(product: any) {
    const mainImage = product.images.find((img: any) => img.isMainImage)
    return mainImage || product.images[0]
}

// Helper to get category display name
function getCategoryDisplayName(category: string): string {
    const names: Record<string, string> = {
        'portable-radio': 'Portable Radio',
        'mobile-radio': 'Mobile Radio',
        'apx': 'APX',
        'mototrbo': 'MOTOTRBO',
        'tetra': 'TETRA',
    }
    return names[category] || category
}

export default function ProductsComparePage() {
    const { compareProducts, removeFromCompare, clearCompare } = useCompare()
    const router = useRouter()

    // If no products, show message
    if (compareProducts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <h1 className="font-grotesk text-3xl font-bold text-gray-900 mb-4">
                            Product Comparison
                        </h1>
                        <p className="font-nunito text-gray-600 mb-8">
                            You haven't added any products to compare yet.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-3 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Products
                        </Link>
                        <h1 className="font-grotesk text-3xl font-bold text-gray-900">
                            Compare Products ({compareProducts.length}/4)
                        </h1>
                    </div>
                    <button
                        onClick={clearCompare}
                        className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full">
                        <tbody>
                            {/* Product Images & Remove */}
                            <tr className="border-b border-gray-200">
                                <td className="p-4 font-grotesk font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10">
                                    Product
                                </td>
                                {compareProducts.map((product) => {
                                    const image = getThumbnailImage(product)
                                    return (
                                        <td key={product._id} className="p-4 relative">
                                            <button
                                                onClick={() => removeFromCompare(product._id)}
                                                className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
                                                aria-label="Remove product"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-48 h-48 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                                                    <Image
                                                        src={urlFor(image).width(300).height(300).url()}
                                                        alt={image.alt || product.title}
                                                        width={300}
                                                        height={300}
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>

                            {/* Product Title */}
                            <tr className="border-b border-gray-200">
                                <td className="p-4 font-grotesk font-semibold text-gray-900 bg-gray-50 sticky left-0">
                                    Name
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <Link
                                            href={`/products/${product.slug.current}`}
                                            className="font-grotesk font-bold text-gray-900 hover:text-blue-600 transition-colors"
                                        >
                                            {product.title}
                                        </Link>
                                    </td>
                                ))}
                            </tr>

                            {/* Category */}
                            <tr className="border-b border-gray-200 bg-gray-50/50">
                                <td className="p-4 font-grotesk font-semibold text-gray-900 bg-gray-50 sticky left-0">
                                    Category
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md w-fit">
                                                {product.subCategory.toUpperCase()}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {getCategoryDisplayName(product.mainCategory)}
                                            </span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Card Description */}
                            <tr className="border-b border-gray-200">
                                <td className="p-4 font-grotesk font-semibold text-gray-900 bg-gray-50 sticky left-0">
                                    Overview
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <p className="font-nunito text-sm text-gray-700 leading-relaxed">
                                            {product.cardDescription}
                                        </p>
                                    </td>
                                ))}
                            </tr>

                            {/* Short Description (Rich Text) */}
                            <tr className="border-b border-gray-200 bg-gray-50/50">
                                <td className="p-4 font-grotesk font-semibold text-gray-900 bg-gray-50 sticky left-0">
                                    Description
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <div className="font-nunito prose prose-sm max-w-none
                                            [&_h5]:text-sm [&_h5]:font-bold [&_h5]:mt-2 [&_h5]:mb-1 [&_h5]:text-gray-900
                                            [&_p]:mb-2 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-700
                                            [&_strong]:font-bold [&_strong]:text-gray-900
                                            [&_ul]:mb-2 [&_ul]:ml-4 [&_li]:mb-1 [&_li]:text-sm
                                            [&_ol]:mb-2 [&_ol]:ml-4">
                                            {product.shortDescription && (
                                                <PortableText value={product.shortDescription} />
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Actions */}
                            <tr>
                                <td className="p-4 font-grotesk font-semibold text-gray-900 bg-gray-50 sticky left-0">
                                    Actions
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <Link
                                            href={`/products/${product.slug.current}`}
                                            className="inline-block w-full px-4 py-2.5 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Add More Products Notice */}
                {compareProducts.length < 4 && (
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="font-nunito text-sm text-blue-800 text-center">
                            You can compare up to 4 products. Add {4 - compareProducts.length} more{' '}
                            <Link href="/products" className="font-semibold underline hover:text-blue-900">
                                from the products page
                            </Link>
                            .
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}