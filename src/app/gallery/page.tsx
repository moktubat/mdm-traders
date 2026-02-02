'use client';

import PageHeader from "@/components/common/PageHeader";
import Link from "next/link";

const page = () => {
    return (
        <div>
            <PageHeader
                title="Coming Soon"
                backgroundImage="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600"
            />
            <section className="flex items-center justify-center h-[30vh] bg-gray-100">
                <div className="text-center px-4">
                    <Link href="/">
                        <button className="font-nunito px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default page;