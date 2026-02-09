import type { Metadata } from "next";
import { Space_Grotesk, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: {
    default: "MDM Traders Limited | Two-Way Radio & Telecommunication Solutions",
    template: "%s | MDM Traders Limited",
  },

  description:
    "MDM Traders Limited is Bangladesh's leading two-way radio and telecommunication system supplier, providing DMR trunking, mission-critical communication, and turnkey networking solutions for government, defense, and private sectors since 2013.",

  keywords: [
    "MDM Traders Limited",
    "Two-way radio supplier Bangladesh",
    "DMR trunking system",
    "Telecommunication solutions Bangladesh",
    "Radio communication system",
    "Government communication infrastructure",
    "Mission critical radio",
    "Defense communication systems",
  ],

  authors: [{ name: "MDM Traders Limited" }],
  creator: "MDM Traders Limited",
  publisher: "MDM Traders Limited",

  openGraph: {
    title: "MDM Traders Limited — National Leader in Radio Communication Systems",
    description:
      "Authorized dealer and largest two-way radio system provider in Bangladesh, serving government security, defense, intelligence, and enterprise sectors.",
    siteName: "MDM Traders Limited",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "MDM Traders Limited Communication Infrastructure",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MDM Traders Limited | Communication & Radio System Experts",
    description:
      "Bangladesh's trusted supplier of two-way radio, DMR trunking, and mission-critical telecom systems.",
    images: ["/favicon.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${nunito.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}