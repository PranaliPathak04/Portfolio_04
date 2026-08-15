import {
  Github,
  Link2,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Expand,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useRef, useState } from "react";

const projectsData = [
  {
    title: "HopOn",
    description:
      "A route-based carpooling platform with geospatial route-matching, distance-proportional fare calculation, atomic seat booking, and driver/vehicle verification.",
    technologies: [
      "Next.js",
      "MongoDB",
      "NextAuth",
      "Tailwind CSS",
      "MapLibre",
    ],
    liveLink: "https://hop-on-ten.vercel.app/",
    githubLink: "https://github.com/PranaliPathak04/HopOn",
    images: [
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644557/1_Landing_Page-1.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644557/2_Landing_Page-2.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644558/3_Dashboard-My_bookings.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644560/4_Dashboard-My_Rides.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644561/5_Publish_Ride_Page.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644559/6_Find_a_Ride_Page.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644560/7_Profile-1.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644560/8_Profile-2.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786644561/9_Sign_up_Page.png",
    ],
    videoUrl:
      "https://res.cloudinary.com/ywn9bf8r/video/upload/v1786645940/Rec_3.mp4",
  },
  {
    title: "CogniHire",
    description:
      "An AI-based resume analyser with a hybrid ATS scorer using a custom spaCy NER model, sentence-transformer similarity, and AI-predicted job role matching.",
    technologies: ["React", "FastAPI", "spaCy", "Groq", "Firebase"],
    liveLink: "In development",
    githubLink: "https://github.com/PranaliPathak04/CogniHire",
    images: [
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643801/1-upload-page.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643802/2-dashboard.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643801/3-skills.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643802/4-rewrites.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643803/5-interview.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643803/6-jobs.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643803/7-job-description_modal.png",
      "https://res.cloudinary.com/ywn9bf8r/image/upload/v1786643803/8-history.png",
    ],
    videoUrl:
      "https://res.cloudinary.com/ywn9bf8r/video/upload/v1786643892/Cognihire_-_Recording.mp4",
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
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ---------- Gallery Modal ----------
function GalleryModal({ project, startIndex, onClose }) {
  const slides = project.videoUrl
    ? [
        ...project.images.map((src) => ({ type: "image", src })),
        { type: "video", src: project.videoUrl },
      ]
    : project.images.map((src) => ({ type: "image", src }));

  const [active, setActive] = useState(startIndex ?? 0);
  const touchStartX = useRef(null);

  const goTo = (index) => {
    setActive(((index % slides.length) + slides.length) % slides.length);
  };
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // Lock body scroll + Esc to close + arrow keys to navigate
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [active]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) prev();
    else if (delta < -40) next();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-6xl h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title + close */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 shrink-0">
          <h3 className="text-lg sm:text-xl font-bold text-white truncate pr-3">
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-primary/80 hover:scale-110 active:scale-95 transition-all duration-300 shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel */}
        <div
          className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-white/10 bg-black select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="w-full h-full flex-shrink-0 flex items-center justify-center bg-black"
              >
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={slide.src}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                )}
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary/80 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary/80 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-3 right-3 text-xs font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {active + 1} / {slides.length}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 shrink-0">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                  : "w-1.5 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Project Card ----------
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(null);
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openGallery = () => setModalStartIndex(0);
  const openVideo = () => setModalStartIndex(project.images.length); // video is the last slide
  const closeGallery = () => setModalStartIndex(null);

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          "rounded-xl border border-primary/20 flex flex-col h-full overflow-hidden group",
          "bg-card/50 backdrop-blur-sm",
          "shadow-lg shadow-black/20",
          "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]",
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
        {/* Static cover image with hover-to-expand */}
        <button
          type="button"
          onClick={openGallery}
          aria-label={`View ${project.title} screenshots`}
          className="relative w-full h-60 overflow-hidden border-b border-primary/10 cursor-pointer"
        >
          <img
            src={project.images[0]}
            alt={`${project.title} cover screenshot`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Expand className="h-4 w-4" />
              View Gallery
            </div>
          </div>
          <div className="absolute top-2 right-2 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {project.images.length} shots
          </div>
        </button>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow">
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

          <p
            className="text-foreground/70 mb-4 flex-grow"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 0.5s ease ${cardDelay + 0.36}s`,
            }}
          >
            {project.description}
          </p>

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

          <div
            className="flex flex-wrap items-center gap-4 pt-4 border-t border-primary/10 mt-auto"
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
            {project.videoUrl && (
              <button
                type="button"
                onClick={openVideo}
                className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-white transition-colors duration-300"
              >
                <Play className="h-4 w-4" />
                <span>Watch Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {modalStartIndex !== null && (
        <GalleryModal
          project={project}
          startIndex={modalStartIndex}
          onClose={closeGallery}
        />
      )}
    </>
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

      <section
        id="projects"
        className="relative py-24 sm:py-32 overflow-hidden"
      >
        <div className="container relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="reveal text-3xl sm:text-4xl font-bold"
            >
              My <span className="text-primary">Work</span>
            </h2>
            <p
              ref={subRef}
              className="reveal reveal-delay-1 mt-4 text-foreground/70 max-w-2xl mx-auto"
            >
              Highlighted projects that showcase my technical skills and design
              focus.
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
            <p
              ref={ctaTextRef}
              className="reveal text-lg text-foreground/80 mb-6"
            >
              Explore more of my contributions on GitHub.
            </p>
            <a
              ref={ctaBtnRef}
              href="https://github.com/PranaliPathak04"
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
