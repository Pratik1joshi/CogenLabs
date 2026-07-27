"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { ProductsSticky } from "@/components/products-sticky";
import { SolutionsStack } from "@/components/solutions-stack";
import { CaseStudiesHorizontal } from "@/components/case-studies-horizontal";
import { ProcessStickySplit } from "@/components/process-sticky-split";
import { AiCtoTimeline } from "@/components/ai-cto-timeline";
import { IndustriesIndex } from "@/components/industries-index";
import { SiteIntro } from "@/components/site-intro";

function Nav({ introReady = true, theme = "light" }: { introReady?: boolean; theme?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,opacity,color] duration-700 ${
        scrolled || introReady
          ? theme === "dark"
            ? "border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md text-white"
            : "border-border/80 bg-background/90 backdrop-blur-md text-foreground"
          : "border-transparent bg-transparent"
      } ${introReady ? "opacity-100" : "opacity-0"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" id="nav-brand" className="flex items-center gap-2.5">
          <span
            id="nav-brand-text"
            className={`font-display text-[15px] font-semibold tracking-tight transition-colors duration-700 ${
              theme === "dark" ? "text-white" : "text-foreground"
            }`}
          >
            CoGen Labs
          </span>
        </a>
        <nav
          className={`hidden items-center gap-8 md:flex transition-opacity duration-700 ${
            introReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {["Solutions", "Products", "AI CTO", "Industries", "Insights"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-[13.5px] transition-colors duration-700 ${
                theme === "dark"
                  ? "text-white/60 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <div
          className={`flex items-center gap-2 transition-opacity duration-700 ${
            introReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="#contact"
            className={`hidden text-[13.5px] transition-colors duration-700 md:inline-block ${
              theme === "dark"
                ? "text-white/60 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign in
          </a>
          <a
            href="#contact"
            className={`group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-[transform,background-color,color] duration-700 ${
              theme === "dark"
                ? "bg-white text-black hover:-translate-y-px"
                : "bg-foreground text-background hover:-translate-y-px"
            }`}
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Eyebrow({ children, theme = "light" }: { children: React.ReactNode; theme?: "light" | "dark" }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] ${
      theme === "dark"
        ? "border-white/10 bg-white/5 text-white/70"
        : "border-border bg-card/60 text-muted-foreground"
    }`}>
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
  theme = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
      <h2 className={`font-display mt-5 text-4xl font-semibold tracking-tight sm:text-5xl ${
        theme === "dark" ? "text-white" : "text-foreground"
      }`}>
        {title}
      </h2>
      {sub ? (
        <p className={`mt-4 text-[15.5px] leading-relaxed ${
          theme === "dark" ? "text-white/60" : "text-muted-foreground"
        }`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* Light atmosphere — soft grid + blueprint lines, not a dashboard */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 70% at 70% 40%, black, transparent 75%)",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        aria-hidden
      >
        <line x1="8%" y1="18%" x2="92%" y2="22%" stroke="currentColor" strokeWidth="1" className="text-foreground" />
        <line x1="12%" y1="78%" x2="88%" y2="62%" stroke="currentColor" strokeWidth="1" className="text-foreground" />
        <circle cx="72%" cy="36%" r="120" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
        <circle cx="72%" cy="36%" r="200" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
      </svg>

      <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="max-w-3xl animate-rise">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            AI engineering studio
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-foreground">
            Production AI,
            <br />
            embedded in your company.
          </h1>
          <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted-foreground">
            CoGen Labs designs, ships, and operates the systems behind your AI roadmap — from first
            architecture to durable scale.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[14px] font-medium text-background transition-transform hover:-translate-y-px"
            >
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-5 py-3 text-[14px] font-medium text-foreground transition-colors hover:bg-accent"
            >
              Explore solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const logos = [
    "Northwind",
    "Vantage",
    "Helix Bio",
    "Arclight",
    "Meridian",
    "Portside",
    "Kinetica",
    "Ordell & Co",
  ];
  return (
    <section className="border-b border-border py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center text-[11.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by engineering teams at
        </div>
        <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-ticker gap-16">
            {[...logos, ...logos].map((l, i) => (
              <div
                key={i}
                className="font-display shrink-0 text-2xl font-semibold tracking-tight text-muted-foreground/70"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const posts = [
  {
    date: "Jul 18, 2026",
    read: "8 min",
    tag: "Architecture",
    title: "Designing eval-first LLM systems that survive production.",
    excerpt: "Why we build the eval harness before the first prompt — and how it changes what ships.",
  },
  {
    date: "Jul 04, 2026",
    read: "6 min",
    tag: "Agents",
    title: "Tool-first agents: less prompting, more engineering.",
    excerpt: "A pattern for building agents that behave predictably at scale.",
  },
  {
    date: "Jun 22, 2026",
    read: "10 min",
    tag: "Infrastructure",
    title: "Running open models economically on Kubernetes.",
    excerpt: "Batching, autoscaling and the cost model of self-hosted inference.",
  },
];

function Insights() {
  return (
    <section id="insights" className="border-b border-white/10 bg-transparent py-24 transition-colors duration-1000">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <SectionHead eyebrow="Insights" title="Field notes from the engineering floor." theme="dark" />
          <a
            href="#insights"
            className="hidden shrink-0 items-center gap-1 text-[13.5px] font-medium text-primary sm:inline-flex"
          >
            All articles <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20"
            >
              <div className="flex items-center gap-3 font-mono text-[11px] text-white/50">
                <span>{p.date}</span>
                <span className="h-1 w-1 rounded-full bg-white/10" />
                <span>{p.read}</span>
                <span className="ml-auto rounded-md border border-white/10 bg-white/5 px-2 py-0.5 uppercase tracking-wider text-white/70">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-display mt-5 text-[18px] font-semibold leading-snug tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{p.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-primary">
                Read{" "}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section id="contact" className="border-b border-white/10 bg-transparent py-28 transition-colors duration-1000">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Eyebrow theme="dark">Get in touch</Eyebrow>
        <h2 className="font-display mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Let&apos;s build your <span className="text-primary">AI infrastructure.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15.5px] text-white/60">
          Book a 30-minute strategy call. We&apos;ll audit your workflows and show you exactly what a
          production AI system looks like in your business.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:hello@cogenlabs.com"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-medium text-[#0a0a0a] transition-transform hover:-translate-y-px hover:bg-white/90"
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#solutions"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
          >
            <Terminal className="h-3.5 w-3.5" /> View technical brief
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8 text-left">
          {[
            { l: "Response time", v: "< 24 hours" },
            { l: "Discovery call", v: "30 minutes" },
            { l: "First MVP", v: "6–8 weeks" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-[11px] uppercase tracking-wider text-white/40">{s.l}</div>
              <div className="font-display mt-1 text-lg font-semibold text-white">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const linkClass =
    "text-[14px] leading-relaxed text-white/50 transition-colors hover:text-white";
  const titleClass = "mb-3 block text-[13px] font-semibold tracking-tight text-white";

  return (
    <footer id="footer" className="border-t border-white/10 bg-transparent pt-16 pb-8 md:pt-24 transition-colors duration-1000">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-display max-w-4xl text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
          Engineering AI systems. Shipping production.{" "}
          <a
            href="mailto:hello@cogenlabs.com"
            className="text-primary underline decoration-primary/30 underline-offset-[0.18em] transition-colors hover:decoration-primary"
          >
            Let&apos;s build together!
          </a>
        </p>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <strong className={titleClass}>New projects</strong>
            <div className="space-y-1">
              <a href="mailto:hello@cogenlabs.com" className={`block ${linkClass}`}>
                hello@cogenlabs.com
              </a>
            </div>
          </div>

          <div>
            <strong className={titleClass}>Social</strong>
            <div className="space-y-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${linkClass}`}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${linkClass}`}
              >
                LinkedIn
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${linkClass}`}
              >
                X
              </a>
            </div>
          </div>

          <div>
            <strong className={titleClass}>Explore</strong>
            <div className="space-y-1">
              <a href="#solutions" className={`block ${linkClass}`}>
                Solutions
              </a>
              <a href="#products" className={`block ${linkClass}`}>
                Products
              </a>
              <a href="#ai-cto" className={`block ${linkClass}`}>
                AI CTO
              </a>
              <a href="#insights" className={`block ${linkClass}`}>
                Insights
              </a>
              <a href="#contact" className={`block ${linkClass}`}>
                Contact
              </a>
            </div>
          </div>

          <div>
            <strong className={titleClass}>General</strong>
            <div className="space-y-1">
              <a href="mailto:info@cogenlabs.com" className={`block ${linkClass}`}>
                info@cogenlabs.com
              </a>
            </div>
          </div>

          <div>
            <strong className={titleClass}>Presence</strong>
            <p className="text-[14px] leading-relaxed text-white/50">
              Remote-first
              <br />
              Global
            </p>
          </div>

          <div>
            <strong className={titleClass}>Updates</strong>
            <a href="#contact" className={linkClass}>
              Book a call
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-10 md:mt-20 md:pt-12">
          <p
            className="font-display w-full select-none text-white/15"
            style={{
              fontSize: "clamp(3.5rem, 14vw, 9rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
            }}
            aria-label="CoGen Labs"
          >
            CoGen Labs
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono">© 2026 CoGen Labs</span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#contact" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#contact" className="transition-colors hover:text-white">
                Terms
              </a>
              <a href="#contact" className="transition-colors hover:text-white">
                Security
              </a>
              <a href="#contact" className="transition-colors hover:text-white">
                Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  const [introReady, setIntroReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      const solutionsEl = document.getElementById("solutions");
      const productsEl = document.getElementById("products");
      const caseStudiesEl = document.getElementById("case-studies");

      const threshold = window.innerHeight * 0.5;

      if (caseStudiesEl && caseStudiesEl.getBoundingClientRect().top <= threshold) {
        setTheme("dark");
      } else if (productsEl && productsEl.getBoundingClientRect().top <= threshold) {
        setTheme("light");
      } else if (solutionsEl && solutionsEl.getBoundingClientRect().top <= threshold) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-1000 ease-in-out ${theme === "dark" ? "dark bg-[#0a0a0a] text-white" : "bg-background text-foreground"}`}>
      <SiteIntro onComplete={() => setIntroReady(true)} />
      <Nav introReady={introReady} theme={theme} />
      <main>
        <Hero />
        <TrustedBy />
        <SolutionsStack />
        <AiCtoTimeline />
        <ProductsSticky />
        <IndustriesIndex />
        <ProcessStickySplit />
        <CaseStudiesHorizontal />
        <Insights />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
