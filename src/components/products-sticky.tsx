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
  points: string[];
  icon: LucideIcon;
  motif: "grid" | "flow" | "nodes" | "bars" | "scan" | "deploy" | "shield";
};

const products: Product[] = [
  {
    id: "cogen-cto",
    name: "CoGen CTO",
    lead: "Lead the AI roadmap.",
    desc: "AI strategy, architecture and delivery leadership embedded inside your team.",
    points: ["Roadmap ownership", "Architecture reviews", "Delivery leadership"],
    icon: Sparkles,
    motif: "grid",
  },
  {
    id: "cogen-flow",
    name: "CoGen Flow",
    lead: "Drop manual work.",
    desc: "Visual and code-first workflow engine that automates ops with full observability.",
    points: ["Visual + code editor", "Full observability", "Ops automation"],
    icon: Workflow,
    motif: "flow",
  },
  {
    id: "cogen-brain",
    name: "CoGen Brain",
    lead: "Present the insights that matter.",
    desc: "Enterprise retrieval and reasoning over your documents, code, tickets and warehouse.",
    points: ["Docs & code RAG", "Ticket grounding", "Warehouse reasoning"],
    icon: Brain,
    motif: "nodes",
  },
  {
    id: "cogen-agents",
    name: "CoGen Agents",
    lead: "Agents that behave in production.",
    desc: "Tool-using autonomous agents with memory, guardrails and human-in-the-loop.",
    points: ["Tool use", "Persistent memory", "Human-in-the-loop"],
    icon: Boxes,
    motif: "bars",
  },
  {
    id: "cogen-vision",
    name: "CoGen Vision",
    lead: "See what documents hide.",
    desc: "Multimodal vision and document intelligence for high-stakes review workflows.",
    points: ["Document OCR+", "Multimodal review", "Audit trails"],
    icon: Radar,
    motif: "scan",
  },
  {
    id: "cogen-deploy",
    name: "CoGen Deploy",
    lead: "Ship models without glue code.",
    desc: "One-click model and service deployments with canaries, rollbacks and SLOs.",
    points: ["One-click ship", "Canary + rollback", "SLO tracking"],
    icon: Rocket,
    motif: "deploy",
  },
  {
    id: "cogen-guard",
    name: "CoGen Guard",
    lead: "Get accurate, safe calculations.",
    desc: "Policy, PII redaction and prompt firewalls aligned to your compliance edge cases.",
    points: ["PII redaction", "Policy firewalls", "Prompt evals"],
    icon: Shield,
    motif: "shield",
  },
];

