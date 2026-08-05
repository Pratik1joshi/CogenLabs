"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  motif: "audit" | "blueprint" | "sprint" | "deploy" | "refine";
};

const steps: Step[] = [
  {
    id: "discover",
    label: "Discover",
    title: "Map the opportunity.",
    body: "Workshops, data audit, and ROI so we know what to build and why.",
    points: ["Stakeholder workshops", "Data & systems audit", "ROI framing"],
    motif: "audit",
  },
  {
    id: "design",
    label: "Design",
    title: "Architecture with guardrails.",
    body: "Model choice, security, and eval criteria before a line of production code.",
    points: ["Model selection", "Security model", "Eval criteria"],
    motif: "blueprint",
  },
  {
    id: "build",
    label: "Build",
    title: "Ship in working rhythm.",
    body: "Iterative sprints with weekly demos your team can actually use.",
    points: ["Weekly demos", "Working software", "Tight feedback"],
    motif: "sprint",
  },
  {
    id: "deploy",
    label: "Deploy",
    title: "Live with observability.",
    body: "CI/CD, cloud rollout, monitoring — production from day one of launch.",
    points: ["CI/CD rollout", "Cloud deploy", "Live monitoring"],
    motif: "deploy",
  },
  {
    id: "refine",
    label: "Refine",
    title: "Improve what moves the needle.",
    body: "Evals, cost, latency, then scale across teams as the system proves itself.",
    points: ["Eval loops", "Cost & latency", "Scale out"],
    motif: "refine",
  },
];

