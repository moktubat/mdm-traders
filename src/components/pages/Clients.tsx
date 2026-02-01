"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

import clientImg01 from "@/assets/clients/clientImg01.png";
import clientImg02 from "@/assets/clients/clientImg02.png";
import clientImg03 from "@/assets/clients/clientImg03.png";
import clientImg04 from "@/assets/clients/clientImg04.png";
import clientImg05 from "@/assets/clients/clientImg05.png";
import clientImg06 from "@/assets/clients/clientImg06.png";
import clientImg07 from "@/assets/clients/clientImg07.png";
import clientImg08 from "@/assets/clients/clientImg08.png";
import clientImg09 from "@/assets/clients/clientImg09.png";
import clientImg10 from "@/assets/clients/clientImg10.png";
import clientImg11 from "@/assets/clients/clientImg11.png";
import clientImg12 from "@/assets/clients/clientImg12.png";
import clientImg13 from "@/assets/clients/clientImg13.png";
import clientImg14 from "@/assets/clients/clientImg14.png";
import clientImg15 from "@/assets/clients/clientImg15.png";
import clientImg16 from "@/assets/clients/clientImg16.png";
import clientImg17 from "@/assets/clients/clientImg17.png";
import clientImg18 from "@/assets/clients/clientImg18.png";
import clientImg19 from "@/assets/clients/clientImg19.png";
import clientImg20 from "@/assets/clients/clientImg20.png";
import clientImg21 from "@/assets/clients/clientImg21.png";
import clientImg22 from "@/assets/clients/clientImg22.png";
import SectionHeading from "../common/SectionHeading";

const clients = [
    { name: "Bangladesh Police", img: clientImg01 },
    { name: "National Security Intelligence (NSI)", img: clientImg02 },
    { name: "Special Security Force (SSF)", img: clientImg03 },
    { name: "Rapid Action Battalion (RAB)", img: clientImg04 },
    { name: "Directorate General of Forces Intelligence", img: clientImg05 },
    { name: "Bangladesh Armed Forces", img: clientImg06 },
    { name: "Border Guard Bangladesh (BGB)", img: clientImg07 },
    { name: "G4S", img: clientImg08 },
    { name: "Biman Bangladesh", img: clientImg09 },
    { name: "Elite Force", img: clientImg10 },
    { name: "Bangladesh National Museum", img: clientImg11 },
    { name: "Rajshahi City Corporation", img: clientImg12 },
    { name: "Samsung", img: clientImg13 },
    { name: "UNDP", img: clientImg14 },
    { name: "International Labour Organization", img: clientImg15 },
    { name: "World Food Program", img: clientImg16 },
    { name: "Bangladesh National Museum", img: clientImg17 },
    { name: "DESCO", img: clientImg18 },
    { name: "Petromax Refinery Ltd.", img: clientImg19 },
    { name: "Partex Group", img: clientImg20 },
    { name: "Bangladesh Railway", img: clientImg21 },
    { name: "JMI Group", img: clientImg22 },
];

const Clients = () => {
    const marqueeTopRef = useRef<HTMLDivElement>(null);
    const marqueeBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Top marquee: Left to Right
        if (marqueeTopRef.current) {
            const width = marqueeTopRef.current.scrollWidth / 2;
            gsap.fromTo(
                marqueeTopRef.current,
                { x: -width },
                {
                    x: 0,
                    duration: 45,
                    ease: "linear",
                    repeat: -1,
                }
            );
        }

        // Bottom marquee: Right to Left
        if (marqueeBottomRef.current) {
            const width = marqueeBottomRef.current.scrollWidth / 2;
            gsap.fromTo(
                marqueeBottomRef.current,
                { x: 0 },
                {
                    x: -width,
                    duration: 45,
                    ease: "linear",
                    repeat: -1,
                }
            );
        }
    }, []);

    return (
        <section className="py-15 md:py-24 bg-gray-50 overflow-hidden">
            <div className="w-fill mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <SectionHeading
                        title="Our Valued Clients"
                        subtitle="Trusted by leading organizations across Bangladesh"
                    />
                </div>

                {/* Top Marquee - Left to Right */}
                <div className="relative overflow-hidden mb-12">
                    <div
                        ref={marqueeTopRef}
                        className="flex space-x-6 sm:space-x-8 md:space-x-12"
                    >
                        {[...clients.slice(0, 11), ...clients.slice(0, 11)].map(
                            (client, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-gray-100 min-w-30 sm:min-w-35 md:min-w-40 shrink-0"
                                >
                                    <Image
                                        src={client.img}
                                        alt={client.name}
                                        className="object-contain"
                                        width={80}
                                        height={80}
                                        priority
                                    />
                                    <span className="font-nunito text-blue-900 font-bold text-center text-xs sm:text-sm mt-2 line-clamp-2 w-full px-1">
                                        {client.name}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Bottom Marquee - Right to Left */}
                <div className="relative overflow-hidden">
                    <div
                        ref={marqueeBottomRef}
                        className="flex space-x-6 sm:space-x-8 md:space-x-12"
                    >
                        {[...clients.slice(11, 22), ...clients.slice(11, 22)].map(
                            (client, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-gray-100 min-w-30 sm:min-w-35 md:min-w-40 shrink-0"
                                >
                                    <Image
                                        src={client.img}
                                        alt={client.name}
                                        className="object-contain"
                                        width={80}
                                        height={80}
                                        priority
                                    />
                                    <span className="font-nunito text-blue-900 font-bold text-center text-xs sm:text-sm mt-2 line-clamp-2 w-full px-1">
                                        {client.name}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;