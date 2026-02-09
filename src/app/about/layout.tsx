import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "MDM Traders Limited has been Bangladesh's leading two-way radio and telecommunication solutions provider since 2013. Learn about our mission, vision, and 9+ years of experience delivering voice, data, video, and networking solutions to government, defense, and enterprise sectors.",
    keywords: [
        "MDM Traders Limited",
        "about MDM Traders",
        "radio communication Bangladesh",
        "telecommunication company Dhaka",
        "two-way radio supplier history",
        "MDM company profile",
        "radio solutions Bangladesh",
        "communication infrastructure provider"
    ],
    openGraph: {
        title: "About Us | MDM Traders Limited",
        description: "9+ years of connecting businesses to industry-leading voice, data, video, and networking solutions. Discover our journey as Bangladesh's premier radio communication provider.",
        images: ["/favicon.png"],
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}