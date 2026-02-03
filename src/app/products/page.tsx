import { client } from "@/lib/sanity";
import { productsQuery } from "@/lib/queries";
import { Product } from "@/types/product";
import PageHeader from "@/components/common/PageHeader";
import ProductsContent from "@/components/pages/Products/ProductsContent";

export const revalidate = 60; // Revalidate every 60 seconds

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