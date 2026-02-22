"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import mdmLogo from "@/assets/mdmLogo1.png";
import gsap from "gsap";
import Image from "next/image";

/* ---------------- Desktop Nav Link ---------------- */
const DesktopNavLink = ({
    href,
    children,
    active,
    textColor,
}: {
    href: string;
    children: React.ReactNode;
    active: boolean;
    textColor: string;
}) => {
    const underlineRef = useRef<HTMLSpanElement>(null);

    /* Sync underline with active route */
    useEffect(() => {
        if (!underlineRef.current) return;

        gsap.killTweensOf(underlineRef.current);

        gsap.set(underlineRef.current, {
            scaleX: active ? 1 : 0,
            transformOrigin: "50% 50%",
        });
    }, [active]);

    const handleEnter = () => {
        if (!underlineRef.current || active) return;

        gsap.to(underlineRef.current, {
            scaleX: 1,
            duration: 0.35,
            ease: "power3.out",
        });
    };

    const handleLeave = () => {
        if (!underlineRef.current || active) return;

        gsap.to(underlineRef.current, {
            scaleX: 0,
            duration: 0.25,
            ease: "power3.in",
        });
    };

    return (
        <Link
            href={href}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`
                relative text-sm font-medium transition-transform duration-200
                hover:scale-110
                ${textColor}
                ${active ? "font-bold" : ""}
            `}
        >
            {children}
            <span
                ref={underlineRef}
                className={`
    absolute left-1/2 -bottom-1
    h-0.5 w-[130%]
    -translate-x-1/2
    bg-linear-to-r from-blue-500 to-blue-700
    rounded-full
    will-change-transform
    ${active ? "scale-x-100" : "scale-x-0"}
  `}
            />
        </Link>
    );
};

/* ---------------- Navbar ---------------- */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileItemsRef = useRef<HTMLAnchorElement[]>([]);

    const pathname = usePathname();
    const cleanPath = pathname.replace(/\/$/, "") || "/";

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Products", href: "/products" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
    ];

    /* Scroll detection */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Mobile menu GSAP animation */
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.set(mobileMenuRef.current, { display: "block" });

            gsap.fromTo(
                mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
            );

            gsap.fromTo(
                mobileItemsRef.current,
                { y: 10, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.06,
                    delay: 0.1,
                    ease: "power3.out",
                }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power3.in",
                onComplete: () => {
                    if (mobileMenuRef.current) {
                        mobileMenuRef.current.style.display = "none";
                    }
                },
            });
        }
    }, [isOpen]);

    /* Pages WITHOUT header */
    const pagesWithoutHeader = ["/products-compare"];

    const isProductDetailPage =
        pathname.startsWith("/products/") && pathname !== "/products";

    const isPageWithoutHeader = pagesWithoutHeader.some((page) =>
        pathname.startsWith(page)
    );

    const useLightStyle =
        scrolled || isProductDetailPage || isPageWithoutHeader;

    const textColorClass = useLightStyle ? "text-gray-800" : "text-white";
    const bgClass = useLightStyle
        ? "backdrop-blur-xl bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2"
        : "bg-transparent py-4";

    return (
        <nav
            className={`font-nunito fixed top-0 w-full z-50 transition-all duration-300 ${bgClass}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="relative w-[260px] h-[28px]">
                            <Image
                                src={mdmLogo}
                                alt="MDM Traders Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive =
                                link.href === "/"
                                    ? cleanPath === "/"
                                    : cleanPath === link.href ||
                                    cleanPath.startsWith(`${link.href}/`);

                            return (
                                <DesktopNavLink
                                    key={link.name}
                                    href={link.href}
                                    active={isActive}
                                    textColor={textColorClass}
                                >
                                    {link.name}
                                </DesktopNavLink>
                            );
                        })}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-md transition-colors ${textColorClass}`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden hidden overflow-hidden backdrop-blur-xl bg-white/90 border-t"
            >
                <div className="px-4 pt-4 pb-6 space-y-2">
                    {navLinks.map((link, i) => {
                        const isActive =
                            link.href === "/"
                                ? cleanPath === "/"
                                : cleanPath === link.href ||
                                cleanPath.startsWith(`${link.href}/`);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                ref={(el) => {
                                    if (el) mobileItemsRef.current[i] = el;
                                }}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                                    ? "bg-blue-50 text-blue-600 font-bold"
                                    : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;