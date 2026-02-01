"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import partnerBg1 from "@/assets/partnerBg1.jpg";
import partnerBg2 from "@/assets/partnerBg2.jpg";
import partnerCard from "@/assets/partnerCard.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const slides = [
        {
            id: 1,
            title: "Motorola Solutions",
            description:
                "We are proud to be a Motorola Solutions 'Platinum Channel Partner', a title given by Motorola Solutions to distinguish our expertise and success in delivering innovative solutions that help our customers streamline processes, reduce risk, and increase efficiency. As an authorised Motorola Solutions Channel Partner, our team has access to the full line of Motorola two-way radios and accessories.",
            image: partnerBg1,
        },
        {
            id: 2,
            title: "Cambium Networks",
            description:
                "M.D.M Traders Limited has been recognised by Cambium Networks, a leading global provider of wireless networking solutions and products, as its newest distribution partner in Bangladesh. We're distributing the full line of Cambium Networks' wireless networking solutions and products throughout the country.",
            image: partnerBg2,
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Smooth GSAP animation for content
    useEffect(() => {
        if (!contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [currentSlide]);

    // Auto-play slider
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-24 overflow-hidden">
            <div ref={containerRef} className="relative h-[600px] md:h-[700px]">
                {/* Background images - crossfade */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}
                        style={{
                            opacity: index === currentSlide ? 1 : 0,
                            zIndex: index === currentSlide ? 0 : -1,
                        }}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                ))}

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                    <div
                        ref={contentRef}
                        className="max-w-3xl text-white space-y-6 md:space-y-8"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            {slides[currentSlide].title}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-100">
                            {slides[currentSlide].description}
                        </p>

                        {/* Show partnerCard only on slide 1 */}
                        {currentSlide === 0 && (
                            <div className="mt-6 flex justify-center">
                                <Image
                                    src={partnerCard}
                                    alt="Partner Card"
                                    width={300}
                                    height={200}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        )}

                        {/* Slide indicators */}
                        <div className="flex gap-3 pt-4 justify-center">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? "w-12 bg-white"
                                            : "w-8 bg-white/50 hover:bg-white/75"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 group cursor-pointer"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 group cursor-pointer"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default Partners;
