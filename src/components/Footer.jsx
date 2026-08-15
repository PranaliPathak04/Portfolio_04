import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { cn } from "../lib/utils";

// Social links data (reused from Contact section)
const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/pranali-pathak-83906634b",
  },
  { icon: Github, label: "GitHub", link: "YOUR_GITHUB_URL" },
  { icon: Mail, label: "Email", link: "mailto:pranalipathak04@gmail.com" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Floating back-to-top button, separate from the footer so it doesn't add
// to its height. Only shows once the person has scrolled down a bit.
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 p-3 rounded-full border-2 border-primary/40",
        "bg-card shadow-lg shadow-black/40 transition-all duration-300",
        "hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]",
        "text-primary hover:text-white",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTopButton />

      <footer className="relative border-t-1 border-white/10 bg-card shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          <h4 className="text-base font-bold text-white order-1">
            Pranali <span className="text-primary">Pathak</span>
          </h4>

          <div className="flex gap-3 order-2">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-primary/40 bg-background/60 shadow-md shadow-black/30 transition-all duration-300 hover:border-primary/80 hover:scale-110 group"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4 text-primary group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-foreground/60 order-3">
            &copy; {currentYear} Pranali Pathak. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
