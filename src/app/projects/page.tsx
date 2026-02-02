'use client';

import projectsHeader from "@/assets/projectsHeader.webp";
import PageHeader from "@/components/common/PageHeader";
import Projects from "@/components/pages/Projects/Projects";

const page = () => {
    return (
        <div>
            <PageHeader
                title="Our Projects and Solutions."
                backgroundImage={projectsHeader.src}
            />
            <Projects />
        </div>
    );
};

export default page;