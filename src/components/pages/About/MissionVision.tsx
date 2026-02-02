"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import mission from "@/assets/mission.webp";
import vision from "@/assets/vision.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".hover-content", { opacity: 0, y: 20 });
            gsap.set(".blue-overlay", { opacity: 0 });
            gsap.set(".default-content", { opacity: 1 });

            // Scroll animations
            gsap.fromTo(
                missionRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: missionRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.fromTo(
                visionRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: visionRef.current,
                        start: "top 80%",
                    },
                }
            );

            gsap.set(".hover-content", {
                opacity: 0,
                y: 20,
                scale: 0.96,
            });

            gsap.set(".blue-overlay", { opacity: 0 });

            gsap.set(".default-content", {
                opacity: 1,
                scale: 1,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const overlay = card.querySelector(".blue-overlay");
        const defaultContent = card.querySelector(".default-content");
        const hoverContent = card.querySelector(".hover-content");

        gsap.killTweensOf([overlay, defaultContent, hoverContent]);

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.to(overlay, { opacity: 1, duration: 0.4 }, 0)
            .to(defaultContent, { opacity: 0, duration: 0.25 }, 0)
            .to(
                hoverContent,
                { opacity: 1, y: 0, scale: 1, duration: 0.4 },
                0.15
            );
    };


    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const overlay = card.querySelector(".blue-overlay");
        const defaultContent = card.querySelector(".default-content");
        const hoverContent = card.querySelector(".hover-content");

        gsap.killTweensOf([overlay, defaultContent, hoverContent]);

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.to(overlay, { opacity: 0, duration: 0.35 }, 0)
            .to(
                hoverContent,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.96,
                    duration: 0.35,
                },
                0
            )
            .to(
                defaultContent,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                },
                0.2
            );
    };


    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <SectionHeading
                        title="Mission & Vision"
                        subtitle="Driving innovation and excellence in telecommunications"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <div
                        ref={missionRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="group relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                    >
                        {/* Background Image */}
                        <Image
                            src={mission}
                            alt="Our Mission"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Default Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Blue Hover Overlay */}
                        <div className="blue-overlay absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 opacity-0"></div>

                        {/* Default Content (Icon + Title) */}
                        <div className="default-content absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none will-change-transform will-change-opacity">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-white/50">
                                <Target className="text-blue-600 w-10 h-10 sm:w-12 sm:h-12" />
                            </div>
                            <h3 className="font-grotesk text-3xl sm:text-4xl font-bold text-white drop-shadow-2xl">
                                Our Mission
                            </h3>
                        </div>

                        {/* Hover Content (Description) */}
                        <div className="hover-content absolute inset-0 flex flex-col items-center justify-center z-10 opacity-0 px-8 sm:px-12 pointer-events-none will-change-transform will-change-opacity">
                            <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                Our Mission
                            </h3>
                            <p className="font-nunito text-white text-center text-base sm:text-lg leading-relaxed drop-shadow-lg">
                                Our mission is to meet the needs of our partners, our clients and our
                                communities and provide secure, reliable, advanced telecommunication
                                and networking systems at the best value possible.
                            </p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div
                        ref={visionRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="group relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                    >
                        {/* Background Image */}
                        <Image
                            src={vision}
                            alt="Our Vision"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Default Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Blue Hover Overlay */}
                        <div className="blue-overlay absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 opacity-0"></div>

                        {/* Default Content (Icon + Title) */}
                        <div className="default-content absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none will-change-transform will-change-opacity">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-white/50">
                                <Eye className="text-blue-600 w-10 h-10 sm:w-12 sm:h-12" />
                            </div>
                            <h3 className="font-grotesk text-3xl sm:text-4xl font-bold text-white drop-shadow-2xl">
                                Our Vision
                            </h3>
                        </div>

                        {/* Hover Content (Description) */}
                        <div className="hover-content absolute inset-0 flex flex-col items-center justify-center z-10 opacity-0 px-8 sm:px-12 pointer-events-none will-change-transform will-change-opacity">
                            <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                Our Vision
                            </h3>
                            <p className="font-nunito text-white text-center text-base sm:text-lg leading-relaxed drop-shadow-lg">
                                Our vision is to help our clients achieve their business goals by
                                offering total telecommunication solutions with unparalleled customer
                                support and to contribute to the inclusive socio-economic development
                                of Bangladesh.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;