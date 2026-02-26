"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CompanyOverview = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageWrapRef = useRef(null);
    const badgeRef = useRef(null);
    const extraTextRef = useRef(null);
    const statYearsRef = useRef(null);
    const statClientsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Text block animation
            gsap.fromTo(
                textRef.current,
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Image entrance
            gsap.fromTo(
                imageWrapRef.current,
                { scale: 0.92, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Image parallax
            gsap.to(imageWrapRef.current, {
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Count-up: Years
            gsap.fromTo(
                statYearsRef.current,
                { innerText: 0 },
                {
                    innerText: 12,
                    duration: 1.6,
                    ease: "power3.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );

            // Count-up: Clients
            gsap.fromTo(
                statClientsRef.current,
                { innerText: 0 },
                {
                    innerText: 500,
                    duration: 1.6,
                    ease: "power3.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );

            // Floating badge
            gsap.to(badgeRef.current, {
                yPercent: -10,
                duration: 2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                force3D: true,
            });

            // Extra text fade in
            gsap.fromTo(
                extraTextRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: extraTextRef.current,
                        start: "top 80%",
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Two-column grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    {/* Image — left */}
                    <div ref={imageWrapRef} className="relative">
                        <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600"
                                alt="Professional team collaboration"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating badge */}
                        <div
                            ref={badgeRef}
                            style={{ willChange: "transform" }}
                            className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl hidden md:block"
                        >
                            <p className="font-grotesk text-2xl font-bold">Since 2013</p>
                            <p className="font-nunito text-sm opacity-80">Trusted Nationwide</p>
                        </div>
                    </div>

                    {/* Text — right */}
                    <div ref={textRef} className="lg:pl-6">
                        <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-blue-900 mb-2 leading-tight">
                            Helping our customers succeed
                        </h2>
                        <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                            and grow since 2013
                        </h2>
                        <div className="w-16 h-1 bg-blue-600 mb-6 rounded-full"></div>

                        <p className="font-nunito text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                            Founded in 2013, M.D.M Traders Limited is a registered private limited company governed under the Company Act 1994 of Bangladesh — and the country&apos;s largest two-way radio system supplier.
                        </p>

                        <p className="font-nunito text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                            We proudly serve government security & intelligence agencies, private companies, defence and military forces nationwide — providing turnkey communication solutions at competitive prices.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="border-l-4 border-blue-600 pl-4">
                                <h4 className="font-grotesk text-3xl font-bold text-blue-900">
                                    <span ref={statYearsRef}>0</span>+
                                </h4>
                                <p className="font-nunito text-sm text-gray-500">Years Experience</p>
                            </div>
                            <div className="border-l-4 border-blue-600 pl-4">
                                <h4 className="font-grotesk text-3xl font-bold text-blue-900">
                                    <span ref={statClientsRef}>0</span>+
                                </h4>
                                <p className="font-nunito text-sm text-gray-500">Clients Served</p>
                            </div>
                        </div>

                        {/* CTA */}
                        {/* <Link
                            href="/products"
                            className="font-nunito text-sm md:text-base inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 md:px-7 py-2.5 md:py-3 rounded-full transition-colors"
                        >
                            See Our Latest Products
                        </Link> */}
                    </div>
                </div>

                {/* Full-width extra text below */}
                {/* <div
                    ref={extraTextRef}
                    className="mt-20 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <p className="font-nunito text-gray-600 text-base md:text-lg leading-relaxed">
                        Our board of directors has over 30 years of experience in the telecommunications field. All sales consultants, engineers, and technicians are highly trained and certified to work with the products we carry.
                    </p>
                    <p className="font-nunito text-gray-600 text-base md:text-lg leading-relaxed">
                        Whatever your requirements are, we provide turnkey solutions tailored to your needs — working hard to understand your business and how our products and services can help you grow. Get in touch to learn more or arrange a visit.
                    </p>
                </div> */}

            </div>
        </section>
    );
};

export default CompanyOverview;