"use client";

import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
    name: string;
    email: string;
    message: string;
};

const Contact = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const infoRefs = useRef<HTMLDivElement[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        // Handle form submission here
        alert("Message sent successfully!");
        reset();
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Form animation
            gsap.fromTo(
                formRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Map animation
            gsap.fromTo(
                mapRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: mapRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Info cards animation
            gsap.fromTo(
                infoRefs.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: infoRefs.current[0],
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <SectionHeading
                        title="Contact Us"
                        subtitle="Get in touch with us for any inquiries or support"
                    />
                </div>

                {/* Form and Map Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 items-center font-nunito">
                    {/* Contact Form */}
                    <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-base font-bold text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    {...register("name", { required: "Name is required" })}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                        }`}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-base font-bold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-base font-bold text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Message"
                                    {...register("message", { required: "Message is required" })}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors.message
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                        }`}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                            >
                                <span>Send</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Google Map */}
                    <div ref={mapRef} className="rounded-2xl overflow-hidden shadow-xl h-130">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9043476449744!2d90.39362631498156!3d23.74835198459193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%201216!5e0!3m2!1sen!2sbd!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="MDM Traders Limited Location"
                        />
                    </div>
                </div>

                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Visit Us */}
                    <div
                        ref={(el) => {
                            if (el) infoRefs.current[0] = el;
                        }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                        <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
                            <MapPin className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="font-grotesk text-2xl font-bold text-blue-500 mb-4">Visit us</h3>
                        <p className="font-nunito text-gray-700 leading-relaxed">
                            House 1247, Road 10, Ave 02
                            <br />
                            Mirpur DOHS Dhaka 1216,
                            <br />
                            Bangladesh.
                        </p>
                    </div>

                    {/* Let's Talk */}
                    <div
                        ref={(el) => {
                            if (el) infoRefs.current[1] = el;
                        }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                        <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
                            <Phone className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="font-grotesk text-2xl font-bold text-blue-500 mb-4">Let's talk</h3>
                        <p className="font-nunito text-gray-700 leading-relaxed">
                            Phone: +880 193 244 8883
                            <br />
                            Telephone: 088 02 911 5872
                            <br />
                            Fax: 088 02 883 5337
                        </p>
                    </div>

                    {/* Email Us */}
                    <div
                        ref={(el) => {
                            if (el) infoRefs.current[2] = el;
                        }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                        <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
                            <Mail className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="font-grotesk text-2xl font-bold text-blue-500 mb-4">Email Us</h3>
                        <p className="font-nunito text-gray-700 leading-relaxed">
                            <a href="mailto:delwar@mdmbd.net">delwar@mdmbd.net</a>
                            <br />
                            <a href="mailto:momen@mdmbd.net">momen@mdmbd.net</a>
                            <br />
                            <a href="mailto:khalid@mdmbd.net">khalid@mdmbd.net</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;