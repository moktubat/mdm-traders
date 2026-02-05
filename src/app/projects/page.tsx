import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries";
import { Project } from "@/types/project";
import PageHeader from "@/components/common/PageHeader";
import ProjectsContent from "@/components/pages/Projects/ProjectsContent";

export const revalidate = 60; // Revalidate every 60 seconds

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