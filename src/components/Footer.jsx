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

// Function to handle scrolling back to the top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const Footer = () => {
  // Determine the current year dynamically for the copyright
  const currentYear = new Date().getFullYear();

  return (
    // Solid, opaque background (no /opacity on bg-card) + a visibly bright
    // top border instead of border-primary/10, which was nearly invisible
    // against the starfield.
    <footer className="relative border-t border-primary/40 mt-8 py-6 bg-card shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
      <div className="container relative z-10 text-center pt-6">
        {/* 1. Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={cn(
            "absolute -top-4 left-1/2 -translate-x-1/2 p-3 rounded-full border-2 border-primary/70",
            "bg-card shadow-lg shadow-black/40 transition-all duration-300",
            "hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]",
            "text-primary hover:text-white",
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        {/* 2. Logo/Name */}
        <h4 className="text-xl font-bold text-white mt-6 mb-4">
          Pranali Pathak
        </h4>

        {/* 3. Social Media Links */}
        <div className="flex justify-center gap-4 mb-6">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-primary/40 bg-background/60 shadow-md shadow-black/30 transition-all duration-300 hover:border-primary/80 hover:scale-110 group"
              aria-label={item.label}
            >
              <item.icon className="h-4 w-4 text-primary group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
          ))}
        </div>

        {/* 4. Copyright Information */}
        <p className="text-sm text-foreground/60">
          &copy; {currentYear} Pranali Pathak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
