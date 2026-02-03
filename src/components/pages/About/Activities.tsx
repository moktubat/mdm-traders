"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const activities = [
    { value: 52_000_000, label: "Total Revenue", format: "M" },
    { value: 63, label: "Total Projects Completed", format: "+" },
    { value: 42, label: "Number of Employees", format: "+" },
];

const Activities = () => {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        ScrollTrigger.refresh();

        // Animate cards from bottom to top
        const cards = cardsRef.current.filter(Boolean).reverse();

        cards.forEach((el, i) => {
            if (!el) return;

            const heading = el.querySelector("h3");
            if (!heading) return;

            const index = cardsRef.current.indexOf(el);
            const counter = { val: 0 };

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    once: true,
                },
            });

            // Card entrance animation
            tl.fromTo(
                el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }
            );

            // Number count animation
            tl.to(
                counter,
                {
                    val: activities[index].value,
                    duration: 1.8,
                    ease: "power1.out",
                    onUpdate: () => {
                        let displayVal = Math.floor(counter.val).toLocaleString();

                        if (activities[index].format === "M") {
                            displayVal =
                                Math.floor(counter.val / 1_000_000) + " M";
                        } else if (activities[index].format === "+") {
                            displayVal = Math.floor(counter.val) + "+";
                        }

                        heading.innerText = displayVal;
                    },
                },
                "-=0.4" // overlap with entrance
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Activities"
                    subtitle="Our achievements in numbers"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {activities.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className="font-grotesk bg-blue-50 p-10 rounded-2xl shadow-sm opacity-0"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                0
                            </h3>
                            <p className="font-nunito text-gray-600 text-lg">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;
