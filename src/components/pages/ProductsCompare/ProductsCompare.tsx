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
            <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="overflow-hidden">
                        <table className="w-full table-fixed">
                            <colgroup>
                                <col style={{ width: '150px' }} />
                                {compareProducts.map((product) => (
                                    <col key={product._id} />
                                ))}
                            </colgroup>
                            <tbody>
                                {/* Product Images & Remove */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-3 font-grotesk font-semibold text-sm text-gray-900 bg-gray-50 align-top">
                                        Product
                                    </td>
                                    {compareProducts.map((product, index) => {
                                        const image = getThumbnailImage(product)
                                        return (
                                            <td
                                                key={product._id}
                                                className={`p-3 relative align-top ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
                                            >
                                                <button
                                                    onClick={() => removeFromCompare(product._id)}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10"
                                                    aria-label="Remove product"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-full aspect-square max-w-45 bg-white rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center mx-auto">
                                                        <Image
                                                            src={urlFor(image).width(300).height(300).url()}
                                                            alt={image.alt || product.title}
                                                            width={300}
                                                            height={300}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>

                                {/* Product Title */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-3 font-grotesk font-semibold text-sm text-gray-900 bg-gray-50 align-top">
                                        Name
                                    </td>
                                    {compareProducts.map((product, index) => (
                                        <td key={product._id} className={`p-3 align-top ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                            <Link
                                                href={`/products/${product.slug.current}`}
                                                className="font-grotesk font-bold text-sm leading-tight text-gray-900 hover:text-blue-600 transition-colors line-clamp-3 block"
                                            >
                                                {product.title}
                                            </Link>
                                        </td>
                                    ))}
                                </tr>

                                {/* Category */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-3 font-grotesk font-semibold text-sm text-gray-900 bg-gray-50 align-top">
                                        Category
                                    </td>
                                    {compareProducts.map((product, index) => (
                                        <td key={product._id} className={`p-3 align-top ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                            <div className="flex flex-col gap-1.5">
                                                <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md w-fit">
                                                    {product.subCategory.toUpperCase()}
                                                </span>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {getCategoryDisplayName(product.mainCategory)}
                                                </span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Card Description */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-3 font-grotesk font-semibold text-sm text-gray-900 bg-gray-50 align-top">
                                        Overview
                                    </td>
                                    {compareProducts.map((product, index) => (
                                        <td key={product._id} className={`p-3 align-top ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                            <p className="font-nunito text-xs leading-relaxed text-gray-700">
                                                {product.cardDescription || 'No overview available'}
                                            </p>
                                        </td>
                                    ))}
                                </tr>

                                {/* Short Description (Rich Text) */}
                                <tr className="border-b border-gray-200">
                                    <td className="p-3 font-grotesk font-semibold text-sm text-gray-900 bg-gray-50 align-top">
                                        Description
                                    </td>
                                    {compareProducts.map((product, index) => (
                                        <td key={product._id} className={`p-3 align-top ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                            {product.shortDescription ? (
                                                <div className="font-nunito prose prose-sm max-w-none text-xs
                                                    [&_h5]:text-xs [&_h5]:font-bold [&_h5]:mt-1.5 [&_h5]:mb-1 [&_h5]:text-gray-900
                                                    [&_p]:mb-1.5 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-gray-700
                                                    [&_strong]:font-bold [&_strong]:text-gray-900
                                                    [&_ul]:mb-1.5 [&_ul]:ml-3 [&_li]:mb-0.5 [&_li]:text-xs
                                                    [&_ol]:mb-1.5 [&_ol]:ml-3">
                                                    <PortableText value={product.shortDescription} />
                                                </div>
                                            ) : (
                                                <p className="font-nunito text-xs text-gray-500 italic">
                                                    No description available
                                                </p>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Actions */}
                                <tr>
                                    <td className="p-3 font-grotesk font-semibold text-sm text-gray-900 bg-gray-50 align-top">
                                        Actions
                                    </td>
                                    {compareProducts.map((product, index) => (
                                        <td key={product._id} className={`p-3 align-top ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                            <Link
                                                href={`/products/${product.slug.current}`}
                                                className="inline-block w-full px-3 py-2 bg-blue-600 text-white text-center text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
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