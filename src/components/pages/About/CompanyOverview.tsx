"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Award, Users, Target, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const CompanyOverview = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // Stats animation
            gsap.from(".stat-card", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                },
            });

            // Content animation
            gsap.from(".content-card", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                },
            });

            // Image animation
            gsap.from(imageRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { icon: Award, label: "Years of Excellence", value: "11+" },
        { icon: Users, label: "Expert Team Experience", value: "30+ Years" },
        { icon: Target, label: "Clients Served", value: "500+" },
        { icon: TrendingUp, label: "Success Rate", value: "98%" },
    ];

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <SectionHeading
                    title="Helping our customers succeed and grow since 2013"
                />

                {/* Stats Cards */}
                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-card bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                    <stat.icon className="w-7 h-7 text-blue-600" />
                                </div>
                                <div className="font-grotesk text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="font-nunito text-sm text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Column - Text Content */}
                    <div ref={contentRef} className="space-y-6">
                        {/* Card 1 */}
                        <div className="content-card bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                            <p className="font-nunito text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                                Founded in 2013, M.D.M Traders Limited is a registered private limited company, governed under the company act 1994 of Bangladesh.
                            </p>
                            <p className="font-nunito text-base md:text-lg text-gray-700 leading-relaxed">
                                As an authorised dealers of multiple manufacturers and Bangladesh&apos;s largest two-way radio system supplier, we provide our customers with one source for all communication needs. We help organizations and businesses to keep their workers safe and communicate better by offering them the right two-way radio and networking solutions at a competitive price.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="content-card bg-blue-50 rounded-2xl p-6 md:p-8 shadow-sm">
                            <p className="font-nunito text-base md:text-lg text-gray-700 leading-relaxed">
                                Currently, we are proudly serving government security & intelligence agencies, private companies, organisations, defence and military forces nationwide.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="content-card bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                            <p className="font-nunito text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                                To ensure quality service, we have highly board and management team. Our board of directors have over 30 years of experience in the telecommunication field and all our sales consultants, engineers and technicians are all highly-trained and certified to work with the products we carry.
                            </p>
                            <p className="font-nunito text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                                Whatever your requirements are, we believe, we can help you with a range of turnkey solutions and with ever changing technology as we work hard to get to know you, to understand your needs and to understand how our products or services can help your business.
                            </p>
                            <p className="font-nunito text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                                If you would like to know more about us or to arrange a visit, please get in touch.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div ref={imageRef} className="relative">
                        <div className="sticky top-24">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5]">
                                <Image
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                                    alt="Professional team collaboration"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;