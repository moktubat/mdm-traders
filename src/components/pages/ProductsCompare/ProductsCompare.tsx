'use client'

import { useCompare } from '@/hooks/useCompare'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowLeft } from 'lucide-react'

function getThumbnailImage(product: any) {
    const mainImage = product.images.find((img: any) => img.isMainImage)
    return mainImage || product.images[0]
}

export default function ProductsComparePage() {
    const { compareProducts, removeFromCompare, clearCompare } = useCompare()

    if (compareProducts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-grotesk text-3xl font-bold text-gray-900 mb-4">
                        No Products to Compare
                    </h1>
                    <p className="font-nunito text-gray-600 mb-8">
                        Add at least 2 products to compare them
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Browse Products
                    </Link>
                </div>
            </div>
        )
    }

    if (compareProducts.length < 2) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-grotesk text-3xl font-bold text-gray-900 mb-4">
                        Add More Products
                    </h1>
                    <p className="font-nunito text-gray-600 mb-8">
                        You need at least 2 products to compare (currently: {compareProducts.length})
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Browse Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Products
                        </Link>
                        <h1 className="font-grotesk text-4xl font-bold text-gray-900">
                            Compare Products ({compareProducts.length}/4)
                        </h1>
                    </div>
                    <button
                        onClick={clearCompare}
                        className="font-nunito bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                        Clear All
                    </button>
                </div>

                {/* Comparison Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="p-4 text-left font-grotesk font-bold text-gray-900 w-48 sticky left-0 bg-white z-10">
                                    Feature
                                </th>
                                {compareProducts.map((product) => (
                                    <th key={product._id} className="p-4 text-center min-w-[250px] relative">
                                        <button
                                            onClick={() => removeFromCompare(product._id)}
                                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                            aria-label="Remove product"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Product Images */}
                            <tr className="border-b border-gray-100">
                                <td className="p-4 font-nunito font-semibold text-gray-700 sticky left-0 bg-white">
                                    Product
                                </td>
                                {compareProducts.map((product) => {
                                    const thumbnail = getThumbnailImage(product)
                                    return (
                                        <td key={product._id} className="p-4">
                                            <Link href={`/products/${product.slug.current}`}>
                                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
                                                    <Image
                                                        src={urlFor(thumbnail).width(300).height(300).url()}
                                                        alt={thumbnail.alt || product.title}
                                                        width={300}
                                                        height={300}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </div>
                                                <h3 className="font-grotesk font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                                    {product.title}
                                                </h3>
                                            </Link>
                                        </td>
                                    )
                                })}
                            </tr>

                            {/* Category */}
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <td className="p-4 font-nunito font-semibold text-gray-700 sticky left-0 bg-gray-50">
                                    Category
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4 text-center">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">
                                            {product.subCategory && product.subCategory !== 'none'
                                                ? product.subCategory.replace('-', ' ').toUpperCase()
                                                : product.mainCategory.replace('-', ' ').toUpperCase()}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Short Description */}
                            <tr className="border-b border-gray-100">
                                <td className="p-4 font-nunito font-semibold text-gray-700 sticky left-0 bg-white">
                                    Description
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <p className="font-nunito text-sm text-gray-600 text-left">
                                            {product.shortDescription}
                                        </p>
                                    </td>
                                ))}
                            </tr>

                            {/* Actions */}
                            <tr>
                                <td className="p-4 font-nunito font-semibold text-gray-700 sticky left-0 bg-white">
                                    Actions
                                </td>
                                {compareProducts.map((product) => (
                                    <td key={product._id} className="p-4">
                                        <div className="space-y-2">
                                            <Link
                                                href={`/products/${product.slug.current}`}
                                                className="block w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm text-center"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}