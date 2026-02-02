import About from "@/components/pages/Home/About";
import Clients from "@/components/pages/Home/Clients";
import Hero from "@/components/pages/Home/Hero";
import Partners from "@/components/pages/Home/Partners";
import Projects from "@/components/pages/Home/Projects";
import Services from "@/components/pages/Home/Services";


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