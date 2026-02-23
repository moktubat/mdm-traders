import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with MDM Traders Limited for inquiries about two-way radios, telecommunication solutions, and radio communication systems. Visit our office in Dhaka or contact us via phone and email.",
    keywords: [
        "contact MDM Traders",
        "radio supplier Bangladesh",
        "Dhaka radio dealer",
        "telecommunication support",
        "two-way radio inquiry",
        "MDM contact information"
    ],
    openGraph: {
        title: "Contact Us | MDM Traders Limited",
        description: "Reach out to Bangladesh's leading two-way radio and telecommunication solutions provider. We're here to help with your communication needs.",
        images: ["/favicon.ico"],
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}