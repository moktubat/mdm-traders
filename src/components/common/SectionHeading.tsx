"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const SectionHeading = ({ title, subtitle, center = true }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                },
            });

            // Title reveal
            tl.fromTo(
                titleRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                }
            )

                // Subtitle fade
                .fromTo(
                    subtitleRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )

                // Line grow
                .fromTo(
                    lineRef.current,
                    { width: 0, opacity: 0 },
                    {
                        width: 80,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${center ? "text-center" : ""} mb-14`}
        >
            <h2
                ref={titleRef}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4"
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    ref={subtitleRef}
                    className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
                >
                    {subtitle}
                </p>
            )}

            <div
                ref={lineRef}
                className="h-1 bg-linear-to-r from-blue-500 to-blue-700 mx-auto rounded-full"
            />
        </div>
    );
};

export default SectionHeading;
