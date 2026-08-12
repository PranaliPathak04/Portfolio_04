import { cn } from "../lib/utils";
import prapa from "../assets/pinky prapa.jpeg";
import { useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

// Hook: triggers animation when element enters viewport
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

export const Hero = () => {
  const imageRef = useScrollReveal();
  const badgeRef = useScrollReveal();
  const nameRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const descRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <>
      {/* Scroll animation styles injected once */}
      <style>{`
        /* Base state: hidden */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Slide from left */
        .reveal-left {
          opacity: 0;
          transform: translateX(-60px) scale(0.95);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Slide from right */
        .reveal-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Zoom in */
        .reveal-zoom {
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Visible state (all variants) */
        .reveal-visible {
          opacity: 1 !important;
          transform: none !important;
        }

        /* Stagger delays for children */
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.35s; }
        .reveal-delay-4 { transition-delay: 0.5s; }
        .reveal-delay-5 { transition-delay: 0.65s; }

        /* Floating animation for image ring */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-anim {
          animation: float 4s ease-in-out infinite;
        }

        /* Glow pulse on image */
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.7); }
          50% { box-shadow: 0 0 70px rgba(139, 92, 246, 1), 0 0 120px rgba(139, 92, 246, 0.4); }
        }
        .glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24"
      >
        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          {/* ➡️ COLUMN 1: Profile Image */}
          <div
            ref={imageRef}
            className="reveal reveal-left flex justify-center md:justify-start items-center mt-12 md:mt-0 order-first md:order-none"
          >
            <div className="float-anim relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/50 opacity-50 animate-pulse-subtle"></div>

              {/* Inner Image Container */}
              <div className="glow-pulse relative w-full h-full rounded-full overflow-hidden transition-transform duration-300 hover:scale-[1.03]">
                <img
                  src={prapa}
                  alt="Pranali Pathak Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ➡️ COLUMN 2: Text Content */}
          <div className="space-y-6 text-center md:text-right order-last md:order-none">
            {/* Subheading */}
            <p
              ref={badgeRef}
              className="reveal reveal-right reveal-delay-1 text-primary text-sm tracking-[0.2em] uppercase font-medium"
            >
              Hello, I'm
            </p>

            {/* Name */}
            <h1
              ref={nameRef}
              className="reveal reveal-delay-2 font-display text-5xl sm:text-6xl md:text-7xl font-black leading-tight"
            >
              <span className="text-glow">
                <Typewriter
                  words={["Pranali Pathak"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </h1>

            {/* Title */}
            <h2
              ref={titleRef}
              className="reveal reveal-delay-3 text-xl sm:text-2xl text-foreground/80"
            >
              Frontend Developer • UI/UX Enthusiast
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="reveal reveal-delay-4 max-w-xl text-foreground/70 pt-2 mx-auto md:mx-0 md:ml-auto"
            >
              I build responsive, modern, and visually engaging web experiences
              using React, CSS, and animations that feel smooth and alive.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="reveal reveal-delay-5 pt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-end"
            >
              <a href="#projects" className="cosmic-button shadow-lg">
                View Projects
              </a>
              <a
                href="#contact"
                className={cn(
                  "px-8 py-2 rounded-full font-medium border-2",
                  "border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
                  "transition-all duration-300 hover:scale-105 active:scale-95",
                )}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
