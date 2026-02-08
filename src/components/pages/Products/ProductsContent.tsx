"use client";

import { useMemo, useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductsSidebar from "./ProductsSidebar";
import ProductsItems from "./ProductsItems";

interface ProductsContentProps {
    allProducts: Product[];
    initialCategory?: string | null;
    initialSubCategory?: string | null;
}

const ProductsContent = ({
    allProducts,
    initialCategory = null,
    initialSubCategory = null
}: ProductsContentProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(initialSubCategory);

    // Update state when route changes
    useEffect(() => {
        setSelectedCategory(initialCategory);
        setSelectedSubCategory(initialSubCategory);
    }, [initialCategory, initialSubCategory]);

    // Filter products using useMemo instead of useEffect + setState
    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        if (selectedCategory) {
            filtered = filtered.filter(
                (product) => product.mainCategory === selectedCategory
            );
        }

        if (selectedSubCategory) {
            filtered = filtered.filter(
                (product) => product.subCategory === selectedSubCategory
            );
        }

        return filtered;
    }, [selectedCategory, selectedSubCategory, allProducts]);

    return (
        <section className="w-full py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar - 1 column */}
                    <div className="lg:col-span-1">
                        <ProductsSidebar
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            onCategoryChange={setSelectedCategory}
                            onSubCategoryChange={setSelectedSubCategory}
                            allProducts={allProducts}
                        />
                    </div>

                    {/* Products Grid - 3 columns */}
                    <div className="lg:col-span-3">
                        <ProductsItems products={filteredProducts} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsContent;