import { cn } from "../lib/utils";
import { Code, LayoutList, Trophy } from "lucide-react";
import { useEffect, useRef } from "react";

const CV_FILE_PATH = "public/Pranali pathak Resume.pdf";

const skillsContent = [
  {
    icon: Code,
    title: "Web Development",
    desc: "Creating responsive websites and web applications with modern frameworks.",
  },
  {
    icon: LayoutList,
    title: "UI/UX Design",
    desc: "Designing intuitive user interfaces and seamless user experiences.",
  },
  {
    icon: Trophy,
    title: "Project Management",
    desc: "Leading projects from conception to completion with agile methodologies.",
  },
];

function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          if (options.once !== false) observer.unobserve(el);
        } else if (options.once === false) {
          el.classList.remove("reveal-visible");
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -60px 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export const About = () => {
  const headingRef = useScrollReveal();
  const leftColRef = useScrollReveal();
  const dividerRef = useScrollReveal();
  const p1Ref = useScrollReveal();
  const p2Ref = useScrollReveal();
  const ctaRef = useScrollReveal();

  // Individual refs for each skill card
  const cardRefs = [useScrollReveal(), useScrollReveal(), useScrollReveal()];

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-scale {
          opacity: 0;
          transform: scale(0.92) translateY(20px);
          transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-visible {
          opacity: 1 !important;
          transform: none !important;
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.32s; }
        .reveal-delay-4 { transition-delay: 0.44s; }
        .reveal-delay-5 { transition-delay: 0.56s; }

        /* Divider width animation */
        .divider-reveal {
          opacity: 0;
          width: 0;
          transition: opacity 0.5s ease, width 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .divider-reveal.reveal-visible {
          opacity: 1 !important;
          width: 4rem !important;
          transform: none !important;
        }
      `}</style>

      <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="container relative z-10">
          {/* Section Heading */}
          <div ref={headingRef} className="reveal text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="text-primary">About</span> Me
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <h3
                ref={leftColRef}
                className="reveal reveal-left text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #D8B4FE, #9333EA)",
                }}
              >
                Passionate Web Developer & Tech Creator
              </h3>

              {/* Animated divider */}
              <div
                ref={dividerRef}
                className="divider-reveal h-[2px] bg-primary/70 rounded-full"
              ></div>

              <p
                ref={p1Ref}
                className="reveal reveal-delay-1 text-foreground/70 leading-relaxed"
              >
                With over 5 years of experience in web development, I specialize
                in creating responsive, accessible, and performant web
                applications using modern technologies.
              </p>
              <p
                ref={p2Ref}
                className="reveal reveal-delay-2 text-foreground/70 leading-relaxed"
              >
                I'm passionate about creating elegant solutions to complex
                problems, and I'm constantly learning new technologies and
                techniques to stay at the forefront of the ever-evolving web
                landscape.
              </p>

              {/* CTA Buttons */}
              <div
                ref={ctaRef}
                className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a
                  href="#contact"
                  className="
                    px-8 py-3 rounded-full font-medium text-primary-foreground
                    bg-primary border border-primary
                    transition-all duration-300
                    hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary))]
                    active:scale-95
                  "
                >
                  Get In Touch
                </a>

                <a
                  href={CV_FILE_PATH}
                  download="Pranali_Pathak_CV"
                  className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-primary/10 hover:scale-110"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #7C3AED",
                    color: "#D8B4FE",
                    boxShadow: "0 0 10px rgba(124, 58, 237, 0.2)",
                  }}
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: Skill Cards */}
            <div className="flex flex-col space-y-6">
              {skillsContent.map((item, index) => (
                <div
                  key={index}
                  ref={cardRefs[index]}
                  className={cn(
                    `reveal reveal-right reveal-delay-${index + 2}`,
                    "rounded-xl p-6 border transition-all duration-300 cursor-pointer group",
                    "bg-card/50 backdrop-blur-md border-transparent hover:border-primary/50",
                    "shadow-md shadow-black/20",
                    "hover:scale-[1.03] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20",
                  )}
                >
                  <div className="flex items-center space-x-4 mb-2">
                    <item.icon className="h-6 w-6 text-primary group-hover:text-cyan-400 transition-colors duration-300" />
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
