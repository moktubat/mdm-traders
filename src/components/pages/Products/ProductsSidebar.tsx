"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
    id: string;
    name: string;
    count?: number;
    subcategories?: { id: string; name: string; count?: number }[];
}

const categories: Category[] = [
    {
        id: "motorola-solutions",
        name: "Motorola Solutions",
        subcategories: [
            { id: "apx-series", name: "APX Series" },
            { id: "talkabout", name: "Talkabout" },
            { id: "tetra", name: "TETRA" },
            { id: "mototrbo", name: "MOTOTRBO" },
        ],
    },
    {
        id: "cambium-networks",
        name: "Cambium Networks",
    },
];

interface ProductsSidebarProps {
    selectedCategory: string | null;
    selectedSubCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    onSubCategoryChange: (subCategory: string | null) => void;
}

const ProductsSidebar = ({
    selectedCategory,
    selectedSubCategory,
    onCategoryChange,
    onSubCategoryChange,
}: ProductsSidebarProps) => {
    const router = useRouter();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([
        "motorola-solutions",
    ]);

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

        if (selectedSubCategory === subCategoryId) {
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
                                            <span className="font-grotesk text-base font-semibold">
                                                {category.name}
                                            </span>
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
                                            const isSubSelected = selectedSubCategory === sub.id;

                                            return (
                                                <button
                                                    key={sub.id}
                                                    onClick={() =>
                                                        handleSubCategoryClick(sub.id, category.id)
                                                    }
                                                    className={`w-full text-left px-4 py-2.5 rounded-lg text-base transition-all duration-200 ${isSubSelected
                                                            ? "bg-blue-50 text-blue-700 font-semibold"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{sub.name}</span>
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