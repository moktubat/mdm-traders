'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { urlFor } from '@/lib/sanity'

function getMainImage(product: Product) {
    const mainImage = product.images.find((img) => img.isMainImage)
    return mainImage || product.images[0]
}

export default function ProductImages({ product }: { product: Product }) {
    const [selectedImage, setSelectedImage] = useState(getMainImage(product))
    const [isZoomed, setIsZoomed] = useState(false)

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                {/* Zoom Icon */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                    </div>
                </div>

                {/* Image Count Badge */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L22 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {product.images.indexOf(selectedImage) + 1} / {product.images.length}
                        </span>
                    </div>
                )}

                <div
                    className={`overflow-hidden p-8 cursor-zoom-in transition-transform duration-300 ${isZoomed ? 'scale-110' : 'scale-100'}`}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                >
                    <Image
                        src={urlFor(selectedImage).width(800).height(800).url()}
                        alt={selectedImage.alt || product.title}
                        width={800}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {product.images.map((img, index) => {
                        const isActive = selectedImage._key === img._key

                        return (
                            <button
                                key={img._key}
                                onClick={() => setSelectedImage(img)}
                                className={`relative rounded-lg overflow-hidden transition-all duration-200 ${isActive
                                        ? 'ring-2 ring-blue-600'
                                        : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                            >
                                <Image
                                    src={urlFor(img).width(150).height(150).url()}
                                    alt={img.alt || `${product.title} - Image ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className={`w-full h-auto py-1 object-cover transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                                        }`}
                                />

                                {/* Active Overlay */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}