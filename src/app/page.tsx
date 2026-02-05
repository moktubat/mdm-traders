import About from "@/components/pages/Home/About";
import Clients from "@/components/pages/Home/Clients";
import Hero from "@/components/pages/Home/Hero";
import Partners from "@/components/pages/Home/Partners";
import Projects from "@/components/pages/Home/Projects";
import Services from "@/components/pages/Home/Services";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { Project } from "@/types/project";

export const revalidate = 60; // Revalidate every 60 seconds

// Query to get last 6 projects
const homeProjectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc, contractDate desc) [0...6] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    category,
    contractDate,
    location,
    client,
    image,
    sortOrder
  }
`;

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch<Project[]>(homeProjectsQuery);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Projects projects={projects} />
      <Partners />
      <Clients />
    </div>
  );
}