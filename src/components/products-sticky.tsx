"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Brain,
  Radar,
  Rocket,
  Shield,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  lead: string;
  desc: string;
  icon: LucideIcon;
  motif: "grid" | "flow" | "nodes" | "bars" | "scan" | "deploy" | "shield";
};

const products: Product[] = [
  {
    id: "cogen-cto",
    name: "CoGen CTO",
    lead: "Lead the AI roadmap.",
    desc: "AI strategy, architecture and delivery leadership embedded inside your team.",
    icon: Sparkles,
    motif: "grid",
  },
  {
    id: "cogen-flow",
    name: "CoGen Flow",
    lead: "Drop manual work.",
    desc: "Visual and code-first workflow engine that automates ops with full observability.",
    icon: Workflow,
    motif: "flow",
  },
  {
    id: "cogen-brain",
    name: "CoGen Brain",
    lead: "Present the insights that matter.",
    desc: "Enterprise retrieval and reasoning over your documents, code, tickets and warehouse.",
    icon: Brain,
    motif: "nodes",
  },
  {
    id: "cogen-agents",
    name: "CoGen Agents",
    lead: "Agents that behave in production.",
    desc: "Tool-using autonomous agents with memory, guardrails and human-in-the-loop.",
    icon: Boxes,
    motif: "bars",
  },
  {
    id: "cogen-vision",
    name: "CoGen Vision",
    lead: "See what documents hide.",
    desc: "Multimodal vision and document intelligence for high-stakes review workflows.",
    icon: Radar,
    motif: "scan",
  },
  {
    id: "cogen-deploy",
    name: "CoGen Deploy",
    lead: "Ship models without glue code.",
    desc: "One-click model and service deployments with canaries, rollbacks and SLOs.",
    icon: Rocket,
    motif: "deploy",
  },
  {
    id: "cogen-guard",
    name: "CoGen Guard",
    lead: "Get accurate, safe calculations.",
    desc: "Policy, PII redaction and prompt firewalls aligned to your compliance edge cases.",
    icon: Shield,
    motif: "shield",
  },
];

