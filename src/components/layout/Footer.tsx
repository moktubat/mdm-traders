"use client";

import React, { useEffect, useRef } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Linkedin,
    Twitter,
} from "lucide-react";
import gsap from "gsap";

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<HTMLDivElement[]>([]);

    /* Scroll reveal animation */
    useEffect(() => {
        if (!footerRef.current) return;

        gsap.fromTo(
            columnRefs.current,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <footer
            id="contact"
            ref={footerRef}
            className="relative bg-gray-900 text-white pt-20 pb-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div
                        ref={(el) => el && (columnRefs.current[0] = el)}
                        className="space-y-6"
                    >
                        <div className="text-2xl font-bold flex items-center">
                            <span className="bg-blue-600 text-white p-1 rounded mr-2">
                                MDM
                            </span>
                            <span>TRADERS</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Leading Two-Way Radio, high speed wireless and networking solutions
                            provider in Bangladesh since 2013.
                        </p>

                        {/* Socials */}
                        <div className="flex space-x-4">
                            {[Facebook, Linkedin, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 bg-gray-800 rounded-full transition-all
                             hover:bg-blue-600 hover:-translate-y-1"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div
                        ref={(el) => el && (columnRefs.current[1] = el)}
                    >
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400">
                            {[
                                { label: "Home", href: "/" },
                                { label: "About Us", href: "#about" },
                                { label: "Projects", href: "#projects" },
                                { label: "Products", href: "#products" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="relative inline-block hover:text-white transition-colors
                               after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                               after:w-full after:scale-x-0 after:origin-left
                               after:bg-blue-500 after:transition-transform
                               hover:after:scale-x-100"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div
                        ref={(el) => el && (columnRefs.current[2] = el)}
                    >
                        <h4 className="text-lg font-bold mb-6">Contact Info</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <MapPin className="text-blue-600 shrink-0" size={20} />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="text-blue-600 shrink-0" size={20} />
                                <span>+880 193 244 8883</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="text-blue-600 shrink-0" size={20} />
                                <span>delwar@mdmbd.net</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div
                        ref={(el) => el && (columnRefs.current[3] = el)}
                    >
                        <h4 className="text-lg font-bold mb-6">Newsletter</h4>
                        <p className="text-gray-400 mb-4">
                            Subscribe to get latest updates.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg
                           focus:outline-none w-full"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 px-4 py-2 rounded-r-lg
                           hover:bg-blue-700 transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} MDM Traders Limited. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
