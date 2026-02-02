"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Calendar, MapPin, Award } from "lucide-react";
import SectionHeading from "../../common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "HSIA 3rd Terminal Expansion Project",
        description: "HSIA 3rd terminal expansion project - supply & installation of Radio system (Capacity Max - Single Site Trunk System)",
        category: "in-progress",
        date: "27/07/2021",
        location: "Hazrat Shahjalal International Airport",
        client: "Civil Aviation Authority",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 2,
        title: "DMR Trunking System for Bangladesh Police",
        description: "Supply, installation, testing & commissioning of DMR Trunking (Tier 3) on turnkey basis for Bangladesh Police.",
        category: "in-progress",
        date: "23/06/2021",
        location: "Nationwide Deployment",
        client: "Bangladesh Police",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 3,
        title: "Tier III Data Centre Infrastructure",
        description: "Procurement and installation of 1x Tier III Data Centre along with all accessories & infrastructure including construction of the complex",
        category: "in-progress",
        date: "24/06/2021",
        location: "Dhaka",
        client: "Government of Bangladesh",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 4,
        title: "UHF DMR Walkie Talkie System",
        description: "Supply, installation, testing & commissioning of DMR Trunking (Tier 3) system on turnkey basis for Bangladesh Police. (UHF DMR Walkie Talkie with necessary accessories).",
        category: "in-progress",
        date: "27/06/2021",
        location: "Multiple Locations",
        client: "Bangladesh Police",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 5,
        title: "VHF DMR Radio System Implementation",
        description: "Supply, installation, testing & commissioning of VHF DMR Radio system for Bangladesh Police.",
        category: "completed",
        date: "25/06/2019",
        location: "Nationwide",
        client: "Bangladesh Police",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: 6,
        title: "Radio Linking System",
        description: "Supply, installation, testing & commissioning of radio linking system on turnkey basis for Bangladesh Police.",
        category: "completed",
        date: "27/06/2019",
        location: "Bangladesh",
        client: "Bangladesh Police",
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    }
];

const Projects = () => {
    const [filter, setFilter] = useState("all");
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const filteredProjects =
        filter === "all" ? projects : projects.filter((p) => p.category === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll-triggered entrance
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [filter]);

    // Smooth hover effect with proper cleanup
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const img = card.querySelector("img");
        const overlay = card.querySelector(".overlay-content");

        gsap.to(img, {
            scale: 1.08,
            duration: 0.6,
            ease: "power2.out",
        });

        gsap.to(overlay, {
            background: "linear-gradient(to top, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.4) 100%)",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const img = card.querySelector("img");
        const overlay = card.querySelector(".overlay-content");

        gsap.to(img, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
        });

        gsap.to(overlay, {
            background: "linear-gradient(to top, rgba(30, 58, 138, 0.9) 0%, transparent 100%)",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    return (
        <section className="py-15 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-12">
                    <SectionHeading
                        title="Our Projects"
                        subtitle="Delivering excellence in communication infrastructure and technology solutions"
                    />

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {["all", "completed", "in-progress"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`font-nunito px-6 py-2.5 rounded-full capitalize font-medium transition-all duration-300 ${filter === cat
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200"
                                    }`}
                            >
                                {cat === "all" ? "All Projects" : cat.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer bg-white"
                        >
                            {/* Image Container */}
                            <div className="relative h-96 md:h-[30rem] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span
                                        className={`font-nunito px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide backdrop-blur-md ${project.category === "completed"
                                            ? "bg-green-500/90 text-white"
                                            : "bg-yellow-500/90 text-white"
                                            }`}
                                    >
                                        {project.category === "completed" ? "Completed" : "In Progress"}
                                    </span>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="overlay-content absolute inset-0 bg-linear-to-t from-blue-900/90 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                    {/* Title & Description */}
                                    <h3 className="font-grotesk text-white text-xl sm:text-2xl font-bold mb-2 leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="font-nunito text-blue-100 text-sm sm:text-base mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Project Details */}
                                    <div className="font-nunito space-y-2 text-sm">
                                        <div className="flex items-center text-blue-200">
                                            <Calendar className="w-4 h-4 mr-2 shrink-0" />
                                            <span>Contract Date: {project.date}</span>
                                        </div>
                                        <div className="flex items-center text-blue-200">
                                            <MapPin className="w-4 h-4 mr-2 shrink-0" />
                                            <span>{project.location}</span>
                                        </div>
                                        <div className="flex items-center text-blue-200">
                                            <Award className="w-4 h-4 mr-2 shrink-0" />
                                            <span>Client: {project.client}</span>
                                        </div>
                                    </div>

                                    {/* View Details Arrow */}
                                    <div className="font-nunito mt-4 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                        <span className="text-sm">View Details</span>
                                        <svg
                                            className="w-5 h-5 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;