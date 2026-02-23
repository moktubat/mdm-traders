import { client } from "@/lib/sanity";
import { productsQuery } from "@/lib/queries";
import { Product } from "@/types/product";
import PageHeader from "@/components/common/PageHeader";
import ProductsContent from "@/components/pages/Products/ProductsContent";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
    title: "Products",
    description: "Browse our comprehensive range of two-way radios, body cameras, portable radios, and mobile radio communication systems. Featuring APX, MOTOTRBO, and TETRA solutions from leading manufacturers.",
    keywords: [
        "two-way radios",
        "portable radio",
        "mobile radio",
        "body camera",
        "body worn camera",
        "APX radio",
        "MOTOTRBO",
        "TETRA radio",
        "radio communication",
        "DMR radio"
    ],
    openGraph: {
        title: "Products | MDM Traders Limited",
        description: "Explore professional radio communication products including portable radios, mobile radios, and body cameras for mission-critical operations.",
        images: ["/favicon.ico"],
    },
};

async function getProducts(): Promise<Product[]> {
    try {
        const products = await client.fetch<Product[]>(productsQuery);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div>
            <PageHeader
                title="Products"
                backgroundImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1920"
            />
            <ProductsContent allProducts={products} />
        </div>
    );
}