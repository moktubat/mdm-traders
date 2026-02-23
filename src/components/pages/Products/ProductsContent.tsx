"use client";

import { useMemo, useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductsSidebar from "./ProductsSidebar";
import ProductsItems from "./ProductsItems";

interface ProductsContentProps {
    allProducts: Product[];
    initialCategory?: string | null;
    initialSubCategory?: string | null;
    initialSubSubCategory?: string | null;
    initialSubSubSubCategory?: string | null;
}

const ProductsContent = ({
    allProducts,
    initialCategory = null,
    initialSubCategory = null,
    initialSubSubCategory = null,
    initialSubSubSubCategory = null,
}: ProductsContentProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(initialSubCategory);
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState<string | null>(initialSubSubCategory);
    const [selectedSubSubSubCategory, setSelectedSubSubSubCategory] = useState<string | null>(initialSubSubSubCategory);

    useEffect(() => {
        setSelectedCategory(initialCategory);
        setSelectedSubCategory(initialSubCategory);
        setSelectedSubSubCategory(initialSubSubCategory);
        setSelectedSubSubSubCategory(initialSubSubSubCategory);
    }, [initialCategory, initialSubCategory, initialSubSubCategory, initialSubSubSubCategory]);

    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        if (selectedCategory) {
            filtered = filtered.filter((p) => p.mainCategory === selectedCategory);
        }
        if (selectedSubCategory) {
            filtered = filtered.filter((p) => p.subCategory === selectedSubCategory);
        }
        if (selectedSubSubCategory) {
            filtered = filtered.filter((p) => p.subSubCategory === selectedSubSubCategory);
        }
        if (selectedSubSubSubCategory) {
            filtered = filtered.filter((p) => p.subSubSubCategory === selectedSubSubSubCategory);
        }

        return filtered;
    }, [selectedCategory, selectedSubCategory, selectedSubSubCategory, selectedSubSubSubCategory, allProducts]);

    return (
        <section className="w-full py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <ProductsSidebar
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            selectedSubSubCategory={selectedSubSubCategory}
                            selectedSubSubSubCategory={selectedSubSubSubCategory}
                            onCategoryChange={setSelectedCategory}
                            onSubCategoryChange={setSelectedSubCategory}
                            onSubSubCategoryChange={setSelectedSubSubCategory}
                            onSubSubSubCategoryChange={setSelectedSubSubSubCategory}
                            allProducts={allProducts}
                        />
                    </div>
                    <div className="lg:col-span-3">
                        <ProductsItems products={filteredProducts} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsContent;