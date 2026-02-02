'use client';

import contactHeader from "@/assets/contactHeader.webp";
import PageHeader from "@/components/common/PageHeader";
import Contact from "@/components/pages/Contact/Contact";

const page = () => {
    return (
        <div>
            <PageHeader
                title="How can we help?"
                backgroundImage={contactHeader.src}
            />
            <Contact />
        </div>
    );
};

export default page;