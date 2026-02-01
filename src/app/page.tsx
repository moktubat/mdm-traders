import About from "@/components/pages/About";
import Clients from "@/components/pages/Clients";
import Hero from "@/components/pages/Hero";
import Partners from "@/components/pages/Partners";
import Projects from "@/components/pages/Projects";
import Services from "@/components/pages/Services";


export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Partners />
      <Clients />
    </div>
  );
}