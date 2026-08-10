
// import { Github, Link2 } from "lucide-react";
// import { cn } from "../lib/utils"; 

// // 1. Define your Project Data
// // ⚠️ IMPORTANT: Update the 'imageUrl' path for each project!
// const projectsData = [
//   {
//     title: "Project Nova",
//     description:
//       "A full-stack e-commerce platform built with Next.js and MongoDB. Features secure payment gateway integration and a detailed admin dashboard.",
//     technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
//     liveLink: "https://demo.projectnova.com",
//     githubLink: "https://github.com/pranali/project-nova",
//     imageUrl: "/assets/project-nova-screenshot.jpg", // ⬅️ NEW: Image Path
//     delay: 0.2,
//   },
//   {
//     title: "Portfolio v2.0",
//     description:
//       "The current portfolio site, designed for speed and responsiveness with a unique cyberpunk aesthetic. Implements custom animations and utility classes.",
//     technologies: ["React", "Tailwind CSS", "Vite", "Custom Hooks"],
//     liveLink: "#hero", 
//     githubLink: "https://github.com/pranali/portfolio-v2",
//     imageUrl: "/assets/portfolio-screenshot.jpg", // ⬅️ NEW: Image Path
//     delay: 0.4,
//   },
//   {
//     title: "TaskFlow Manager",
//     description:
//       "A simple, intuitive task management application. Uses Firebase for real-time data synchronization and user authentication.",
//     technologies: ["React", "Firebase", "Zustand", "Sass"],
//     liveLink: "https://demo.taskflow.app",
//     githubLink: "https://github.com/pranali/taskflow-manager",
//     imageUrl: "/assets/taskflow-manager-screenshot.jpg", // ⬅️ NEW: Image Path
//     delay: 0.6,
//   },
// ];

// export const Projects = () => {
//   return (
//     <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
//       <div className="container relative z-10">
        
//         {/* Section Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">
//             My <span className="text-primary">Work</span>
//           </h2>
//           <p className="mt-4 text-foreground/70 max-w-2xl mx-auto animate-fade-in-delay-1">
//             Highlighted projects that showcase my technical skills and design focus.
//           </p>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projectsData.map((project, index) => (
//             <div
//               key={index}
//               className={cn(
//                 "rounded-xl border border-primary/20 transition-all duration-500 flex flex-col h-full overflow-hidden", // Added overflow-hidden for rounded image corners
//                 "bg-card/50 backdrop-blur-sm", 
//                 "shadow-lg shadow-purple-900/10", 
//                 "hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]", 
//                 `animate-fade-in-delay-${index + 2}`
//               )}
//               style={{ animationDelay: `${project.delay}s` }}
//             >
              
//               {/* 🖼️ PROJECT IMAGE SECTION (NEW) */}
//               <div className="relative w-full h-60 overflow-hidden border-b border-primary/10">
//                 <img 
//                   src={project.imageUrl} 
//                   alt={`Screenshot of ${project.title}`}
//                   // Ensure the image covers the container without distortion
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
//                 />
//                 {/* Subtle Image Overlay/Gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//               </div>
              
//               {/* CARD CONTENT (Padded) */}
//               <div className="p-6 flex flex-col flex-grow">
//                 {/* Project Title */}
//                 <h3 className="text-2xl font-bold mb-3 text-white">
//                   {project.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-foreground/70 mb-4 flex-grow">
//                   {project.description}
//                 </p>

//                 {/* Technologies Used (Tags) */}
//                 <div className="flex flex-wrap gap-2 mb-6 mt-2">
//                   {project.technologies.map((tech, techIndex) => (
//                     <span
//                       key={techIndex}
//                       className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/50"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Links */}
//                 <div className="flex gap-4 pt-4 border-t border-primary/10 mt-auto"> {/* mt-auto pushes links to the bottom */}
                  
//                   {/* Live Demo Link */}
//                   <a
//                     href={project.liveLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center space-x-2 text-sm text-primary hover:text-cyan-400 transition-colors duration-300"
//                   >
//                     <Link2 className="h-4 w-4" />
//                     <span>Live Demo</span>
//                   </a>
                  
