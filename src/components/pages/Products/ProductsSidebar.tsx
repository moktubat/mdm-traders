"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

interface Category {
    id: string;
    name: string;
    count?: number;
    subcategories?: { id: string; name: string; count?: number }[];
}

interface ProductsSidebarProps {
    selectedCategory: string | null;
    selectedSubCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    onSubCategoryChange: (subCategory: string | null) => void;
    allProducts: Product[];
}

const ProductsSidebar = ({
    selectedCategory,
    selectedSubCategory,
    onCategoryChange,
    onSubCategoryChange,
    allProducts = [],
}: ProductsSidebarProps) => {
    const router = useRouter();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([
        "portable-radio",
        "mobile-radio",
    ]);

    // Calculate product counts dynamically
    const categories: Category[] = useMemo(() => {
        // Main category counts
        const portableCount = allProducts.filter(p => p.mainCategory === 'portable-radio').length;
        const mobileCount = allProducts.filter(p => p.mainCategory === 'mobile-radio').length;

        // Subcategory counts for each main category
        const getSubCategoryCount = (mainCat: string, subCat: string) => {
            return allProducts.filter(p =>
                p.mainCategory === mainCat &&
                p.subCategory === subCat
            ).length;
        };

        return [
            {
                id: "portable-radio",
                name: "Portable Radio",
                count: portableCount,
                subcategories: [
                    {
                        id: "apx",
                        name: "APX",
                        count: getSubCategoryCount('portable-radio', 'apx')
                    },
                    {
                        id: "mototrbo",
                        name: "MOTOTRBO",
                        count: getSubCategoryCount('portable-radio', 'mototrbo')
                    },
                    {
                        id: "tetra",
                        name: "TETRA",
                        count: getSubCategoryCount('portable-radio', 'tetra')
                    },
                ],
            },
            {
                id: "mobile-radio",
                name: "Mobile Radio",
                count: mobileCount,
                subcategories: [
                    {
                        id: "apx",
                        name: "APX",
                        count: getSubCategoryCount('mobile-radio', 'apx')
                    },
                    {
                        id: "mototrbo",
                        name: "MOTOTRBO",
                        count: getSubCategoryCount('mobile-radio', 'mototrbo')
                    },
                    {
                        id: "tetra",
                        name: "TETRA",
                        count: getSubCategoryCount('mobile-radio', 'tetra')
                    },
                ],
            },
        ];
    }, [allProducts]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleCategoryClick = (categoryId: string) => {
        if (selectedCategory === categoryId) {
            // If clicking the same category, go back to all products
            router.push('/products');
            onCategoryChange(null);
            onSubCategoryChange(null);
        } else {
            // Navigate to category page
            router.push(`/category/${categoryId}`);
            onCategoryChange(categoryId);
            onSubCategoryChange(null);
            // Auto-expand when category is selected
            if (!expandedCategories.includes(categoryId)) {
                setExpandedCategories((prev) => [...prev, categoryId]);
            }
        }
    };

    const handleSubCategoryClick = (subCategoryId: string, categoryId: string) => {
        // Navigate to subcategory page
        router.push(`/category/${categoryId}/${subCategoryId}`);

        // Make sure parent category is selected
        if (selectedCategory !== categoryId) {
            onCategoryChange(categoryId);
        }

        if (selectedSubCategory === subCategoryId && selectedCategory === categoryId) {
            onSubCategoryChange(null);
        } else {
            onSubCategoryChange(subCategoryId);
        }
    };

    const handleClearAll = () => {
        router.push('/products');
        onCategoryChange(null);
        onSubCategoryChange(null);
    };

    return (
        <aside className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="font-grotesk text-lg font-bold text-gray-900">
                        Categories
                    </h3>
                    {(selectedCategory || selectedSubCategory) && (
                        <button
                            onClick={handleClearAll}
                            className="font-nunito text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Categories */}
            <div className="p-5">
                <div className="space-y-1">
                    {categories.map((category) => {
                        const isExpanded = expandedCategories.includes(category.id);
                        const isSelected = selectedCategory === category.id;

                        return (
                            <div key={category.id}>
                                {/* Main Category Button */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={`flex-1 text-left px-3.5 py-2.5 rounded-lg transition-all duration-200 ${isSelected
                                            ? "bg-blue-50 text-blue-700 font-semibold"
                                            : "text-gray-700 hover:bg-gray-50 font-medium"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-grotesk text-base font-semibold">
                                                    {category.name}
                                                </span>
                                                {category.count !== undefined && (
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {category.count}
                                                    </span>
                                                )}
                                            </div>
                                            {isSelected && !selectedSubCategory && (
                                                <svg
                                                    className="w-4 h-4 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2.5}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>

                                    {/* Expand/Collapse Button */}
                                    {category.subcategories && (
                                        <button
                                            onClick={() => toggleCategory(category.id)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                                        >
                                            <svg
                                                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                                    }`}
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
                                        </button>
                                    )}
                                </div>

                                {/* Subcategories */}
                                {category.subcategories && isExpanded && (
                                    <div className="font-nunito ml-4 mt-1 space-y-1 animate-fadeIn">
                                        {category.subcategories.map((sub) => {
                                            // Fixed: Check both subcategory AND parent category match
                                            const isSubSelected =
                                                selectedSubCategory === sub.id &&
                                                selectedCategory === category.id;
                                            const isDisabled = sub.count === 0;

                                            return (
                                                <button
                                                    key={sub.id}
                                                    onClick={() =>
                                                        !isDisabled && handleSubCategoryClick(sub.id, category.id)
                                                    }
                                                    disabled={isDisabled}
                                                    className={`w-full text-left px-4 py-2.5 rounded-lg text-base transition-all duration-200 ${isDisabled
                                                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                                                        : isSubSelected
                                                            ? "bg-blue-50 text-blue-700 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{sub.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            {sub.count !== undefined && (
                                                                <span className={`text-xs px-2 py-0.5 rounded-full ${isSubSelected
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-gray-100 text-gray-600'
                                                                    }`}>
                                                                    {sub.count}
                                                                </span>
                                                            )}
                                                            {isSubSelected && (
                                                                <svg
                                                                    className="w-4 h-4 text-blue-600"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2.5}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default ProductsSidebar;