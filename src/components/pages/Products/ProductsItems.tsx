"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/common/ProductCard";
import { useState, useMemo } from "react";

interface ProductsItemsProps {
    products: Product[];
}

const ProductsItems = ({ products }: ProductsItemsProps) => {
    const [sortBy, setSortBy] = useState<string>("default");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    // Sort products based on selected option using useMemo
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                case 'newest':
                    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
                case 'oldest':
                    return new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime();
                default:
                    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
            }
        });
    }, [products, sortBy]);

    // Calculate pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, endIndex);

    // Reset to page 1 when sorting changes
    const handleSortChange = (value: string) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsisThreshold = 7;

        if (totalPages <= showEllipsisThreshold) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    // Scroll to top when page changes
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Modern Header with Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Results Count */}
                    <div className="flex items-center gap-3">
                        <div className="font-nunito bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-base font-semibold">
                            {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
                        </div>
                        {sortedProducts.length !== products.length && (
                            <span className="text-sm text-gray-500">
                                of {products.length} total
                            </span>
                        )}
                        {sortedProducts.length > productsPerPage && (
                            <span className="text-sm text-gray-500">
                                • Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)}
                            </span>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-all duration-200 ${viewMode === "grid"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                                title="Grid view"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-all duration-200 ${viewMode === "list"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                                title="List view"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="font-nunito appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                            >
                                <option value="default">Default sorting</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                                <option value="newest">Newest first</option>
                                <option value="oldest">Oldest first</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid/List */}
            {currentProducts.length > 0 ? (
                <>
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "space-y-4"
                        }
                    >
                        {currentProducts.map((product) => (
                            <ProductCard key={product._id} product={product} viewMode={viewMode} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Page Info */}
                            <div className="text-sm text-gray-600 font-nunito">
                                Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
                                <span className="font-semibold text-gray-900">{totalPages}</span>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center gap-2">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`font-nunito px-4 py-2 rounded-lg border font-medium transition-all ${currentPage === 1
                                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Previous
                                    </span>
                                </button>

                                {/* Page Numbers */}
                                <div className="hidden sm:flex items-center gap-1">
                                    {getPageNumbers().map((page, index) => (
                                        page === '...' ? (
                                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page as number)}
                                                className={`font-nunito min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all ${currentPage === page
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`font-nunito px-4 py-2 rounded-lg border font-medium transition-all ${currentPage === totalPages
                                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        Next
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
                    <div className="text-center max-w-md mx-auto">
                        {/* Empty State Icon */}
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>

                        <h3 className="font-grotesk text-xl font-bold text-gray-900 mb-2">
                            No products found
                        </h3>
                        <p className="font-nunito text-gray-500 mb-6">
                            We couldn&apos;t find any products matching your current filters.
                            Try adjusting your search criteria.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="font-nunito inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Reset Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsItems;