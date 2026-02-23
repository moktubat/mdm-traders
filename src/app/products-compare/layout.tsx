import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compare Products",
    description: "Compare up to 4 two-way radio products side by side. Evaluate features, specifications, and capabilities to find the perfect radio communication solution for your needs.",
    keywords: [
        "compare radios",
        "radio comparison",
        "compare two-way radios",
        "product comparison",
        "radio features"
    ],
    openGraph: {
        title: "Compare Products | MDM Traders Limited",
        description: "Compare professional radio communication products side by side",
        images: ["/favicon.ico"],
    },
};

export default function CompareLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}