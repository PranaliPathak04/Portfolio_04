import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useRef, useState } from "react";

// Set in .env as VITE_WEB3FORMS_ACCESS_KEY=your-key-here
// Get a free key at https://web3forms.com (just enter your email, no account needed)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "pranalip0416@gmail.com",
    link: "mailto:pranalip0416@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 75061 36405",
    link: "tel:+917506136405",
  },
  { icon: MapPin, label: "Location", value: "Mumbai, India", link: "#" },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/pranali-pathak-83906634b",
  },
  { icon: Github, label: "GitHub", link: "https://github.com/PranaliPathak04" },
];

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

export const Contact = () => {
  const headingRef = useScrollReveal();
  const subRef = useScrollReveal();

  // Left column refs
  const leftTitleRef = useScrollReveal();
  const contactCardRefs = [
    useScrollReveal(),
    useScrollReveal(),
    useScrollReveal(),
  ];
  const socialsTitleRef = useScrollReveal();
  const socialsRef = useScrollReveal();

  // Right column (form)
  const formRef = useScrollReveal(0.1);

  // status: "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        "Form isn't connected yet — set VITE_WEB3FORMS_ACCESS_KEY in your .env file.",
      );
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append(
      "subject",
      formData.get("subject") || "New portfolio contact message",
    );
    formData.append("from_name", "Portfolio Contact Form");

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Couldn't reach the server. Check your connection and try again.",
      );
    }
  };

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-44px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(44px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-visible {
          opacity: 1 !important;
          transform: none !important;
        }
        .reveal-delay-1 { transition-delay: 0.12s; }
        .reveal-delay-2 { transition-delay: 0.22s; }
        .reveal-delay-3 { transition-delay: 0.32s; }
        .reveal-delay-4 { transition-delay: 0.42s; }
        .reveal-delay-5 { transition-delay: 0.52s; }

        /* Input focus glow */
        .contact-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background: hsl(var(--background) / 0.5);
          color: white;
          border: 1px solid hsl(var(--primary) / 0.2);
          transition: border-color 0.3s, box-shadow 0.3s;
          placeholder-color: rgba(255,255,255,0.4);
        }
        .contact-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .contact-input::placeholder { color: rgba(255,255,255,0.35); }
        .contact-input:focus {
          outline: none;
          border-color: hsl(var(--primary));
          box-shadow: 0 0 15px hsl(var(--primary) / 0.3);
        }
      `}</style>

      <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
        <div className="container relative z-10 text-center">
          {/* Heading */}
          <div className="mb-16">
            <h2
              ref={headingRef}
              className="reveal text-3xl sm:text-4xl font-bold"
            >
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p
              ref={subRef}
              className="reveal reveal-delay-1 mt-4 text-foreground/70 max-w-2xl mx-auto"
            >
              Thank you for visiting my portfolio! If you're interested in
              collaborating on a project or have any inquiries, please feel free
              to get in touch.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start text-left">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 space-y-8 order-last lg:order-first">
              <h3
                ref={leftTitleRef}
                className="reveal-left text-2xl font-semibold text-white mb-6"
              >
                Contact Details
              </h3>

              {/* Contact info cards — stagger in from left */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    ref={contactCardRefs[index]}
                    className={`reveal-left reveal-delay-${index + 1} flex items-start space-x-4 p-4 rounded-xl border border-white/20 bg-card/95 backdrop-blur-sm shadow-lg shadow-black/30 transition-all duration-300 hover:border-primary/70 group`}
                  >
                    <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1 group-hover:text-cyan-400 transition-colors duration-300" />
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        {item.label}
                      </p>
                      <a
                        href={item.link}
                        className={cn(
                          "text-lg font-semibold text-white",
                          item.link !== "#" && "hover:underline",
                        )}
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="pt-8 border-t border-white/10">
                <h3
                  ref={socialsTitleRef}
                  className="reveal reveal-delay-1 text-xl font-semibold mb-4 text-white"
                >
                  Connect on Socials
                </h3>
                <div
                  ref={socialsRef}
                  className="reveal reveal-delay-2 flex gap-4"
                >
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border border-white/20 bg-card/95 backdrop-blur-sm shadow-md shadow-black/30 transition-all duration-300 hover:border-primary/80 hover:scale-110 group"
                      aria-label={item.label}
                    >
                      <item.icon className="h-5 w-5 text-primary group-hover:text-cyan-400 transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Form slides in from right */}
            <div
              ref={formRef}
              className="reveal-right lg:col-span-2 order-first lg:order-last"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 rounded-xl bg-card/95 backdrop-blur-sm border border-white/20 shadow-xl shadow-black/30 h-full"
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  Send a Message
                </h3>

                {/* Honeypot field — invisible to real users, bots fill it in and get silently rejected by Web3Forms */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    disabled={status === "sending"}
                    className="contact-input"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    disabled={status === "sending"}
                    className="contact-input"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (Optional)"
                  disabled={status === "sending"}
                  className="contact-input"
                />

                <textarea
                  name="message"
                  rows="8"
                  placeholder="Your Message"
                  required
                  disabled={status === "sending"}
                  className="contact-input"
                ></textarea>

                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "cosmic-button shadow-lg px-10 py-3",
                      status === "sending" && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>

                  {status === "success" && (
                    <p className="text-sm font-medium text-emerald-400">
                      Message sent — thanks for reaching out!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm font-medium text-red-400">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
