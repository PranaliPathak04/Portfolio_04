import { Code, Server, Wrench, Palette } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useRef, useState } from "react";

const skillsData = [
  {
    category: "Frontend Development",
    icon: Code,
    skills: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5 & CSS3",
    ],
  },
  {
    category: "Styling & Design",
    icon: Palette,
    skills: [
      "Tailwind CSS",
      "Bootstrap",
      "Sass/Less",
      "Figma (UI/UX)",
      "Responsive Design",
    ],
  },
  {
    category: "Backend & Database",
    icon: Server,
    skills: [
      "Node.js (Basic)",
      "Express (Basic)",
      "MongoDB",
      "REST APIs",
      "Firebase",
    ],
  },
  {
    category: "Tools & Workflow",
    icon: Wrench,
    skills: [
      "Git & GitHub",
      "VS Code",
      "NPM/Yarn",
      "Agile/Scrum",
      "Familiar with Docker",
    ],
  },
];

// Generic scroll reveal hook — adds class when element enters viewport
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Card component — tracks its own visibility via useState so child items can stagger in
function SkillCard({ data, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const cardDelay = index * 0.13;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl p-6 border transition-all duration-500",
        "bg-card/50 backdrop-blur-sm",
        "shadow-[0_0_20px_hsl(var(--primary)/0.1)]",
        "hover:scale-[1.03] hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]",
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(44px) scale(0.95)",
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${cardDelay}s,
                     transform 0.65s cubic-bezier(0.22,1,0.36,1) ${cardDelay}s`,
      }}
    >
      {/* Card Header */}
      <div className="flex items-center space-x-3 mb-4 border-b border-primary/20 pb-3">
        <data.icon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-white">{data.category}</h3>
      </div>

      {/* Skill items stagger in after card appears */}
      <ul className="space-y-3 text-left">
        {data.skills.map((skill, i) => (
          <li
            key={i}
            className="text-foreground/80 text-sm flex items-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-14px)",
              transition: `opacity 0.4s ease ${cardDelay + 0.2 + i * 0.07}s,
                           transform 0.4s ease ${cardDelay + 0.2 + i * 0.07}s`,
            }}
          >
            <span className="h-2 w-2 mt-1 mr-3 bg-primary rounded-full flex-shrink-0 opacity-70" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Skills = () => {
  const headingRef = useScrollReveal();
  const subRef = useScrollReveal();
  const ctaTextRef = useScrollReveal();
  const ctaBtnRef = useScrollReveal();

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-visible {
          opacity: 1 !important;
          transform: none !important;
        }
        .reveal-delay-1 { transition-delay: 0.14s; }
      `}</style>

      <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="container relative z-10">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="reveal text-3xl sm:text-4xl font-bold"
            >
              My <span className="text-primary">Expertise</span>
            </h2>
            <p
              ref={subRef}
              className="reveal reveal-delay-1 mt-4 text-foreground/70 max-w-2xl mx-auto"
            >
              Technologies and tools I use to build modern web solutions.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsData.map((data, index) => (
              <SkillCard key={index} data={data} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p
              ref={ctaTextRef}
              className="reveal text-lg text-foreground/80 mb-6"
            >
              Looking for something specific? Let's discuss your project.
            </p>
            <a
              ref={ctaBtnRef}
              href="#contact"
              className="reveal reveal-delay-1 cosmic-button inline-block"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
