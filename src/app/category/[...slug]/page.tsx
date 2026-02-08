import { client } from "@/lib/sanity";
import { productsQuery } from "@/lib/queries";
import { Product } from "@/types/product";
import PageHeader from "@/components/common/PageHeader";
import ProductsContent from "@/components/pages/Products/ProductsContent";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

// Helper to get category display name
function getCategoryDisplayName(slug: string): string {
    const categoryNames: Record<string, string> = {
        "portable-radio": "Portable Radio",
        "mobile-radio": "Mobile Radio",
        "apx": "APX",
        "mototrbo": "MOTOTRBO",
        "tetra": "TETRA",
    };
    return categoryNames[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Validate if main category exists
function isValidMainCategory(slug: string): boolean {
    const validCategories = ["portable-radio", "mobile-radio"];
    return validCategories.includes(slug);
}

// Validate if subcategory exists
function isValidSubCategory(slug: string): boolean {
    const validSubCategories = ["apx", "mototrbo", "tetra"];
    return validSubCategories.includes(slug);
}

// Validate category and subcategory relationship
function isValidCategorySubcategory(category: string, subcategory: string): boolean {
    const validPairs: Record<string, string[]> = {
        "portable-radio": ["apx", "mototrbo", "tetra"],
        "mobile-radio": ["apx", "mototrbo", "tetra"],
    };

    return validPairs[category]?.includes(subcategory) || false;
}

async function getProducts(): Promise<Product[]> {
    try {
        const products = await client.fetch<Product[]>(productsQuery);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    // Handle different URL patterns
    // /category/portable-radio -> slug = ["portable-radio"]
    // /category/portable-radio/apx -> slug = ["portable-radio", "apx"]

    if (!slug || slug.length === 0 || slug.length > 2) {
        notFound();
    }

    const allProducts = await getProducts();
    let pageTitle = "";
    let initialCategory: string | null = null;
    let initialSubCategory: string | null = null;

    if (slug.length === 1) {
        // Single category: /category/portable-radio
        const category = slug[0];

        if (!isValidMainCategory(category)) {
            notFound();
        }

        initialCategory = category;
        pageTitle = getCategoryDisplayName(category);
    } else if (slug.length === 2) {
        // Category + Subcategory: /category/portable-radio/apx
        const [category, subcategory] = slug;

        if (!isValidCategorySubcategory(category, subcategory)) {
            notFound();
        }

        initialCategory = category;
        initialSubCategory = subcategory;

        const categoryName = getCategoryDisplayName(category);
        const subcategoryName = getCategoryDisplayName(subcategory);
        pageTitle = `${categoryName} - ${subcategoryName}`;
    }

    return (
        <div>
            <PageHeader
                title={pageTitle}
                backgroundImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1920"
            />
            <ProductsContent
                allProducts={allProducts}
                initialCategory={initialCategory}
                initialSubCategory={initialSubCategory}
            />
        </div>
    );
}