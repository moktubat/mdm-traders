"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageHeaderProps {
    title: string;
    backgroundImage: string;
    height?: string;
}

const PageHeader = ({
    title,
    backgroundImage,
    height = "h-[65vh]",
}: PageHeaderProps) => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        if (!titleRef.current) return;

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <section
            className={`relative ${height} flex items-center justify-center overflow-hidden`}
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-blue-900/70" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <h1
                    ref={titleRef}
                    className="font-grotesk text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                    {title}
                </h1>
            </div>
        </section>
    );
};

export default PageHeader;
