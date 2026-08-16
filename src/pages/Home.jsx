import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme toggle*/}

      {/* Bg Effects*/}
      <StarBackground />

      {/* Navbar*/}
      <Navbar />

      {/* Main Contnet*/}
      <Reveal>
        <Hero />
      </Reveal>

      <Reveal>
        <About />
      </Reveal>

      <Reveal>
        <Skills />
      </Reveal>

      <Reveal>
        <Projects />
      </Reveal>

      <Reveal>
        <Contact />
      </Reveal>

      <Footer />

      {/* Footer*/}
    </div>
  );
};
