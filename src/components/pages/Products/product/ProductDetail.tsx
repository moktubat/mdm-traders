'use client'

import { Product } from '@/types/product'
import { PortableText } from '@portabletext/react'
import { useCompare } from '@/hooks/useCompare'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import ProductImages from '@/components/common/ProductImages'
import ProductCard from '@/components/common/ProductCard'

interface ProductDetailProps {
    product: Product
    relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    const { compareProducts, toggleCompare, isInCompare } = useCompare()
    const [isChecked, setIsChecked] = useState(false)
    const isDisabled = !isChecked && compareProducts.length >= 4

    useEffect(() => {
        setIsChecked(isInCompare(product._id))
    }, [compareProducts, product._id, isInCompare])

    const handleToggle = () => {
        toggleCompare(product)
        setIsChecked(!isChecked)
    }

    return (
        <div className="w-full py-16 md:py-34 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Product Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Left: Images */}
                    <ProductImages product={product} />

                    {/* Right: Info */}
                    <div className="flex flex-col">
                        {/* Breadcrumb */}
                        <nav className="font-nunito text-sm mb-4 text-gray-500 flex items-center flex-wrap gap-1">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <span className="text-gray-300">/</span>
                            <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
                            <span className="text-gray-300">/</span>
                            <Link href={`/category/${product.mainCategory}`} className="hover:text-blue-600 transition-colors">
                                {product.mainCategory === 'motorola-solutions' ? 'Motorola Solutions' : 'Cambium Networks'}
                            </Link>
                            {product.subCategory && product.subCategory !== 'none' && (
                                <>
                                    <span className="text-gray-300">/</span>
                                    <Link href={`/category/${product.mainCategory}/${product.subCategory}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                        {product.subCategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </Link>
                                </>
                            )}
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-900 font-medium">{product.title}</span>
                        </nav>

                        {/* Category Badge */}
                        <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md">
                                {product.subCategory && product.subCategory !== 'none'
                                    ? product.subCategory.replace('-', ' ').toUpperCase()
                                    : product.mainCategory.replace('-', ' ').toUpperCase()}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="w-12 h-1 bg-blue-600 rounded-full mb-5"></div>

                        {/* Short Description */}
                        <p className="font-nunito text-gray-600 text-base mb-6 leading-relaxed">
                            {product.shortDescription}
                        </p>

                        {/* Compare Checkbox + Link */}
                        <div className="flex items-center gap-2 font-nunito mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleToggle}
                                    disabled={isDisabled}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <span className="text-sm text-gray-600">
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
                                        e.preventDefault()
                                        alert("Please add at least 2 or more products to compare!")
                                    } else if (compareProducts.length > 5) {
                                        e.preventDefault()
                                        alert("Sorry, a maximum of 5 products can be compared at one time.")
                                    }
                                }}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Categories Info */}
                        <div className="font-nunito mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Categories:{' '}
                                <Link href={`/category/${product.mainCategory}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                    {product.mainCategory === 'motorola-solutions'
                                        ? 'Motorola Solutions'
                                        : 'Cambium Networks'}
                                </Link>
                                {product.subCategory && product.subCategory !== 'none' && (
                                    <>
                                        <span className="mx-1.5 text-gray-300">•</span>
                                        <Link href={`/category/${product.mainCategory}/${product.subCategory}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                            {product.subCategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs: Description */}
                <div className="font-nunito border-t border-gray-200 mb-4">
                    <button className="text-lg py-3 border-t border-blue-600 font-bold">
                        Description
                    </button>
                </div>

                {/* Full Description */}
                <div className="font-nunito prose prose-lg max-w-none mb-12 
                    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-gray-900
                    [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-gray-900
                    [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-gray-900
                    [&_p]:mb-2 [&_p]:leading-relaxed [&_p]:text-gray-700
                    [&_strong]:font-bold [&_strong]:text-gray-900
                    [&_ul]:mb-4 [&_ul]:ml-6 [&_li]:mb-2
                    [&_ol]:mb-4 [&_ol]:ml-6">
                    {product.fullDescription && <PortableText value={product.fullDescription} />}
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 pt-16 border-t border-gray-200">
                        <h2 className="font-grotesk text-3xl font-bold mb-8">Related products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}