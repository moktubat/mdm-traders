"use client";

import { useState, useEffect, useRef } from "react";
import heroBg1 from "@/assets/heroBg1.webp";
import heroBg2 from "@/assets/heroBg2.webp";
import heroBg3 from "@/assets/heroBg3.webp";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        img: heroBg1.src,
        text: "Leading Two-Way Radio, <br> high speed wireless and networking <br> solutions provider in Bangladesh.",
    },
    {
        img: heroBg2.src,
        text: "Motorola Solutions Platinum <br> Channel Partner",
    },
    {
        img: heroBg3.src,
        text: "Cambium Network <br> Channel Partner",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    const slideRefs = useRef<HTMLDivElement[]>([]);
    const textRefs = useRef<HTMLDivElement[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);

    const nextSlide = () =>
        setCurrent((prev) => (prev + 1) % slides.length);

    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        /* ---------------- SLIDE IMAGE ANIMATION ---------------- */
        slideRefs.current.forEach((slide, i) => {
            if (!slide) return;

            gsap.to(slide, {
                opacity: i === current ? 1 : 0,
                scale: i === current ? 1 : 1.1,
                duration: 1.4,
                ease: "power3.out",
            });
        });

        /* ---------------- TEXT OUT (PREVIOUS SLIDE) ---------------- */
        textRefs.current.forEach((textEl, i) => {
            if (!textEl) return;

            const spans = textEl.querySelectorAll("span");

            if (i !== current) {
                // Hide immediately
                gsap.set(spans, { opacity: 0, y: -30 });
            }
        });

        /* ---------------- TEXT IN (CURRENT SLIDE) ---------------- */
        if (textRefs.current[current]) {
            const spans = textRefs.current[current].querySelectorAll("span");

            gsap.killTweensOf(spans);

            gsap.set(spans, { y: 40, opacity: 0 });

            gsap.to(spans, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.12,
                ease: "power4.out",
            });
        }

        /* ---------------- CTA BUTTON ---------------- */
        if (buttonRef.current) {
            gsap.killTweensOf(buttonRef.current);
            gsap.fromTo(
                buttonRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
        }

        /* ---------------- COUNTER ---------------- */
        if (counterRef.current) {
            gsap.killTweensOf(counterRef.current);
            gsap.fromTo(
                counterRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [current]);

    /* ---------------- BUTTON HOVER ---------------- */
    const handleButtonEnter = () => {
        if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleButtonLeave = () => {
        if (!buttonRef.current) return;
        gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
        });
    };

    return (
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[850px] overflow-hidden">
            {/* SLIDES */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) slideRefs.current[i] = el;
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 scale-110"
                    style={{
                        backgroundImage: `url(${slide.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* TEXT */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                        <div
                            ref={(el) => {
                                if (el) textRefs.current[i] = el;
                            }}
                            className="text-center"
                        >
                            {slide.text.split(/<br\s*\/?>/i).map((t, j) => (
                                <span
                                    key={j}
                                    className="block text-4xl sm:text-5xl md:text-6xl
                   font-bold text-white mb-2
                   will-change-transform will-change-opacity"
                                >
                                    {t.trim()}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        {i === current && (
                            <button
                                ref={buttonRef}
                                onMouseEnter={handleButtonEnter}
                                onMouseLeave={handleButtonLeave}
                                className="mt-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 
                                           text-white font-semibold rounded-md shadow-lg
                                           border border-blue-500/30 backdrop-blur-sm"
                            >
                                Explore Our Products
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* NAVIGATION */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2
                           w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                           border border-white/30 text-white
                           hover:bg-white/30 transition flex items-center justify-center z-10 cursor-pointer"
            >
                <ChevronLeft size={28} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2
                           w-14 h-14 rounded-full bg-white/20 backdrop-blur-md
                           border border-white/30 text-white
                           hover:bg-white/30 transition flex items-center justify-center z-10 cursor-pointer"
            >
                <ChevronRight size={28} />
            </button>

            {/* COUNTER */}
            <div
                ref={counterRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2
                           px-8 py-3 rounded-full bg-white/20 backdrop-blur-md
                           border border-white/30 text-white tracking-widest z-10"
            >
                0{current + 1} / 0{slides.length}
            </div>
        </div>
    );
}
