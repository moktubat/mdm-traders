'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Product } from '@/types/product'
import { urlFor } from '@/lib/sanity'
import { useCompare } from '@/hooks/useCompare'
import { useEffect, useState } from 'react'

// Helper function to get main/thumbnail image
function getThumbnailImage(product: Product) {
    const mainImage = product.images.find((img) => img.isMainImage)
    return mainImage || product.images[0]
}

interface ProductCardProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
    const thumbnailImage = getThumbnailImage(product)
    const { compareProducts, toggleCompare, isInCompare } = useCompare()

    // Use local state that syncs with zustand store
    const [isChecked, setIsChecked] = useState(false)
    const isDisabled = !isChecked && compareProducts.length >= 4

    // Sync checkbox state with zustand store
    useEffect(() => {
        setIsChecked(isInCompare(product._id))
    }, [compareProducts, product._id, isInCompare])


    const handleToggle = () => {
        toggleCompare(product)
        setIsChecked(!isChecked)
    }

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-stretch gap-6">
                    {/* Image */}
                    <Link
                        href={`/products/${product.slug.current}`}
                        className="shrink-0"
                    >
                        <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                            <Image
                                src={urlFor(thumbnailImage).width(200).height(200).url()}
                                alt={thumbnailImage.alt || product.title}
                                width={200}
                                height={200}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <Link href={`/products/${product.slug.current}`}>
                            <span className="font-nunito inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md mb-2">
                                <span>{(product.subCategory ?? "GENERAL").toUpperCase()}</span>
                            </span>

                            <h3 className="font-grotesk text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {product.title}
                            </h3>

                            {/* Card Description - FULL display in list view */}
                            {product.cardDescription && (
                                <p className="font-nunito text-sm text-gray-600 mb-4 leading-relaxed">
                                    {product.cardDescription}
                                </p>
                            )}
                        </Link>

                        {/* Compare Actions */}
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleToggle}
                                    disabled={isDisabled}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <span className="font-nunito text-sm text-gray-600">
                                    Compare {isChecked && `(${compareProducts.length}/4)`}
                                </span>
                            </label>

                            <Link
                                href="/products-compare"
                                className={`p-1 rounded transition-colors ${compareProducts.length >= 2 && compareProducts.length <= 5
                                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                aria-label="Go to compare page"
                                onClick={(e) => {
                                    if (compareProducts.length < 2) {
                                        e.preventDefault();
                                        alert("Please add at least 2 or more products to compare!");
                                    } else if (compareProducts.length > 5) {
                                        e.preventDefault();
                                        alert("Sorry, a maximum of 5 products can be compared at one time.");
                                    }
                                }}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Grid view (default)
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
            <Link href={`/products/${product.slug.current}`} className="flex-1 flex flex-col">
                {/* Image Container */}
                <div className="relative bg-gray-100 aspect-square overflow-hidden border-b border-gray-200">
                    <Image
                        src={urlFor(thumbnailImage).width(400).height(400).url()}
                        alt={thumbnailImage.alt || product.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category Badge - Overlay */}
                    <div className="absolute top-3 left-3">
                        <span className="font-nunito inline-block px-2.5 py-1 bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-semibold rounded-md shadow-sm">
                            <span>{(product.subCategory ?? "GENERAL").toUpperCase()}</span>
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-white flex-1 flex flex-col">
                    <h3 className="font-grotesk text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 min-h-[3rem]">
                        {product.title}
                    </h3>

                    {/* Card Description - Show with line clamp in grid */}
                    {product.cardDescription && (
                        <p className="font-nunito text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                            {product.cardDescription}
                        </p>
                    )}
                </div>
            </Link>

            {/* Compare Actions Footer */}
            <div className="px-5 pb-5 mt-auto">
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleToggle}
                        disabled={isDisabled}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        id={`compare-grid-${product._id}`}
                    />
                    <label
                        htmlFor={`compare-grid-${product._id}`}
                        className={`font-nunito text-sm cursor-pointer transition-colors flex-1 ${isDisabled ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Compare {isChecked && `(${compareProducts.length}/4)`}
                    </label>

                    <Link
                        href="/products-compare"
                        className={`p-1 rounded transition-colors ${compareProducts.length >= 2 && compareProducts.length <= 5
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        aria-label="Go to compare page"
                        onClick={(e) => {
                            if (compareProducts.length < 2) {
                                e.preventDefault();
                                alert("Please add at least 2 or more products to compare!");
                            } else if (compareProducts.length > 5) {
                                e.preventDefault();
                                alert("Sorry, a maximum of 5 products can be compared at one time.");
                            }
                        }}
                    >
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}