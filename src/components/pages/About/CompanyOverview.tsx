"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CompanyOverview = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const leftContentRef = useRef(null);
    const rightContentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                },
            });

            // Left column animation
            gsap.from(leftContentRef.current, {
                opacity: 0,
                x: -20,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: leftContentRef.current,
                    start: "top 80%",
                },
            });

            // Right column animation
            gsap.from(rightContentRef.current, {
                opacity: 0,
                x: 20,
                duration: 1,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: rightContentRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={headerRef} className="mb-6 md:mb-12">
                    <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-8">
                        Helping our customers succeed and grow since 2013
                    </h2>
                </div>

                <div className="font-nunito grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 text-base md:text-lg text-gray-600 leading-relaxed">
                    <div ref={leftContentRef}>
                        <p className="mb-3 md:mb-6">
                            Founded in 2013, M.D.M Traders Limited is a registered private limited company, governed under the company act 1994 of Bangladesh.
                        </p>
                        <p className="mb-3 md:mb-6">
                            As an authorised dealers of multiple manufacturers and Bangladesh’s largest two-way radio system supplier, we provide our customers with one source for all communication needs. We help organizations and businesses to keep their workers safe and communicate better by offering them the right two-way radio and networking solutions at a competitive price.
                        </p>
                        <p>
                            Currently, we are proudly serving government security & intelligence agencies, private companies, organisations, defence and military forces nationwide.
                        </p>
                    </div>

                    <div ref={rightContentRef}>
                        <p className="mb-3 md:mb-6">
                            To ensure quality service, we have highly  board and management team. Our board of directors have over 30 years of experience in the telecommunication field and all our sales consultants, engineers and technicians are all highly-trained and certified to work with the products we carry.
                        </p>
                        <p className="mb-3 md:mb-6">
                            Whatever your requirements are, we believe, we can help you with a range of turnkey solutions and with ever changing technology as we work hard to get to know you, to understand your needs and to understand how our products or services can help your business.
                        </p>
                        <p>If you would like to know more about us or to arrange a visit, please get in touch.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;
