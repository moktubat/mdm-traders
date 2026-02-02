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
    const sectionRef = useRef(null);
    const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        numberRefs.current.forEach((el, index) => {
            if (!el) return;

            const heading = el.querySelector("h3");
            if (!heading) return;

            const obj = { val: 0 };

            gsap.to(obj, {
                val: activities[index].value,
                duration: 2,
                delay: index * 0.2,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
                onUpdate: () => {
                    let displayVal = Math.floor(obj.val).toLocaleString();

                    if (activities[index].format === "M") {
                        displayVal = Math.floor(obj.val / 1_000_000) + " M";
                    } else if (activities[index].format === "+") {
                        displayVal = Math.floor(obj.val) + "+";
                    }

                    heading.innerText = displayVal;
                },
            });

            gsap.from(el, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
            });
        });
    }, []);


    return (
        <section ref={sectionRef} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Activities"
                    subtitle="Our achievements in numbers"
                />

                {/* Activities Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {activities.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                numberRefs.current[index] = el;
                            }}
                            className="font-grotesk bg-blue-50 p-10 rounded-2xl shadow-sm"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                                0
                            </h3>
                            <p className="font-nunito text-gray-600 text-lg">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;