function StepMotif({ motif }: { motif: Step["motif"] }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#d9d6d1] bg-[#eef1f6]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(15 23 42 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(20,114,253,0.14),transparent_55%)]" />

      {motif === "audit" && (
        <div className="absolute inset-[9%] flex flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-lg border border-[#c8d0dc] bg-white px-3 py-2 shadow-[0_8px_18px_-14px_rgba(20,40,80,.3)]">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6e6d6a]">Opportunity map</span>
            <span className="rounded bg-[#1472fd]/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-[#1472fd]">
              12 signals
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[
              { l: "Data", d: "Sources ready" },
              { l: "Workflow", d: "3 bottlenecks" },
              { l: "ROI", d: "Priority A" },
              { l: "Risk", d: "Medium" },
              { l: "Owners", d: "Ops + Eng" },
              { l: "Horizon", d: "6–8 wks" },
            ].map((cell) => (
              <div
                key={cell.l}
                className="flex flex-col justify-between rounded-lg border border-[#c8d0dc] bg-white px-2.5 py-2 shadow-[0_6px_14px_-12px_rgba(20,40,80,.25)]"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#6e6d6a]">{cell.l}</span>
                <span className="mt-1.5 text-[11px] font-semibold text-[#15161a]">{cell.d}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "blueprint" && (
        <div className="absolute inset-[9%] grid grid-rows-[1fr_auto] gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { l: "Architecture", d: "Retrieval + tools", accent: false },
              { l: "Evals", d: "Quality gates", accent: true },
              { l: "Security", d: "PII + policy", accent: false },
              { l: "Model", d: "Domain-fit", accent: false },
            ].map((box) => (
              <div
                key={box.l}
                className={`flex flex-col justify-between rounded-lg border px-3 py-2.5 ${
                  box.accent
                    ? "border-[#1472fd]/40 bg-white shadow-[0_8px_18px_-14px_rgba(20,114,253,.35)]"
                    : "border-[#c8d0dc] bg-white"
                }`}
              >
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.12em] ${
                    box.accent ? "text-[#1472fd]" : "text-[#6e6d6a]"
                  }`}
                >
                  {box.l}
                </span>
                <span className="mt-3 text-[12px] font-semibold text-[#15161a]">{box.d}</span>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-[#c8d0dc] bg-white px-3 py-2 font-mono text-[11px] text-[#56575b]">
            Guardrails locked before build
          </div>
        </div>
      )}

      {motif === "sprint" && (
        <div className="absolute inset-[9%] flex flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-lg border border-[#c8d0dc] bg-white px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6e6d6a]">Sprint 04</span>
            <span className="text-[11px] font-semibold text-[#15161a]">Demo Friday</span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[
              {
                col: "Now",
                items: ["Auth hook", "Eval suite"],
              },
              {
                col: "Next",
                items: ["Tool router", "HITL queue"],
              },
              {
                col: "Done",
                items: ["Ingest", "UI shell"],
              },
            ].map((col) => (
              <div key={col.col} className="flex flex-col gap-1.5 rounded-lg border border-[#c8d0dc] bg-white p-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#1472fd]">{col.col}</span>
                {col.items.map((item) => (
                  <div key={item} className="rounded-md bg-[#eef1f6] px-2 py-1.5 text-[11px] font-medium text-[#242528]">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "deploy" && (
        <div className="absolute inset-[9%] flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2">
            {["build", "test", "canary", "prod"].map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-1.5">
                <div
                  className={`flex flex-1 items-center justify-center rounded-lg border px-2 py-2.5 font-mono text-[11px] font-medium ${
                    i === 3
                      ? "border-[#1472fd] bg-[#1472fd] text-white"
                      : i === 2
                        ? "border-[#1472fd]/40 bg-white text-[#1472fd]"
                        : "border-[#c8d0dc] bg-white text-[#55565a]"
                  }`}
                >
                  {s}
                </div>
                {i < 3 && <div className="hidden h-px w-2 shrink-0 bg-[#1472fd]/40 sm:block" />}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Uptime", v: "99.9%" },
              { l: "p95", v: "210ms" },
              { l: "Errors", v: "0.02%" },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border border-[#c8d0dc] bg-white px-3 py-2.5">
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#6e6d6a]">{m.l}</div>
                <div className="mt-1 text-[14px] font-semibold text-[#15161a]">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "refine" && (
        <div className="absolute inset-[9%] grid grid-cols-[0.9fr_1.1fr] gap-2.5">
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#c8d0dc] bg-white p-3">
            <svg viewBox="0 0 160 160" className="h-[70%] w-[70%]" aria-hidden>
              <circle cx="80" cy="80" r="58" className="stroke-[#d9d6d1]" strokeWidth="10" fill="none" />
              <circle
                cx="80"
                cy="80"
                r="58"
                className="stroke-[#1472fd]"
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
                fill="#15161a"
                style={{ fontSize: 26, fontFamily: "ui-monospace, monospace", fontWeight: 600 }}
              >
                92
              </text>
            </svg>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#6e6d6a]">Eval score</span>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-[#c8d0dc] bg-white p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#1472fd]">Improving</span>
            {[
              { l: "Latency", v: "-18%" },
              { l: "Cost / call", v: "-22%" },
              { l: "Pass rate", v: "+9 pts" },
            ].map((row) => (
              <div key={row.l} className="flex items-center justify-between rounded-md bg-[#eef1f6] px-2.5 py-2 text-[12px]">
                <span className="text-[#56575b]">{row.l}</span>
                <span className="font-semibold text-[#15161a]">{row.v}</span>
              </div>
            ))}
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
      <p className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-[#1472fd]">
        {num} — {step.label}
      </p>
      <h3 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.65rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {step.points.map((point) => (
          <li
            key={point}
            className="rounded-md border border-border bg-background/80 px-2.5 py-1 text-[11.5px] font-medium text-foreground/80"
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VerticalFallback() {
  return (
    <section id="process" className="border-b border-border bg-[#f4f5f8] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#1472fd]">Process</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight">
          From idea to production — without the chaos.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          A fixed rhythm from discovery through refine — so AI systems ship, land, and keep improving.
        </p>
        <div className="mt-10 space-y-8">
          {steps.map((step, i) => (
            <div key={step.id} className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-7">
              <div className="aspect-[4/3] sm:aspect-[5/4]">
                <StepMotif motif={step.motif} />
              </div>
              <div>
                <p className="font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-[#1472fd]">
                  {String(i + 1).padStart(2, "0")} — {step.label}
                </p>
                <h3 className="mt-2.5 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{step.body}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-md border border-border bg-white px-2.5 py-1 text-[11.5px] font-medium text-foreground/80"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
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
      className="relative border-b border-border bg-[#f4f5f8] transition-colors duration-1000"
      style={{ height: `${steps.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-2 items-center gap-8 px-6 py-12 lg:gap-12">
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

          <div className="relative flex min-h-[300px] flex-col justify-center">
            <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Process
            </p>
            <p className="mb-6 max-w-md text-[14px] leading-relaxed text-muted-foreground">
              From idea to production — without the chaos.
            </p>

            <div className="relative min-h-[240px]">
              {steps.map((step, i) => (
                <div key={step.id} className="absolute inset-0">
                  <StepCopy step={step} index={i} active={i === activeIndex} />
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2.5" aria-hidden>
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= activeIndex ? "bg-[#1472fd]" : "bg-border"
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