function ProductMotif({ motif }: { motif: Product["motif"] }) {
  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-lg border border-[#d9d6d1]/80 bg-[#eef1f6]">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(20,114,253,0.12),transparent_55%)]" />

      {motif === "flow" && (
        <div className="absolute inset-x-[6%] top-[14%] bottom-[14%] flex items-center gap-2">
          {["Ingest", "Transform", "Route", "Notify"].map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 flex-col gap-1.5 rounded-lg border border-[#c8d0dc] bg-white px-3 py-2.5 shadow-[0_8px_20px_-14px_rgba(20,40,80,.35)]">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#1472fd]">
                  Step {i + 1}
                </span>
                <span className="text-[12px] font-semibold text-[#15161a]">{label}</span>
                <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-[#e7ebf2]">
                  <div
                    className="h-full rounded-full bg-[#1472fd] animate-flow"
                    style={{ width: `${55 + i * 12}%` }}
                  />
                </div>
              </div>
              {i < 3 && <div className="hidden h-px w-3 shrink-0 bg-[#1472fd]/50 sm:block" />}
            </div>
          ))}
        </div>
      )}

      {motif === "nodes" && (
        <div className="absolute inset-[10%] grid grid-cols-[1fr_1.2fr] gap-3">
          <div className="flex flex-col gap-2 rounded-lg border border-[#c8d0dc] bg-white p-3 shadow-[0_8px_20px_-14px_rgba(20,40,80,.3)]">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6e6d6a]">Sources</span>
            {["Contracts.pdf", "tickets.csv", "warehouse"].map((s) => (
              <div key={s} className="rounded-md bg-[#eef1f6] px-2 py-1.5 text-[11px] font-medium text-[#242528]">
                {s}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between rounded-lg border border-[#1472fd]/25 bg-white p-3 shadow-[0_8px_20px_-14px_rgba(20,40,80,.3)]">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#1472fd]">Answer</span>
            <p className="text-[12px] leading-snug text-[#242528]">
              3 clauses conflict with policy §4.2. Highest risk: indemnity term on page 11.
            </p>
            <div className="flex gap-1.5">
              {["docs", "code", "tickets"].map((t) => (
                <span key={t} className="rounded bg-[#1472fd]/10 px-1.5 py-0.5 font-mono text-[9px] text-[#1472fd]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {motif === "bars" && (
        <div className="absolute inset-[10%] flex gap-3">
          <div className="flex flex-1 flex-col justify-end gap-1.5 rounded-lg border border-[#c8d0dc] bg-white p-3">
            <span className="mb-auto font-mono text-[9px] uppercase tracking-[0.12em] text-[#6e6d6a]">
              Agent runs
            </span>
            <div className="flex h-[72%] items-end gap-1.5">
              {[42, 70, 55, 88, 48, 76, 62, 94, 58, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-[#1472fd]"
                  style={{ height: `${h}%`, opacity: 0.45 + (i % 4) * 0.12 }}
                />
              ))}
            </div>
          </div>
          <div className="flex w-[38%] flex-col gap-2 rounded-lg border border-[#c8d0dc] bg-white p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6e6d6a]">Live</span>
            {[
              { l: "Tools", v: "12" },
              { l: "Memory", v: "On" },
              { l: "HITL", v: "2" },
            ].map((row) => (
              <div key={row.l} className="flex items-center justify-between text-[11px]">
                <span className="text-[#6e6d6a]">{row.l}</span>
                <span className="font-semibold text-[#15161a]">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "scan" && (
        <div className="absolute inset-[10%] grid grid-cols-[1.1fr_0.9fr] gap-3">
          <div className="relative overflow-hidden rounded-lg border border-[#c8d0dc] bg-white p-3">
            <div className="absolute inset-x-0 top-[42%] h-0.5 bg-[#1472fd]/70 shadow-[0_0_12px_rgba(20,114,253,.6)] animate-flow" />
            <div className="space-y-2">
              <div className="h-2.5 w-2/5 rounded bg-[#d9dee8]" />
              <div className="h-2 w-full rounded bg-[#e7ebf2]" />
              <div className="h-2 w-11/12 rounded bg-[#e7ebf2]" />
              <div className="h-2 w-4/5 rounded bg-[#dde3ee]" />
              <div className="mt-3 h-16 rounded-md border border-dashed border-[#1472fd]/35 bg-[#1472fd]/5" />
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-[#c8d0dc] bg-white p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#1472fd]">Findings</span>
            {["Signature mismatch", "Missing page 4", "Redacted PII ×3"].map((f) => (
              <div key={f} className="rounded-md bg-[#eef1f6] px-2 py-1.5 text-[11px] font-medium text-[#242528]">
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "deploy" && (
        <div className="absolute inset-[10%] flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2">
            {["build", "test", "canary", "prod"].map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 font-mono text-[11px] font-medium ${
                    i === 3
                      ? "border-[#1472fd] bg-[#1472fd] text-white"
                      : i === 2
                        ? "border-[#1472fd]/40 bg-white text-[#1472fd]"
                        : "border-[#c8d0dc] bg-white text-[#55565a]"
                  }`}
                >
                  {i < 2 && <span className="size-1.5 rounded-full bg-[#39c978]" />}
                  {s}
                </div>
                {i < 3 && <ArrowRight className="hidden h-3 w-3 shrink-0 text-[#1472fd]/50 sm:block" />}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#c8d0dc] bg-white px-3 py-2 text-[11px]">
            <span className="text-[#6e6d6a]">Rollback ready · SLO 99.9%</span>
            <span className="font-mono font-medium text-[#1472fd]">v2.4.1</span>
          </div>
        </div>
      )}

      {motif === "shield" && (
        <div className="absolute inset-[10%] grid grid-cols-3 gap-2.5">
          {[
            { l: "PII", d: "Redacted 48 fields", a: true },
            { l: "Policy", d: "3 rules matched", a: true },
            { l: "Eval", d: "Score 0.97", a: false },
          ].map((item) => (
            <div
              key={item.l}
              className={`flex flex-col justify-between rounded-lg border p-3 ${
                item.a
                  ? "border-[#1472fd]/30 bg-white shadow-[0_8px_20px_-14px_rgba(20,40,80,.3)]"
                  : "border-[#c8d0dc] bg-white/80"
              }`}
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1472fd]">
                {item.l}
              </span>
              <p className="mt-4 text-[12px] font-medium leading-snug text-[#242528]">{item.d}</p>
            </div>
          ))}
        </div>
      )}

      {motif === "grid" && (
        <div className="absolute inset-[10%] grid grid-cols-3 gap-2.5">
          {[
            { l: "Roadmap", d: "Q3 priorities" },
            { l: "Arch", d: "System design" },
            { l: "Evals", d: "Quality gates" },
            { l: "Security", d: "Threat model" },
            { l: "Delivery", d: "Ship cadence" },
            { l: "Ops", d: "On-call AI" },
          ].map((item) => (
            <div
              key={item.l}
              className="flex flex-col justify-between rounded-lg border border-[#c8d0dc] bg-white px-3 py-2.5 shadow-[0_6px_16px_-12px_rgba(20,40,80,.28)]"
            >
              <span className="text-[12px] font-semibold text-[#15161a]">{item.l}</span>
              <span className="mt-1.5 text-[10px] text-[#6e6d6a]">{item.d}</span>
            </div>
          ))}
        </div>
      )}
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
    <section id="products" className="relative overflow-clip border-b border-border bg-[#f4f5f8] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.45]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />

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

      <div className="relative mx-auto max-w-7xl space-y-10 px-6 md:space-y-14">
        {/* Intro */}
        <div className="ml-auto flex w-full flex-col xl:max-w-[954px]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-2 rounded-md border border-[#d9d6d1] bg-white/80 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#56575b]">
              CoGen Platform
            </div>
            <h2 className="font-display mt-4 max-w-[744px] text-4xl font-semibold tracking-tight text-[#101113] sm:text-5xl">
              One home for operating and scaling AI systems.{" "}
              <span className="text-[#6e6d6a]">However complex.</span>
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#56575b]">
              Seven production systems — strategy through safety — that plug into how your team already ships.
            </p>
            <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row md:w-auto md:items-start">
              <a
                href="#cogen-cto"
                className="group inline-flex items-center gap-2 rounded-lg bg-[#1472fd] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_12px_22px_-12px_rgba(20,114,253,.65)] transition-transform hover:-translate-y-0.5"
              >
                Explore the platform
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-[#d9d6d1] bg-white/80 px-5 py-3 text-[13px] font-semibold text-[#242528] transition-colors hover:bg-white"
              >
                Book a call
              </a>
            </div>
          </div>
        </div>

        {/* Sticky nav + cards */}
        <div className="relative grid gap-5 md:grid-cols-4">
          <aside className="hidden self-start md:sticky md:top-[15vh] md:flex md:max-h-[70vh] md:flex-col md:gap-4">
            <nav className="relative flex flex-col gap-3 overflow-visible pl-6" aria-label="Product sections">
              <div className="absolute left-0 top-1.5 flex flex-col items-center" aria-hidden>
                <div className="size-1.5 rounded-full bg-[#1472fd]" />
                <div
                  className="relative mt-1 w-px bg-gradient-to-b from-foreground/15 to-transparent"
                  style={{ height: `${Math.max(products.length - 1, 1) * 36}px` }}
                >
                  <div
                    className="absolute left-0 h-14 w-px bg-gradient-to-b from-[#1472fd]/0 via-[#1472fd] to-[#1472fd]/0 transition-transform duration-300 ease-out"
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
                    activeId === p.id ? "font-medium text-[#101113]" : "text-[#6e6d6a] hover:text-[#101113]"
                  }`}
                  aria-current={activeId === p.id ? "true" : undefined}
                >
                  {p.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto hidden h-1 overflow-hidden rounded-full bg-[#d9d6d1] lg:block" aria-hidden>
              <div
                className="h-full rounded-full bg-[#1472fd] transition-[width] duration-150"
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
                  className="group relative mb-3 block scroll-mt-24 rounded-xl border border-[#d9d6d1] bg-white px-4 py-5 last:mb-0 shadow-[0_1px_0_rgba(15,23,42,.03),0_12px_28px_-22px_rgba(15,23,42,.18)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#1472fd] hover:shadow-[0_16px_36px_-22px_rgba(20,114,253,.28)] lg:px-8 lg:py-7"
                  style={{ zIndex: products.length - i }}
                >
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="grid size-9 place-items-center rounded-lg border border-[#d9d6d1] bg-[#f4f5f8] text-[#1472fd]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#101113] md:text-2xl">
                      {p.name}
                    </h3>
                  </div>

                  <div className="relative mt-4">
                    <ProductMotif motif={p.motif} />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 border-t border-[#e7e5e1] pt-4 md:flex-row md:items-end md:justify-between md:gap-4 md:pt-5">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] leading-relaxed text-[#56575b] md:max-w-[528px]">
                        <strong className="font-semibold text-[#101113]">{p.lead}</strong> {p.desc}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.points.map((point) => (
                          <li
                            key={point}
                            className="rounded-md border border-[#e7e5e1] bg-[#f4f5f8] px-2.5 py-1 text-[11.5px] font-medium text-[#3a3b3f]"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="hidden size-10 shrink-0 items-center justify-center rounded-full border border-[#d9d6d1] bg-[#f4f5f8] text-[#101113] transition-colors md:flex group-hover:border-[#1472fd] group-hover:bg-[#1472fd] group-hover:text-white">
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
