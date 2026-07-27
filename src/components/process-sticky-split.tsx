"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  motif: "audit" | "blueprint" | "sprint" | "deploy" | "refine";
};

const steps: Step[] = [
  {
    id: "discover",
    label: "Discover",
    title: "Map the opportunity.",
    body: "Workshops, data audit, and ROI so we know what to build and why.",
    motif: "audit",
  },
  {
    id: "design",
    label: "Design",
    title: "Architecture with guardrails.",
    body: "Model choice, security, and eval criteria before a line of production code.",
    motif: "blueprint",
  },
  {
    id: "build",
    label: "Build",
    title: "Ship in working rhythm.",
    body: "Iterative sprints with weekly demos your team can actually use.",
    motif: "sprint",
  },
  {
    id: "deploy",
    label: "Deploy",
    title: "Live with observability.",
    body: "CI/CD, cloud rollout, monitoring — production from day one of launch.",
    motif: "deploy",
  },
  {
    id: "refine",
    label: "Refine",
    title: "Improve what moves the needle.",
    body: "Evals, cost, latency, then scale across teams as the system proves itself.",
    motif: "refine",
  },
];

function StepMotif({ motif }: { motif: Step["motif"] }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(15 23 42 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />

      {motif === "audit" && (
        <div className="absolute inset-[12%] flex flex-col gap-2.5">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-md border border-border bg-background/80"
                style={{ opacity: 0.45 + (i % 3) * 0.18 }}
              />
            ))}
          </div>
          <div className="mt-auto rounded-lg border border-border bg-background/90 px-3 py-2 font-mono text-[11px] text-muted-foreground">
            Discover
          </div>
        </div>
      )}

      {motif === "blueprint" && (
        <svg className="absolute inset-[10%] h-[80%] w-[80%]" viewBox="0 0 280 220" fill="none" aria-hidden>
          <rect x="20" y="30" width="100" height="70" rx="8" stroke="currentColor" className="text-foreground/25" strokeWidth="1.5" />
          <rect x="150" y="30" width="100" height="70" rx="8" stroke="currentColor" className="text-primary/50" strokeWidth="1.5" />
          <rect x="85" y="130" width="110" height="60" rx="8" stroke="currentColor" className="text-foreground/30" strokeWidth="1.5" />
          <path d="M70 100 V130 M200 100 V130 M140 100 V130" stroke="currentColor" className="text-foreground/20" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="200" cy="65" r="4" className="fill-primary" />
          <text x="28" y="55" className="fill-muted-foreground" style={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}>
            arch
          </text>
          <text x="162" y="55" className="fill-primary" style={{ fontSize: 11, fontFamily: "ui-monospace, monospace" }}>
            evals
          </text>
        </svg>
      )}

      {motif === "sprint" && (
        <div className="absolute inset-x-[12%] bottom-[14%] top-[18%] flex flex-col justify-end gap-3">
          <div className="flex h-[58%] items-end gap-2">
            {[40, 58, 48, 72, 64, 86, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-primary/35"
                style={{ height: `${h}%`, opacity: 0.4 + (i % 4) * 0.12 }}
              />
            ))}
          </div>
          <div className="rounded-lg border border-border bg-background/90 px-3 py-2 font-mono text-[11px] text-muted-foreground">
            Build
          </div>
        </div>
      )}

      {motif === "deploy" && (
        <svg className="absolute inset-[12%] h-[76%] w-[76%]" viewBox="0 0 280 200" fill="none" aria-hidden>
          {[
            [40, 100],
            [100, 50],
            [100, 150],
            [180, 80],
            [180, 130],
            [240, 100],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" className="fill-primary/40 stroke-primary" strokeWidth="1.5" />
          ))}
          <path
            d="M47 100 H93 M107 57 L173 80 M107 143 L173 130 M187 85 L233 100 M187 125 L233 100"
            stroke="currentColor"
            className="text-foreground/25"
            strokeWidth="1.5"
          />
          <rect x="210" y="160" width="50" height="18" rx="4" className="fill-primary/15 stroke-primary/40" strokeWidth="1" />
        </svg>
      )}

      {motif === "refine" && (
        <div className="absolute inset-[14%] flex flex-col items-center justify-center gap-4">
          <svg viewBox="0 0 160 160" className="h-[58%] w-[58%]" aria-hidden>
            <circle cx="80" cy="80" r="58" className="stroke-border" strokeWidth="10" fill="none" />
            <circle
              cx="80"
              cy="80"
              r="58"
              className="stroke-primary"
              strokeWidth="10"
              fill="none"
              strokeDasharray="260"
              strokeDashoffset="70"
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
            <text
              x="80"
              y="86"
              textAnchor="middle"
              className="fill-foreground"
              style={{ fontSize: 22, fontFamily: "ui-monospace, monospace", fontWeight: 600 }}
            >
              92
            </text>
          </svg>
          <div className="rounded-lg border border-border bg-background/90 px-3 py-2 font-mono text-[11px] text-muted-foreground">
            Refine
          </div>
        </div>
      )}
    </div>
  );
}

function StepCopy({ step, index, active }: { step: Step; index: number; active: boolean }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className={`transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!active}
    >
      <p className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-primary">
        {num} — {step.label}
      </p>
      <h3 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">{step.body}</p>
    </div>
  );
}

function VerticalFallback() {
  return (
    <section id="process" className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-primary">Process</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight">
          From idea to production — without the chaos.
        </h2>
        <div className="mt-12 space-y-10">
          {steps.map((step, i) => (
            <div key={step.id} className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-8">
              <div className="aspect-[4/3] sm:aspect-[5/4]">
                <StepMotif motif={step.motif} />
              </div>
              <div>
                <p className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-primary">
                  {String(i + 1).padStart(2, "0")} — {step.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessStickySplit() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
      const el = trackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setActiveIndex(0);
        return;
      }

      const raw = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const idx = Math.min(steps.length - 1, Math.floor(raw * steps.length));
      setActiveIndex(idx);
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
      id="process"
      ref={trackRef}
      className="relative border-b border-border bg-transparent transition-colors duration-1000"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-2 items-center gap-10 px-6 py-16 lg:gap-16">
          <div className="relative aspect-[4/5] max-h-[min(72vh,640px)] w-full justify-self-stretch">
            {steps.map((step, i) => {
              const active = i === activeIndex;
              return (
                <div
                  key={step.id}
                  className="absolute inset-0 transition-[opacity,transform] duration-500 ease-out"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translate3d(0,0,0)" : "translate3d(0,6%,0)",
                    zIndex: active ? 2 : 1,
                  }}
                  aria-hidden={!active}
                >
                  <StepMotif motif={step.motif} />
                </div>
              );
            })}
          </div>

          <div className="relative flex min-h-[280px] flex-col justify-center">
            <p className="mb-8 text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Process
            </p>

            <div className="relative min-h-[220px]">
              {steps.map((step, i) => (
                <div key={step.id} className="absolute inset-0">
                  <StepCopy step={step} index={i} active={i === activeIndex} />
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3" aria-hidden>
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= activeIndex ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
