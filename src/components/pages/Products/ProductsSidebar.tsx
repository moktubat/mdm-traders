"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface SubSubCategory {
    id: string;
    name: string;
    count?: number;
    subSubSubCategories?: { id: string; name: string; count?: number }[];
}

interface SubCategory {
    id: string;
    name: string;
    count?: number;
    subSubCategories?: SubSubCategory[];
}

interface Category {
    id: string;
    name: string;
    count?: number;
    subcategories?: SubCategory[];
}

interface ProductsSidebarProps {
    selectedCategory: string | null;
    selectedSubCategory: string | null;
    selectedSubSubCategory?: string | null;
    selectedSubSubSubCategory?: string | null;
    onCategoryChange: (category: string | null) => void;
    onSubCategoryChange: (subCategory: string | null) => void;
    onSubSubCategoryChange?: (subSubCategory: string | null) => void;
    onSubSubSubCategoryChange?: (subSubSubCategory: string | null) => void;
    allProducts: Product[];
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const ProductsSidebar = ({
    selectedCategory,
    selectedSubCategory,
    selectedSubSubCategory = null,
    selectedSubSubSubCategory = null,
    onCategoryChange,
    onSubCategoryChange,
    onSubSubCategoryChange,
    onSubSubSubCategoryChange,
    allProducts = [],
}: ProductsSidebarProps) => {
    const router = useRouter();

    // Initialize expanded state from props so page navigation preserves open state.
    // e.g. if arriving at /category/accessories, accessories is already expanded.
    const [expandedCategory, setExpandedCategory] = useState<string | null>(selectedCategory);
    const [expandedSubCategories, setExpandedSubCategories] = useState<string[]>(
        selectedSubCategory ? [selectedSubCategory] : []
    );
    const [expandedSubSubCategories, setExpandedSubSubCategories] = useState<string[]>(
        selectedSubSubCategory ? [selectedSubSubCategory] : []
    );

    // ─── CATEGORY TREE (count helper lives inside useMemo to satisfy React Compiler) ──
    const categories: Category[] = useMemo(() => {
        // Helper defined inside useMemo — inferred dependency is allProducts ✓
        const count = (filters: Partial<Product>) =>
            allProducts.filter((p) =>
                Object.entries(filters).every(([k, v]) => (p as any)[k] === v)
            ).length;

        return [
            {
                id: "portable-radio",
                name: "Portable Radio",
                count: count({ mainCategory: "portable-radio" }),
                subcategories: [
                    { id: "apx", name: "APX", count: count({ mainCategory: "portable-radio", subCategory: "apx" }) },
                    { id: "mototrbo", name: "MOTOTRBO", count: count({ mainCategory: "portable-radio", subCategory: "mototrbo" }) },
                    { id: "tetra", name: "TETRA", count: count({ mainCategory: "portable-radio", subCategory: "tetra" }) },
                ],
            },
            {
                id: "mobile-radio",
                name: "Mobile Radio",
                count: count({ mainCategory: "mobile-radio" }),
                subcategories: [
                    { id: "apx", name: "APX", count: count({ mainCategory: "mobile-radio", subCategory: "apx" }) },
                    { id: "mototrbo", name: "MOTOTRBO", count: count({ mainCategory: "mobile-radio", subCategory: "mototrbo" }) },
                    { id: "tetra", name: "TETRA", count: count({ mainCategory: "mobile-radio", subCategory: "tetra" }) },
                ],
            },
            {
                id: "body-camera",
                name: "Body Camera",
                count: count({ mainCategory: "body-camera" }),
            },
            {
                id: "accessories",
                name: "Accessories",
                count: count({ mainCategory: "accessories" }),
                subcategories: [
                    {
                        id: "mototrbo-two-way-radios",
                        name: "MOTOTRBO Two-Way Radios",
                        count: count({ mainCategory: "accessories", subCategory: "mototrbo-two-way-radios" }),
                        subSubCategories: [
                            {
                                id: "batteries",
                                name: "Batteries",
                                count: count({ mainCategory: "accessories", subCategory: "mototrbo-two-way-radios", subSubCategory: "batteries" }),
                                subSubSubCategories: [
                                    {
                                        id: "impres-batteries",
                                        name: "IMPRES™ Batteries",
                                        count: count({ mainCategory: "accessories", subSubCategory: "batteries", subSubSubCategory: "impres-batteries" }),
                                    },
                                    {
                                        id: "original-two-way-radio-batteries",
                                        name: "Original Two-way Radio Batteries",
                                        count: count({ mainCategory: "accessories", subSubCategory: "batteries", subSubSubCategory: "original-two-way-radio-batteries" }),
                                    },
                                ],
                            },
                            {
                                id: "charger-accessories",
                                name: "Charger Accessories",
                                count: count({ mainCategory: "accessories", subCategory: "mototrbo-two-way-radios", subSubCategory: "charger-accessories" }),
                                subSubSubCategories: [
                                    {
                                        id: "multi-unit-chargers",
                                        name: "Multi-Unit Chargers",
                                        count: count({ mainCategory: "accessories", subSubCategory: "charger-accessories", subSubSubCategory: "multi-unit-chargers" }),
                                    },
                                    {
                                        id: "single-unit-chargers",
                                        name: "Single-Unit Chargers",
                                        count: count({ mainCategory: "accessories", subSubCategory: "charger-accessories", subSubSubCategory: "single-unit-chargers" }),
                                    },
                                ],
                            },
                            {
                                id: "portable-radios-accessories",
                                name: "Portable Radios Accessories",
                                count: count({ mainCategory: "accessories", subCategory: "mototrbo-two-way-radios", subSubCategory: "portable-radios-accessories" }),
                                subSubSubCategories: [
                                    {
                                        id: "800m-antenna",
                                        name: "800M - Antenna",
                                        count: count({ mainCategory: "accessories", subSubCategory: "portable-radios-accessories", subSubSubCategory: "800m-antenna" }),
                                    },
                                    {
                                        id: "adapters-for-antennas",
                                        name: "Adapters for Antennas",
                                        count: count({ mainCategory: "accessories", subSubCategory: "portable-radios-accessories", subSubSubCategory: "adapters-for-antennas" }),
                                    },
                                    {
                                        id: "uhf-antenna-portable-radios",
                                        name: "UHF Antenna for Portable Radios",
                                        count: count({ mainCategory: "accessories", subSubCategory: "portable-radios-accessories", subSubSubCategory: "uhf-antenna-portable-radios" }),
                                    },
                                ],
                            },
                            {
                                id: "audio-accessories",
                                name: "Audio Accessories",
                                count: count({ mainCategory: "accessories", subCategory: "mototrbo-two-way-radios", subSubCategory: "audio-accessories" }),
                                subSubSubCategories: [
                                    {
                                        id: "ear-microphone-solutions",
                                        name: "Ear Microphone Solutions",
                                        count: count({ mainCategory: "accessories", subSubCategory: "audio-accessories", subSubSubCategory: "ear-microphone-solutions" }),
                                    },
                                    {
                                        id: "earsets-and-earpieces",
                                        name: "Earsets and Earpieces",
                                        count: count({ mainCategory: "accessories", subSubCategory: "audio-accessories", subSubSubCategory: "earsets-and-earpieces" }),
                                    },
                                    {
                                        id: "headsets",
                                        name: "Headsets",
                                        count: count({ mainCategory: "accessories", subSubCategory: "audio-accessories", subSubSubCategory: "headsets" }),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "consumer-two-way-radios",
                        name: "Consumer Two-Way Radios",
                        count: count({ mainCategory: "accessories", subCategory: "consumer-two-way-radios" }),
                        subSubCategories: [
                            {
                                id: "batteries-and-chargers",
                                name: "Batteries and Chargers",
                                count: count({ mainCategory: "accessories", subCategory: "consumer-two-way-radios", subSubCategory: "batteries-and-chargers" }),
                            },
                            {
                                id: "headphones-earpieces-microphones",
                                name: "Headphones, Earpieces and Microphones",
                                count: count({ mainCategory: "accessories", subCategory: "consumer-two-way-radios", subSubCategory: "headphones-earpieces-microphones" }),
                            },
                            {
                                id: "cases-and-carry-accessories",
                                name: "Cases and Carry Accessories",
                                count: count({ mainCategory: "accessories", subCategory: "consumer-two-way-radios", subSubCategory: "cases-and-carry-accessories" }),
                            },
                        ],
                    },
                ],
            },
        ];
    }, [allProducts]);

    // ─── TOGGLE HELPERS ─────────────────────────────────────────────────────

    // Accordion for Level 1: only one open at a time
    const toggleCategory = (categoryId: string) => {
        setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
    };

    // Independent toggles for Level 2 & 3
    const toggleSubCategory = (subId: string) => {
        setExpandedSubCategories((prev) =>
            prev.includes(subId) ? prev.filter((x) => x !== subId) : [...prev, subId]
        );
    };

    const toggleSubSubCategory = (subSubId: string) => {
        setExpandedSubSubCategories((prev) =>
            prev.includes(subSubId) ? prev.filter((x) => x !== subSubId) : [...prev, subSubId]
        );
    };

    // ─── CLICK HANDLERS ─────────────────────────────────────────────────────

    const handleCategoryClick = (categoryId: string, hasSubcategories: boolean) => {
        if (selectedCategory === categoryId) {
            router.push("/products");
            onCategoryChange(null);
            onSubCategoryChange(null);
            onSubSubCategoryChange?.(null);
            onSubSubSubCategoryChange?.(null);
            setExpandedCategory(null);
        } else {
            router.push(`/category/${categoryId}`);
            onCategoryChange(categoryId);
            onSubCategoryChange(null);
            onSubSubCategoryChange?.(null);
            onSubSubSubCategoryChange?.(null);
            setExpandedCategory(hasSubcategories ? categoryId : null);
        }
    };

    const handleSubCategoryClick = (subCategoryId: string, categoryId: string, hasSubSubs: boolean) => {
        router.push(`/category/${categoryId}/${subCategoryId}`);
        if (selectedCategory !== categoryId) onCategoryChange(categoryId);
        onSubCategoryChange(subCategoryId);
        onSubSubCategoryChange?.(null);
        onSubSubSubCategoryChange?.(null);
        if (hasSubSubs && !expandedSubCategories.includes(subCategoryId)) {
            setExpandedSubCategories((prev) => [...prev, subCategoryId]);
        }
    };

    const handleSubSubCategoryClick = (subSubId: string, subId: string, catId: string, hasSubSubSubs: boolean) => {
        router.push(`/category/${catId}/${subId}/${subSubId}`);
        if (selectedCategory !== catId) onCategoryChange(catId);
        if (selectedSubCategory !== subId) onSubCategoryChange(subId);
        onSubSubCategoryChange?.(subSubId);
        onSubSubSubCategoryChange?.(null);
        if (hasSubSubSubs && !expandedSubSubCategories.includes(subSubId)) {
            setExpandedSubSubCategories((prev) => [...prev, subSubId]);
        }
    };

    const handleSubSubSubCategoryClick = (subSubSubId: string, subSubId: string, subId: string, catId: string) => {
        router.push(`/category/${catId}/${subId}/${subSubId}/${subSubSubId}`);
        if (selectedCategory !== catId) onCategoryChange(catId);
        if (selectedSubCategory !== subId) onSubCategoryChange(subId);
        onSubSubCategoryChange?.(subSubId);
        onSubSubSubCategoryChange?.(subSubSubId);
    };

    const handleClearAll = () => {
        router.push("/products");
        onCategoryChange(null);
        onSubCategoryChange(null);
        onSubSubCategoryChange?.(null);
        onSubSubSubCategoryChange?.(null);
        setExpandedCategory(null);
        setExpandedSubCategories([]);
        setExpandedSubSubCategories([]);
    };

    // ─── SHARED UI HELPERS ───────────────────────────────────────────────────
    const chevron = (expanded: boolean) => (
        <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    const checkmark = (
        <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
    );

    const badge = (n: number | undefined, selected: boolean) =>
        n !== undefined ? (
            <span className={`text-xs px-2 py-0.5 rounded-full ${selected ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                {n}
            </span>
        ) : null;

    // ─── RENDER ─────────────────────────────────────────────────────────────
    return (
        <aside className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="font-grotesk text-lg font-bold text-gray-900">Categories</h3>
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

            {/* Tree */}
            <div className="p-5">
                <div className="space-y-1">
                    {categories.map((category) => {
                        const isCatExpanded = expandedCategory === category.id;
                        const isCatSelected = selectedCategory === category.id;
                        const hasSubs = !!category.subcategories?.length;

                        return (
                            <div key={category.id}>
                                {/* Level 1: Main Category */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleCategoryClick(category.id, hasSubs)}
                                        className={`flex-1 text-left px-3.5 py-2.5 rounded-lg transition-all duration-200 ${isCatSelected ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50 font-medium"}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-grotesk text-base font-semibold">{category.name}</span>
                                                {badge(category.count, isCatSelected)}
                                            </div>
                                            {isCatSelected && !selectedSubCategory && checkmark}
                                        </div>
                                    </button>
                                    {hasSubs && (
                                        <button
                                            onClick={() => toggleCategory(category.id)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                                            aria-label={isCatExpanded ? "Collapse" : "Expand"}
                                        >
                                            {chevron(isCatExpanded)}
                                        </button>
                                    )}
                                </div>

                                {/* Level 2: SubCategories */}
                                {hasSubs && isCatExpanded && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {category.subcategories!.map((sub) => {
                                            const isSubSelected = selectedSubCategory === sub.id && selectedCategory === category.id;
                                            const isSubDisabled = sub.count === 0;
                                            const isSubExpanded = expandedSubCategories.includes(sub.id);
                                            const hasSubSubs = !!sub.subSubCategories?.length;

                                            return (
                                                <div key={sub.id}>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => !isSubDisabled && handleSubCategoryClick(sub.id, category.id, hasSubSubs)}
                                                            disabled={isSubDisabled}
                                                            className={`flex-1 text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${isSubDisabled ? "opacity-50 cursor-not-allowed text-gray-400" : isSubSelected ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-nunito">{sub.name}</span>
                                                                <div className="flex items-center gap-2">
                                                                    {badge(sub.count, isSubSelected)}
                                                                    {isSubSelected && !selectedSubSubCategory && checkmark}
                                                                </div>
                                                            </div>
                                                        </button>
                                                        {hasSubSubs && (
                                                            <button
                                                                onClick={() => toggleSubCategory(sub.id)}
                                                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                                                                aria-label={isSubExpanded ? "Collapse" : "Expand"}
                                                            >
                                                                {chevron(isSubExpanded)}
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Level 3: SubSubCategories */}
                                                    {hasSubSubs && isSubExpanded && (
                                                        <div className="ml-4 mt-1 space-y-1">
                                                            {sub.subSubCategories!.map((subSub) => {
                                                                const isSubSubSelected = selectedSubSubCategory === subSub.id && isSubSelected;
                                                                const isSubSubDisabled = subSub.count === 0;
                                                                const isSubSubExpanded = expandedSubSubCategories.includes(subSub.id);
                                                                const hasSubSubSubs = !!subSub.subSubSubCategories?.length;

                                                                return (
                                                                    <div key={subSub.id}>
                                                                        <div className="flex items-center gap-1">
                                                                            <button
                                                                                onClick={() => !isSubSubDisabled && handleSubSubCategoryClick(subSub.id, sub.id, category.id, hasSubSubSubs)}
                                                                                disabled={isSubSubDisabled}
                                                                                className={`flex-1 text-left px-4 py-2 rounded-lg text-xs transition-all duration-200 ${isSubSubDisabled ? "opacity-50 cursor-not-allowed text-gray-400" : isSubSubSelected ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                                                                            >
                                                                                <div className="flex items-center justify-between">
                                                                                    <span className="font-nunito">{subSub.name}</span>
                                                                                    <div className="flex items-center gap-2">
                                                                                        {badge(subSub.count, isSubSubSelected)}
                                                                                        {isSubSubSelected && !selectedSubSubSubCategory && checkmark}
                                                                                    </div>
                                                                                </div>
                                                                            </button>
                                                                            {hasSubSubSubs && (
                                                                                <button
                                                                                    onClick={() => toggleSubSubCategory(subSub.id)}
                                                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
                                                                                    aria-label={isSubSubExpanded ? "Collapse" : "Expand"}
                                                                                >
                                                                                    {chevron(isSubSubExpanded)}
                                                                                </button>
                                                                            )}
                                                                        </div>

                                                                        {/* Level 4: SubSubSubCategories */}
                                                                        {hasSubSubSubs && isSubSubExpanded && (
                                                                            <div className="ml-4 mt-1 space-y-1">
                                                                                {subSub.subSubSubCategories!.map((subSubSub) => {
                                                                                    const isL4Selected = selectedSubSubSubCategory === subSubSub.id && isSubSubSelected;
                                                                                    const isL4Disabled = subSubSub.count === 0;

                                                                                    return (
                                                                                        <button
                                                                                            key={subSubSub.id}
                                                                                            onClick={() => !isL4Disabled && handleSubSubSubCategoryClick(subSubSub.id, subSub.id, sub.id, category.id)}
                                                                                            disabled={isL4Disabled}
                                                                                            className={`w-full text-left px-4 py-2 rounded-lg text-xs transition-all duration-200 ${isL4Disabled ? "opacity-50 cursor-not-allowed text-gray-400" : isL4Selected ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                                                                                        >
                                                                                            <div className="flex items-center justify-between">
                                                                                                <span className="font-nunito">{subSubSub.name}</span>
                                                                                                <div className="flex items-center gap-2">
                                                                                                    {badge(subSubSub.count, isL4Selected)}
                                                                                                    {isL4Selected && checkmark}
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
                                                    )}
                                                </div>
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