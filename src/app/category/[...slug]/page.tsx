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

// ─── LABEL MAP ────────────────────────────────────────────────────────────────
const labelMap: Record<string, string> = {
    "portable-radio": "Portable Radio",
    "mobile-radio": "Mobile Radio",
    "body-camera": "Body Camera",
    "accessories": "Accessories",
    "apx": "APX",
    "mototrbo": "MOTOTRBO",
    "tetra": "TETRA",
    "mototrbo-two-way-radios": "MOTOTRBO Two-Way Radios",
    "consumer-two-way-radios": "Consumer Two-Way Radios",
    "batteries": "Batteries",
    "charger-accessories": "Charger Accessories",
    "portable-radios-accessories": "Portable Radios Accessories",
    "audio-accessories": "Audio Accessories",
    "batteries-and-chargers": "Batteries and Chargers",
    "headphones-earpieces-microphones": "Headphones, Earpieces and Microphones",
    "cases-and-carry-accessories": "Cases and Carry Accessories",
    "multi-unit-chargers": "Multi-Unit Chargers",
    "single-unit-chargers": "Single-Unit Chargers",
    'impres-batteries': 'IMPRES™ Batteries',
    'original-two-way-radio-batteries': 'Original Two-way Radio Batteries',
    "800m-antenna": "800M - Antenna",
    "adapters-for-antennas": "Adapters for Antennas",
    "uhf-antenna-portable-radios": "UHF Antenna for Portable Radios",
    "ear-microphone-solutions": "Ear Microphone Solutions",
    "earsets-and-earpieces": "Earsets and Earpieces",
    "headsets": "Headsets",
};

const label = (slug: string) =>
    labelMap[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// ─── VALID TREE ───────────────────────────────────────────────────────────────
const validTree: Record<string, Record<string, Record<string, string[]>>> = {
    "portable-radio": { apx: {}, mototrbo: {}, tetra: {} } as any,
    "mobile-radio": { apx: {}, mototrbo: {}, tetra: {} } as any,
    "body-camera": {},
    "accessories": {
        "mototrbo-two-way-radios": {
            "batteries": ["impres-batteries", "original-two-way-radio-batteries"],
            "charger-accessories": ["multi-unit-chargers", "single-unit-chargers"],
            "portable-radios-accessories": ["800m-antenna", "adapters-for-antennas", "uhf-antenna-portable-radios"],
            "audio-accessories": ["ear-microphone-solutions", "earsets-and-earpieces", "headsets"],
        },
        "consumer-two-way-radios": {
            "batteries-and-chargers": [],
            "headphones-earpieces-microphones": [],
            "cases-and-carry-accessories": [],
        },
    },
};

async function getProducts(): Promise<Product[]> {
    try {
        return await client.fetch<Product[]>(productsQuery);
    } catch {
        return [];
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;

    if (!slug || slug.length === 0 || slug.length > 4) notFound();

    const [cat, sub, subSub, subSubSub] = slug;

    // Validate each level exists in tree
    if (!validTree[cat]) notFound();
    if (sub && !(validTree[cat] as any)[sub] !== false && !((validTree[cat] as any)[sub] !== undefined)) {
        // sub must exist as key in validTree[cat]
        if (!(sub in validTree[cat])) notFound();
    }
    if (subSub) {
        const subTree = (validTree[cat] as any)[sub];
        if (!subTree || !(subSub in subTree)) notFound();
    }
    if (subSubSub) {
        const subSubTree = ((validTree[cat] as any)[sub] as any)?.[subSub];
        if (!Array.isArray(subSubTree) || !subSubTree.includes(subSubSub)) notFound();
    }

    // Body camera has no subcategories
    if (cat === "body-camera" && sub) notFound();

    const allProducts = await getProducts();

    // Build page title from breadcrumb parts
    const titleParts = [cat, sub, subSub, subSubSub].filter(Boolean).map(label);
    const pageTitle = titleParts.join(" › ");

    return (
        <div>
            <PageHeader
                title={pageTitle}
                backgroundImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1920"
            />
            <ProductsContent
                allProducts={allProducts}
                initialCategory={cat ?? null}
                initialSubCategory={sub ?? null}
                initialSubSubCategory={subSub ?? null}
                initialSubSubSubCategory={subSubSub ?? null}
            />
        </div>
    );
}