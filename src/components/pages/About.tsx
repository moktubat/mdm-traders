"use client";

import React, { useEffect, useRef } from "react";
import aboutSection from "@/assets/aboutSection.webp";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    const statYearsRef = useRef<HTMLSpanElement>(null);
    const statPartnerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Text block animation */
            gsap.fromTo(
                textRef.current,
                { x: -60, opacity: 0 },
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

            /* Count-up: Years */
            gsap.fromTo(
                statYearsRef.current,
                { innerText: 0 },
                {
                    innerText: 10,
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

            /* Count-up: Partner */
            gsap.fromTo(
                statPartnerRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                }
            );

            /* Image entrance */
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

            /* Image parallax */
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

            /* Floating badge */
            gsap.to(badgeRef.current, {
                yPercent: -10,        // move up 10% of its height
                duration: 2,           // speed of float
                ease: "sine.inOut",    // smooth easing
                repeat: -1,
                yoyo: true,            // float back down
                force3D: true          // use GPU for smoother animation
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-15 md:py-24 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                    {/* Text */}
                    <div ref={textRef}>
                        <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                            Connecting people in the moments that matter
                        </h2>

                        <p className="font-nunito text-gray-600 text-lg mb-8 leading-relaxed">
                            MDM Traders Limited is a technology service provider with expertise
                            in high speed wireless voice, data, and video solutions. Since
                            2013, we have been meeting the requirements of public safety,
                            government, military and enterprise customers — backed by
                            “Total Customer Satisfaction”.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div className="border-l-4 border-blue-600 pl-4">
                                <h4 className="font-grotesk text-3xl font-bold text-blue-900">
                                    <span ref={statYearsRef}>0</span>+
                                </h4>
                                <p className="font-nunito text-sm text-gray-500">Years Experience</p>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-4">
                                <h4
                                    ref={statPartnerRef}
                                    className="font-grotesk text-3xl font-bold text-blue-900"
                                >
                                    Platinum
                                </h4>
                                <p className="font-nunito text-sm text-gray-500">Motorola Partner</p>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href="/about"
                            className="font-nunito inline-flex items-center gap-2
              bg-blue-600 hover:bg-blue-700 text-white
              font-semibold px-7 py-3 rounded-full transition-colors"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Image */}
                    <div
                        ref={imageWrapRef}
                        className="relative lg:flex lg:justify-center"
                    >
                        <Image
                            src={aboutSection}
                            alt="MDM Traders Team"
                            width={600}
                            height={450}
                            className="rounded-2xl shadow-2xl object-cover"
                            priority={false}
                        />

                        {/* Floating badge */}
                        <div
                            ref={badgeRef}
                            style={{ willChange: 'transform' }}
                            className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl hidden md:block"
                        >
                            <p className="font-grotesk text-2xl font-bold">Since 2013</p>
                            <p className="font-nunito text-sm opacity-80">Serving Bangladesh</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
