"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Project } from "@/types/project";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Calendar, MapPin, Award } from "lucide-react";
import { urlFor } from "@/lib/sanity";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsContentProps {
    allProjects: Project[];
}

const ProjectsContent = ({ allProjects }: ProjectsContentProps) => {
    const [filter, setFilter] = useState("all");
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const filteredProjects = useMemo(() => {
        if (filter === "all") return allProjects;
        return allProjects.filter((p) => p.category === filter);
    }, [filter, allProjects]);

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

    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
            background:
                "linear-gradient(to top, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.4) 100%)",
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
            background:
                "linear-gradient(to top, rgba(30, 58, 138, 0.9) 0%, transparent 100%)",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    return (
        <section className="py-15 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
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
                            key={project._id}
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
                                    src={urlFor(project.image).width(800).height(600).url()}
                                    alt={project.image.alt || project.title}
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
                                        {project.category === "completed"
                                            ? "Completed"
                                            : "In Progress"}
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
                                            <span>Contract Date: {formatDate(project.contractDate)}</span>
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
                                    {/* <div className="font-nunito mt-4 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="font-nunito text-gray-500 text-lg">
                            No projects found in this category.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsContent;