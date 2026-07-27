"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type CaseStudy = {
  id: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  tags: string[];
  kpis: { k: string; v: string }[];
  motif: "finance" | "health" | "logistics";
};

const cases: CaseStudy[] = [
  {
    id: "meridian",
    client: "Meridian Bank",
    sector: "Finance",
    title: "Autonomous ops for compliance review.",
    summary: "Agents triage and resolve compliance cases with human oversight on edge decisions.",
    tags: ["Finance", "Agents"],
    kpis: [
      { k: "84%", v: "cases auto-resolved" },
      { k: "6.2×", v: "faster review time" },
      { k: "$4.1M", v: "annual saving" },
    ],
    motif: "finance",
  },
  {
    id: "helix",
    client: "Helix Bio",
    sector: "Healthcare",
    title: "RAG copilot on 2M clinical documents.",
    summary: "Retrieval grounded in clinical corpora with eval harnesses and HIPAA-aligned deploy.",
    tags: ["Healthcare", "RAG"],
    kpis: [
      { k: "38s", v: "avg answer time" },
      { k: "97.4%", v: "eval accuracy" },
      { k: "HIPAA", v: "compliant deploy" },
    ],
    motif: "health",
  },
  {
    id: "arclight",
    client: "Arclight Logistics",
    sector: "Manufacturing",
    title: "Agent-driven dispatch and routing.",
    summary: "Dispatch agents optimize routes in real time across a national logistics network.",
    tags: ["Manufacturing", "Ops"],
    kpis: [
      { k: "-22%", v: "delivery cost" },
      { k: "3.1×", v: "throughput" },
      { k: "24/7", v: "autonomous ops" },
    ],
    motif: "logistics",
  },
];

function CaseMotif({ motif }: { motif: CaseStudy["motif"] }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-neutral-900">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {motif === "finance" && (
        <div className="absolute inset-x-[10%] bottom-[14%] top-[18%] flex flex-col justify-end gap-2">
          <div className="flex h-[55%] items-end gap-1.5">
            {[35, 52, 44, 70, 58, 82, 48, 66, 74, 90, 60, 78].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-white/25"
                style={{ height: `${h}%`, opacity: 0.35 + (i % 4) * 0.12 }}
              />
            ))}
          </div>
        </div>
      )}

      {motif === "health" && (
        <div className="absolute inset-[14%] flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="h-2 w-1/3 rounded bg-white/20" />
          <div className="mt-2 space-y-2">
            <div className="h-2 w-full rounded bg-white/15" />
            <div className="h-2 w-5/6 rounded bg-white/12" />
            <div className="h-2 w-4/6 rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/12" />
          </div>
        </div>
      )}

      {motif === "logistics" && (
        <svg className="absolute inset-[12%] h-[76%] w-[76%]" viewBox="0 0 280 200" fill="none" aria-hidden>
          <path
            d="M20 160 C60 80, 100 80, 140 120 C180 160, 220 40, 260 70"
            stroke="rgb(255 255 255 / 0.35)"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          {[
            [40, 130],
            [100, 95],
            [160, 130],
            [230, 65],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" fill="rgb(255 255 255 / 0.12)" stroke="rgb(255 255 255 / 0.4)" />
          ))}
        </svg>
      )}
    </div>
  );
}

function CasePanel({ study }: { study: CaseStudy }) {
  return (
    <a
      href="#contact"
      className="group flex w-full shrink-0 flex-col justify-center px-6 md:h-full md:w-[38vw] md:px-8"
    >
      <CaseMotif motif={study.motif} />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{study.client}</p>
          <h3 className="font-display mt-1 text-[clamp(24px,2.8vw,36px)] leading-tight tracking-tight text-white">
            {study.title}
          </h3>
          <p className="mt-1.5 max-w-[380px] text-[14px] leading-relaxed text-white/60">{study.summary}</p>
        </div>
        <div className="mt-1 hidden size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-black md:flex">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {study.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] tracking-wide text-white/60"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
        {study.kpis.map((k) => (
          <div key={k.v} className="bg-[#0a0a0a] px-3 py-2.5">
            <div className="font-display text-[16px] font-semibold tabular-nums text-white">{k.k}</div>
            <div className="mt-0.5 text-[10px] leading-tight text-white/45">{k.v}</div>
          </div>
        ))}
      </div>
    </a>
  );
}

function IntroPanel() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center px-6 md:h-full md:w-[40vw] md:pr-12 md:pl-[max(2.5rem,calc((100vw-1354px)/2+2.5rem))]">
      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/50">
        Outcomes
      </p>
      <h2 className="font-display text-[clamp(40px,8vw,72px)] leading-[0.9] tracking-[-0.03em] text-white">
        Case studies
      </h2>
      <p className="mt-4 max-w-[420px] text-[clamp(16px,2vw,22px)] leading-snug tracking-tight text-white/70">
        Real systems shipped into regulated environments, with measurable outcomes.
      </p>
      <span className="mt-8 hidden text-sm uppercase tracking-[0.2em] text-white/40 md:block">Scroll</span>
    </div>
  );
}

function VerticalFallback() {
  return (
    <section id="case-studies" className="relative overflow-hidden bg-transparent transition-colors duration-1000">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20">
        <IntroPanel />
        {cases.map((c) => (
          <CasePanel key={c.id} study={c} />
        ))}
      </div>
    </section>
  );
}

export function CaseStudiesHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 768px)");

    const updateMode = () => {
      setEnabled(!mqReduce.matches && mqDesktop.matches);
    };

    updateMode();
    mqReduce.addEventListener("change", updateMode);
    mqDesktop.addEventListener("change", updateMode);
    return () => {
      mqReduce.removeEventListener("change", updateMode);
      mqDesktop.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const el = containerRef.current;
      const track = trackRef.current;
      if (!el || !track) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const maxX = Math.max(track.scrollWidth - window.innerWidth, 0);

      if (scrollable <= 0 || maxX <= 0) {
        setTranslateX(0);
        return;
      }

      const raw = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setTranslateX(-(raw * maxX));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  if (!enabled) {
    return <VerticalFallback />;
  }

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="relative bg-transparent transition-colors duration-1000"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full w-max flex-nowrap items-stretch"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            willChange: "transform",
          }}
        >
          <IntroPanel />
          {cases.map((c) => (
            <CasePanel key={c.id} study={c} />
          ))}
          <div className="hidden shrink-0 md:block md:h-full md:w-[8vw]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
