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
    // ➡️ CHANGE 1: Use a solid dark color (bg-card is appropriate for a base dark element)
    <footer className=" relative border-t-4 border-cyan-400 border-primary/10 mt-8 py-6 bg-footer">
      <div className="container relative z-10 text-center pt-6">
        {/* 1. Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={cn(
            // Changed bg-card/90 to bg-card for better solid look
            "absolute -top-4 left-1/2 -translate-x-1/2 p-3 rounded-full border border-primary/50",
            "bg-card transition-all duration-300",
            "hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]",
            "text-primary hover:text-white",
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        {/* 2. Logo/Name */}
        {/* ➡️ CHANGE 2: Added mt-8 to pt-4 for extra space below the arrow */}
        <h4 className="text-xl font-bold text-white mt-6 mb-4">
          Pranali Pathak
        </h4>

        {/* 3. Social Media Links (Restored) */}

        {/* 4. Copyright Information */}
        <p className="text-sm text-foreground/60">
          &copy; {currentYear} Pranali Pathak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