//                   {/* GitHub Link */}
//                   <a
//                     href={project.githubLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-white transition-colors duration-300"
//                   >
//                     <Github className="h-4 w-4" />
//                     <span>Code</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Optional: Final CTA */}
//         <div className="mt-16 text-center animate-fade-in-delay-4">
//           <p className="text-lg text-foreground/80 mb-6">
//             Explore more of my contributions on GitHub.
//           </p>
//           <a 
//             href="YOUR_GITHUB_PROFILE_URL" 
//             target="_blank"
//             rel="noopener noreferrer"
//             className="cosmic-button"
//           >
//             Visit My GitHub
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// };

import { Github, Link2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useRef, useState } from "react";

const projectsData = [
  {
    title: "Project Nova",
    description:
      "A full-stack e-commerce platform built with Next.js and MongoDB. Features secure payment gateway integration and a detailed admin dashboard.",
    technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    liveLink: "https://demo.projectnova.com",
    githubLink: "https://github.com/pranali/project-nova",
    imageUrl: "/assets/project-nova-screenshot.jpg",
  },
  {
    title: "Portfolio v2.0",
    description:
      "The current portfolio site, designed for speed and responsiveness with a unique cyberpunk aesthetic. Implements custom animations and utility classes.",
    technologies: ["React", "Tailwind CSS", "Vite", "Custom Hooks"],
    liveLink: "#hero",
    githubLink: "https://github.com/pranali/portfolio-v2",
    imageUrl: "/assets/portfolio-screenshot.jpg",
  },
  {
    title: "TaskFlow Manager",
    description:
      "A simple, intuitive task management application. Uses Firebase for real-time data synchronization and user authentication.",
    technologies: ["React", "Firebase", "Zustand", "Sass"],
    liveLink: "https://demo.taskflow.app",
    githubLink: "https://github.com/pranali/taskflow-manager",
    imageUrl: "/assets/taskflow-manager-screenshot.jpg",
  },
];

// Generic scroll reveal hook — class-based
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
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Project card with its own visibility state for inner staggering
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const cardDelay = index * 0.15;

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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl border border-primary/20 transition-all duration-500 flex flex-col h-full overflow-hidden group",
        "bg-card/50 backdrop-blur-sm",
        "shadow-lg shadow-purple-900/10",
        "hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]"
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(50px) scale(0.96)",
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${cardDelay}s,
                     transform 0.65s cubic-bezier(0.22,1,0.36,1) ${cardDelay}s`,
      }}
    >
      {/* Image — slides down into view */}
      <div className="relative w-full h-60 overflow-hidden border-b border-primary/10">
        <img
          src={project.imageUrl}
          alt={`Screenshot of ${project.title}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-16px)",
            transition: `opacity 0.7s ease ${cardDelay + 0.2}s,
                         transform 0.7s ease ${cardDelay + 0.2}s`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">

        {/* Title */}
        <h3
          className="text-2xl font-bold mb-3 text-white"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-20px)",
            transition: `opacity 0.5s ease ${cardDelay + 0.28}s,
                         transform 0.5s ease ${cardDelay + 0.28}s`,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-foreground/70 mb-4 flex-grow"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.5s ease ${cardDelay + 0.36}s`,
          }}
        >
          {project.description}
        </p>

        {/* Tech Tags — stagger each tag */}
        <div className="flex flex-wrap gap-2 mb-6 mt-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/50"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.35s ease ${cardDelay + 0.4 + i * 0.06}s,
                             transform 0.35s ease ${cardDelay + 0.4 + i * 0.06}s`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex gap-4 pt-4 border-t border-primary/10 mt-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.4s ease ${cardDelay + 0.55}s,
                         transform 0.4s ease ${cardDelay + 0.55}s`,
          }}
        >
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-primary hover:text-cyan-400 transition-colors duration-300"
          >
            <Link2 className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-white transition-colors duration-300"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export const Projects = () => {
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

      <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="container relative z-10">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 ref={headingRef} className="reveal text-3xl sm:text-4xl font-bold">
              My <span className="text-primary">Work</span>
            </h2>
            <p ref={subRef} className="reveal reveal-delay-1 mt-4 text-foreground/70 max-w-2xl mx-auto">
              Highlighted projects that showcase my technical skills and design focus.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p ref={ctaTextRef} className="reveal text-lg text-foreground/80 mb-6">
              Explore more of my contributions on GitHub.
            </p>
            <a
              ref={ctaBtnRef}
              href="YOUR_GITHUB_PROFILE_URL"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal reveal-delay-1 cosmic-button inline-block"
            >
              Visit My GitHub
            </a>
          </div>

        </div>
      </section>
    </>
  );
};
