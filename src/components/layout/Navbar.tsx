"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

/* ---------------- Desktop Nav Link ---------------- */
const DesktopNavLink = ({
    href,
    children,
    scrolled,
}: {
    href: string;
    children: React.ReactNode;
    scrolled: boolean;
}) => {
    const underlineRef = useRef<HTMLSpanElement>(null);

    const handleEnter = () => {
        gsap.to(underlineRef.current, {
            scaleX: 1,
            duration: 0.35,
            ease: "power3.out",
        });
    };

    const handleLeave = () => {
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
            className={`relative text-sm font-medium ${scrolled ? "text-gray-800" : "text-white"
                }`}
        >
            {children}
            <span
                ref={underlineRef}
                className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0
                   bg-gradient-to-r from-blue-500 to-blue-700"
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

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Products", href: "#products" },
        { name: "Gallery", href: "#gallery" },
        { name: "Clients", href: "#clients" },
        { name: "Contact", href: "#contact" },
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
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power3.out",
                }
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
                    if (mobileMenuRef.current)
                        mobileMenuRef.current.style.display = "none";
                },
            });
        }
    }, [isOpen]);

    return (
        <nav
            className={`font-nunito fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled
                    ? "backdrop-blur-xl bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-2"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="bg-blue-900 text-white px-2 py-1 rounded mr-2 font-bold">
                            MDM
                        </span>
                        <span
                            className={`font-bold text-lg ${scrolled ? "text-blue-900" : "text-white"
                                }`}
                        >
                            TRADERS
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <DesktopNavLink
                                key={link.name}
                                href={link.href}
                                scrolled={scrolled}
                            >
                                {link.name}
                            </DesktopNavLink>
                        ))}
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? "text-gray-800" : "text-white"
                            }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden hidden overflow-hidden
                   backdrop-blur-xl bg-white/90 border-t"
            >
                <div className="px-4 pt-4 pb-6 space-y-2">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            ref={(el) => {
                                if (el) mobileItemsRef.current[i] = el;
                            }}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium
                         text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
