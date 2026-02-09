import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries";
import { Project } from "@/types/project";
import PageHeader from "@/components/common/PageHeader";
import ProjectsContent from "@/components/pages/Projects/ProjectsContent";
import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore MDM Traders Limited's portfolio of successful telecommunication and radio communication projects across Bangladesh. From government security to defense infrastructure, view our completed installations and network deployments.",
    keywords: [
        "MDM Traders projects",
        "radio communication projects Bangladesh",
        "telecommunication infrastructure",
        "government radio projects",
        "defense communication systems",
        "DMR network deployment",
        "TETRA projects Bangladesh",
        "radio installation portfolio"
    ],
    openGraph: {
        title: "Our Projects | MDM Traders Limited",
        description: "Discover our track record of delivering mission-critical communication infrastructure across Bangladesh's government, defense, and enterprise sectors.",
        images: ["/favicon.png"],
    },
};

async function getProjects(): Promise<Project[]> {
    try {
        const projects = await client.fetch<Project[]>(projectsQuery);
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div>
            <PageHeader
                title="Our Projects"
                backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1920"
            />
            <ProjectsContent allProjects={projects} />
        </div>
    );
}