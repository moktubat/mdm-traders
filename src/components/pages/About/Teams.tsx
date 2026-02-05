"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Linkedin, Mail } from "lucide-react";
import team1 from "@/assets/team1.webp";
import team2 from "@/assets/team2.webp";
import team3 from "@/assets/team3.webp";
import team4 from "@/assets/team4.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/common/SectionHeading";

const team = [
    {
        name: "Fuad M M Ali (Retd)",
        role: "Chairman",
        company: "MDM Group",
        image: team1,
    },
    {
        name: "Md. Delwar Hossain",
        role: "Deputy Managing Director",
        company: "MDM Group",
        image: team2,
    },
    {
        name: "Md. Abdul Momen",
        role: "Vice-Chairman",
        company: "MDM Group",
        image: team3,
    },
    {
        name: "Md. Golam Mostafa",
        role: "Director Operations",
        company: "MDM Group",
        image: team4,
    },
];

gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const arrowLeftRef = useRef<HTMLButtonElement>(null);
    const arrowRightRef = useRef<HTMLButtonElement>(null);
    const isAnimating = useRef(false);

    // Create infinite loop by duplicating cards
    const duplicatedTeam = [...team, ...team, ...team];

    // Handle responsive cards per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCardsPerView(1);
            } else if (window.innerWidth < 1024) {
                setCardsPerView(2);
            } else {
                setCardsPerView(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setCurrentIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setCurrentIndex((prev) => prev - 1);
    };

    // Animate slider on index change
    useEffect(() => {
        if (sliderRef.current) {
            const container = sliderRef.current.parentElement;
            const containerWidth = container?.offsetWidth || 0;
            const gap = cardsPerView === 1 ? 16 : 24; // Smaller gap on mobile
            const cardWidth = (containerWidth - (gap * (cardsPerView - 1))) / cardsPerView;
            const moveDistance = (cardWidth + gap) * currentIndex;

            gsap.to(sliderRef.current, {
                x: `-${moveDistance}px`,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    isAnimating.current = false;

                    // Reset position for infinite loop
                    if (currentIndex >= team.length * 2) {
                        gsap.set(sliderRef.current, {
                            x: `-${(cardWidth + gap) * team.length}px`,
                        });
                        setCurrentIndex(team.length);
                    } else if (currentIndex <= 0) {
                        gsap.set(sliderRef.current, {
                            x: `-${(cardWidth + gap) * team.length}px`,
                        });
                        setCurrentIndex(team.length);
                    }
                }
            });
        }
    }, [currentIndex, cardsPerView]);

    // Scroll reveal animation
    useEffect(() => {
        // Initialize at middle set of cards
        setTimeout(() => {
            setCurrentIndex(team.length);
        }, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(
                sliderRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Arrow animations
            gsap.fromTo(
                [arrowLeftRef.current, arrowRightRef.current],
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.3,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Arrow hover animations
    const handleArrowEnter = (ref: React.RefObject<HTMLButtonElement | null>) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleArrowLeave = (ref: React.RefObject<HTMLButtonElement | null>) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    // Calculate card width based on viewport
    const getCardWidth = () => {
        if (cardsPerView === 1) return '100%';
        if (cardsPerView === 2) return 'calc((100% - 24px) / 2)';
        return 'calc((100% - 48px) / 3)';
    };

    return (
        <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <SectionHeading
                        title="Board of Directors"
                        subtitle="Meet the visionary leaders driving our success"
                    />
                </div>

                {/* Slider Container */}
                <div className="relative px-8 md:px-16">
                    {/* Navigation Arrows */}
                    <button
                        ref={arrowLeftRef}
                        onClick={prevSlide}
                        onMouseEnter={() => handleArrowEnter(arrowLeftRef)}
                        onMouseLeave={() => handleArrowLeave(arrowLeftRef)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                                 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl
                                 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white
                                 transition-colors duration-300 border-2 border-blue-100"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </button>

                    <button
                        ref={arrowRightRef}
                        onClick={nextSlide}
                        onMouseEnter={() => handleArrowEnter(arrowRightRef)}
                        onMouseLeave={() => handleArrowLeave(arrowRightRef)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                                 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-xl
                                 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white
                                 transition-colors duration-300 border-2 border-blue-100"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                    </button>

                    {/* Slider Wrapper */}
                    <div className="overflow-hidden pb-12">
                        <div
                            ref={sliderRef}
                            className="flex gap-4 md:gap-6"
                        >
                            {duplicatedTeam.map((member, index) => (
                                <div
                                    key={index}
                                    className="shrink-0"
                                    style={{
                                        width: getCardWidth()
                                    }}
                                >
                                    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                                            {/* Hover Content */}
                                            <div className="absolute inset-0 flex items-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="flex gap-3">
                                                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                                                        <Linkedin className="w-5 h-5" />
                                                    </button>
                                                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                                                        <Mail className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="p-4 md:p-5 relative">
                                            {/* Decorative Element */}
                                            <div className="absolute top-0 left-4 md:left-5 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 -translate-y-1/2"></div>

                                            <h3 className="font-grotesk text-base md:text-lg lg:text-xl font-bold text-blue-900 mb-1 leading-tight">
                                                {member.name}
                                            </h3>
                                            <p className="font-nunito text-blue-600 font-semibold text-sm md:text-base mb-0.5">
                                                {member.role}
                                            </p>
                                            <p className="font-nunito text-gray-500 text-xs md:text-sm">
                                                {member.company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 bg-transparent">
                        {team.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(team.length + index)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex % team.length === index
                                    ? "w-8 bg-blue-600"
                                    : "w-2 bg-gray-300 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teams;