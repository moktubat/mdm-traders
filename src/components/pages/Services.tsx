"use client";

import React, { useRef, useEffect } from "react";
import { Wifi, Settings, Lightbulb, PencilRuler } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: <PencilRuler className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />,
        title: "Tele-Communication System Planning & Design",
    },
    {
        icon: <Wifi className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />,
        title: "Supply, Installation & Commissioning of Two-way Radio System",
    },
    {
        icon: <Settings className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />,
        title: "After Sale Service (Warranty, Repair & Maintenance)",
    },
    {
        icon: <Lightbulb className="w-8 h-8 md:w-12 md:h-12 text-blue-600" />,
        title: "Training (Foreign or Local)",
    },
];

const Services = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered reveal animation on scroll
            gsap.fromTo(
                cardsRef.current,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Smooth hover handlers
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const icon = card.querySelector(".service-icon");

        gsap.to(card, {
            y: -8,
            duration: 0.4,
            ease: "power2.out",
        });

        gsap.to(icon, {
            scale: 1.1,
            rotate: 5,
            duration: 0.4,
            ease: "back.out(1.7)",
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const icon = card.querySelector(".service-icon");

        gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
        });

        gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    return (
        <section ref={sectionRef} className="py-15 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <SectionHeading
                        title="Our Services"
                        subtitle="Comprehensive telecommunication solutions tailored to your needs"
                    />
                </div>

                {/* Services Grid */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-400 cursor-pointer border border-gray-100 flex flex-col h-full"
                        >
                            {/* Icon Container */}
                            <div className="service-icon mb-6 w-fit p-4 bg-blue-50 rounded-xl">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 leading-tight">
                                {service.title}
                            </h3>


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;