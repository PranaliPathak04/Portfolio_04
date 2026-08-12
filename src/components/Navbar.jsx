import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-40">
      {/* Blur/bg wrapper — separate from nav itself */}
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/70 backdrop-blur-lg border-b border-border/50 shadow-lg"
            : "py-5 bg-transparent",
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            href="#hero"
            className="font-display text-xl font-bold flex items-center group"
          >
            <span className="relative z-10">
              <span className="text-glow text-foreground">Pranali</span>{" "}
              <span className="text-primary">Pathak</span>
            </span>
          </a>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="relative text-foreground/80 hover:text-primary transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50"
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-foreground transition-all duration-300",
                isOpen && "rotate-45 translate-y-2",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-foreground transition-opacity duration-300",
                isOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-foreground transition-all duration-300",
                isOpen && "-rotate-45 -translate-y-2",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — now a direct child of unfiltered <nav>, always covers full viewport */}
      <div
        className={cn(
          "fixed inset-0  bg-background flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl text-foreground/80 hover:text-primary transition-colors"
          >
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
