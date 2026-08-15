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
import { createPortal } from "react-dom";

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
// Rendered through a portal straight into <body>. position: fixed only tracks
// the real viewport if no ancestor has a transform/filter/perspective set —
// the card below sets an inline transform for its scroll-reveal animation,
// which is enough to trap a non-portaled modal inside the card's box on some
// browsers. Portaling sidesteps that entirely.
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

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
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

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex flex-col sm:items-center sm:justify-center sm:p-8"
      style={{ height: "100dvh" }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />

      {/* Content */}
      <div
        className="relative z-10 w-full h-full sm:h-[92dvh] sm:max-w-6xl flex flex-col p-3 sm:p-0"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
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
                    loading={Math.abs(i - active) <= 1 ? "eager" : "lazy"}
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
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary/80 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary/80 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-3 right-3 text-xs font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {active + 1} / {slides.length}
          </div>
        </div>

        {/* Dots */}
        <div
          className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 shrink-0 overflow-x-auto py-1"
          style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 shrink-0",
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

  return createPortal(modal, document.body);
}

// ---------- Project Card ----------
// Full-bleed screenshot as the card itself. Title + shot count sit on the
// image always; the description and tech tags only surface as an overlay on
// hover (lg+ / any hover-capable pointer). No hover on touch, so a compact
// text fallback renders below the image on small screens instead of being
// permanently hidden.
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
  const isLiveLinkReal = project.liveLink?.startsWith("http");

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          "rounded-xl border-2 border-white/20 flex flex-col overflow-hidden group",
          "bg-card/50 backdrop-blur-sm",
          "shadow-lg shadow-black/20",
          "transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]",
        )}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? undefined // an inline transform here (even translateY(0)) creates a containing block that breaks the portaled modal's fixed positioning
            : "translateY(50px) scale(0.96)",
          transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${cardDelay}s,
                       transform 0.65s cubic-bezier(0.22,1,0.36,1) ${cardDelay}s`,
        }}
      >
        {/* Full-bleed screenshot */}
        <button
          type="button"
          onClick={openGallery}
          aria-label={`View ${project.title} screenshots`}
          className="relative w-full aspect-[3/2] overflow-hidden cursor-pointer"
        >
          <img
            src={project.images[0]}
            alt={`${project.title} cover screenshot`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* base gradient so the title stays legible on bright screenshots */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/0 to-black/20" />

          <h3 className="absolute top-3 left-4 text-lg sm:text-xl font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            {project.title}
          </h3>
          <div className="absolute top-3 right-3 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {project.images.length} shots
          </div>

          {/* Hover-only overlay: description + tags, image dims underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/50"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-xs text-white/60 mt-1">
              <Expand className="h-3.5 w-3.5" />
              Tap to view gallery
            </span>
          </div>
        </button>

        {/* Mobile/tablet fallback — no hover exists, so show it inline instead */}
        <div className="lg:hidden px-4 pt-4">
          <p className="text-sm text-foreground/70">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links bar */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 h-12 sm:h-14 mt-4 lg:mt-0 bg-background text-primary lg:group-hover:bg-black/80 lg:group-hover:text-white/80 transition-colors duration-300">
          {isLiveLinkReal ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity duration-200"
            >
              <Link2 className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-sm font-medium opacity-50 cursor-not-allowed">
              <Link2 className="h-4 w-4" />
              <span>In development</span>
            </span>
          )}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity duration-200"
          >
            <Github className="h-4 w-4" />
            <span>Code</span>
          </a>
          {project.videoUrl && (
            <button
              type="button"
              onClick={openVideo}
              className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity duration-200"
            >
              <Play className="h-4 w-4" />
              <span>Watch Demo</span>
            </button>
          )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