function ProductMotif({ motif, Icon }: { motif: Product["motif"]; Icon: LucideIcon }) {
  return (
    <div className="relative flex aspect-[858/340] w-full items-end overflow-hidden rounded-lg bg-background/80">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

      {motif === "flow" && (
        <svg className="absolute inset-x-[8%] top-[18%] h-[55%] w-[84%]" viewBox="0 0 400 120" fill="none">
          <path
            d="M20 60 H120 Q160 60 160 30 H240 Q280 30 280 60 H380"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="6 8"
            className="animate-flow"
          />
          {[40, 160, 280, 360].map((x) => (
            <rect
              key={x}
              x={x - 28}
              y={42}
              width={56}
              height={36}
              rx={8}
              className="fill-card stroke-border"
              strokeWidth="1"
            />
          ))}
        </svg>
      )}

      {motif === "nodes" && (
        <svg className="absolute inset-x-[10%] top-[20%] h-[50%] w-[80%]" viewBox="0 0 400 120" fill="none">
          {[
            [60, 60],
            [160, 30],
            [160, 90],
            [260, 60],
            [340, 60],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="10" className="fill-card stroke-primary" strokeWidth="1.5" />
          ))}
          <path
            d="M70 60 L150 30 M70 60 L150 90 M170 30 L250 60 M170 90 L250 60 M270 60 L330 60"
            stroke="var(--color-primary)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {motif === "bars" && (
        <div className="absolute inset-x-[12%] bottom-[18%] flex h-[55%] items-end gap-2">
          {[40, 68, 52, 88, 46, 74, 60, 92, 55, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-primary/50"
              style={{ height: `${h}%`, opacity: 0.35 + (i % 5) * 0.1 }}
            />
          ))}
        </div>
      )}

      {motif === "scan" && (
        <div className="absolute inset-[16%] rounded-xl border border-border bg-card/70 p-4">
          <div className="h-2 w-1/3 rounded bg-muted" />
          <div className="mt-3 space-y-2">
            <div className="h-2 w-full rounded bg-muted/80" />
            <div className="h-2 w-5/6 rounded bg-muted/70" />
            <div className="h-2 w-4/6 rounded bg-muted/60" />
          </div>
        </div>
      )}

      {motif === "deploy" && (
        <div className="absolute inset-x-[12%] bottom-[22%] flex w-[76%] items-center gap-2">
          {["build", "test", "canary", "prod"].map((s, i) => (
            <div
              key={s}
              className="flex flex-1 items-center justify-center rounded-md border border-border px-2 py-2 font-mono text-[10px] bg-card text-muted-foreground"
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {motif === "shield" && (
        <div className="absolute inset-x-[18%] top-[22%] flex h-[50%] items-center justify-center gap-3">
          {["PII", "Policy", "Eval"].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-card px-3 py-2 font-mono text-[11px] text-muted-foreground shadow-soft"
            >
              {label}
            </div>
          ))}
        </div>
      )}

      {motif === "grid" && (
        <div className="absolute inset-x-[14%] top-[20%] grid grid-cols-3 gap-3">
          {["Roadmap", "Arch", "Evals", "Security", "Delivery", "Ops"].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-card px-3 py-3 text-center text-[11px] font-medium text-muted-foreground shadow-soft"
            >
              {label}
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-xl border border-border bg-card text-primary shadow-card">
        <Icon className="h-5 w-5" />
      </div>
      <div className="absolute bottom-0 h-28 w-full bg-gradient-to-t from-card" />
    </div>
  );
}

export function ProductsSticky() {
  const [activeId, setActiveId] = useState(products[0].id);
  const [progress, setProgress] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = products
      .map((p) => document.getElementById(p.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!nodes.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = products[0].id;
        let bestRatio = -1;
        for (const p of products) {
          const ratio = ratios.get(p.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = p.id;
          }
        }

        if (bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7],
      },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const container = cardsRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const total = Math.max(container.offsetHeight - window.innerHeight * 0.45, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeIndex = Math.max(
    0,
    products.findIndex((p) => p.id === activeId),
  );
  // ~36px per link (text-sm + gap-3)
  const indicatorTop = activeIndex * 36;

  return (
    <section id="products" className="relative overflow-clip border-b border-border py-24">
      {/* Decorative path — desktop only */}
      <div className="pointer-events-none absolute left-0 top-0 hidden lg:mx-auto lg:block lg:w-full lg:max-w-[1440px]">
        <svg className="absolute left-0 top-0 max-w-[284px]" viewBox="0 0 284 513" fill="none" aria-hidden>
          <path
            d="M61 -66C183.607 -66 283 20.409 283 127C283 233.591 183.607 320 61 320"
            stroke="currentColor"
            className="text-foreground/10"
          />
          <path
            d="M61 -66C183.607 -66 283 20.409 283 127C283 233.591 183.607 320 61 320"
            stroke="url(#cogenProductStroke)"
          />
          <path
            d="M61 320C-61.0549 320 -160 406.409 -160 513"
            stroke="currentColor"
            className="text-foreground/10"
          />
          <line
            x1="61.5"
            y1="-66"
            x2="61.5"
            y2="513"
            stroke="currentColor"
            className="text-foreground/10"
          />
          <defs>
            <linearGradient id="cogenProductStroke" x1="240.5" y1="234.5" x2="161" y2="298.5">
              <stop stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="0.52" stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl space-y-16 px-6 md:space-y-24">
        {/* Intro */}
        <div className="ml-auto flex w-full flex-col xl:max-w-[954px]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              CoGen Platform
            </div>
            <h2 className="font-display mt-5 max-w-[744px] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              One home for operating and scaling AI systems.{" "}
              <span className="text-muted-foreground">However complex.</span>
            </h2>
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row md:mt-10 md:w-auto md:items-start">
              <a
                href="#cogen-cto"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground/5 px-[18px] py-[9px] text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/15"
              >
                Explore the platform
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-[18px] py-[9px] text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>

        {/* Sticky nav + cards */}
        <div className="relative grid gap-6 md:grid-cols-4">
          <aside className="hidden self-start md:sticky md:top-[15vh] md:flex md:max-h-[70vh] md:flex-col md:gap-4">
            <nav className="relative flex flex-col gap-3 overflow-visible pl-6" aria-label="Product sections">
              <div className="absolute left-0 top-1.5 flex flex-col items-center" aria-hidden>
                <div className="size-1.5 rounded-full bg-primary" />
                <div
                  className="relative mt-1 w-px bg-gradient-to-b from-foreground/15 to-transparent"
                  style={{ height: `${Math.max(products.length - 1, 1) * 36}px` }}
                >
                  <div
                    className="absolute left-0 h-14 w-px bg-gradient-to-b from-primary/0 via-primary to-primary/0 transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateY(${indicatorTop}px)`,
                    }}
                  />
                </div>
              </div>

              {products.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  onClick={() => setActiveId(p.id)}
                  className={`block w-full text-sm transition-colors ${
                    activeId === p.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={activeId === p.id ? "true" : undefined}
                >
                  {p.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto hidden h-1 overflow-hidden rounded-full bg-border lg:block" aria-hidden>
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </aside>

          <div ref={cardsRef} className="w-full md:col-span-3">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <a
                  key={p.id}
                  id={p.id}
                  href="#contact"
                  className="group relative mb-5 block scroll-mt-24 rounded-xl border border-border bg-card px-4 py-6 last:mb-0 transition-colors hover:border-primary lg:p-12"
                  style={{ zIndex: products.length - i }}
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="grid size-[35px] place-items-center rounded-lg border border-border bg-background text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {p.name}
                    </h3>
                  </div>

                  <div className="relative mt-6">
                    <ProductMotif motif={p.motif} Icon={Icon} />
                  </div>

                  <div className="mt-4 flex justify-between gap-3 border-t border-border/60 pt-4 md:items-center md:pt-8">
                    <div className="w-full text-[14px] leading-relaxed text-muted-foreground md:max-w-[528px]">
                      <p>
                        <strong className="font-semibold text-foreground">{p.lead}</strong> {p.desc}
                      </p>
                    </div>
                    <div className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-border bg-foreground/5 text-foreground transition-colors md:flex group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
