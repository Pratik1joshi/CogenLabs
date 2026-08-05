"use client";

import { useEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { ArrowRight, Cloud, Shield } from "lucide-react";

type Flagship = {
  id: string;
  title: string;
  lead: string;
  body: string;
  points: string[];
  cta: string;
  motif: "engine" | "agents" | "knowledge" | "flow";
  surface: string;
  ink: string;
  muted: string;
  chip: string;
  rotate: number;
};

const flagships: Flagship[] = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    lead: "Production LLM systems.",
    body: "Evals, inference infrastructure, and domain-fit models — built to survive production, not just demos.",
    points: ["Eval harness", "Inference infra", "Domain models"],
    cta: "Talk through your stack",
    motif: "engine",
    surface: "bg-[#f4f2ec] text-[#111]",
    ink: "text-[#111]",
    muted: "text-[#111]/70",
    chip: "border-black/10 bg-black/[0.06] text-[#111]/80",
    rotate: -16,
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    lead: "Agents that behave in production.",
    body: "Tool-using agents with memory, guardrails, and human-in-the-loop — observable and controllable at scale.",
    points: ["Tool use", "Memory", "HITL controls"],
    cta: "Talk about agents",
    motif: "agents",
    surface: "bg-[#dce8f5] text-[#0f172a]",
    ink: "text-[#0f172a]",
    muted: "text-[#0f172a]/70",
    chip: "border-black/10 bg-black/[0.06] text-[#0f172a]/80",
    rotate: 14,
  },
  {
    id: "knowledge-systems",
    title: "Knowledge Systems",
    lead: "Retrieval that grounds answers.",
    body: "Enterprise retrieval over documents, code, tickets, and warehouses — with citations you can trust.",
    points: ["Docs & code", "Citations", "Warehouse RAG"],
    cta: "Explore knowledge",
    motif: "knowledge",
    surface: "bg-[#e8e4f4] text-[#1a1230]",
    ink: "text-[#1a1230]",
    muted: "text-[#1a1230]/70",
    chip: "border-black/10 bg-black/[0.06] text-[#1a1230]/80",
    rotate: -11,
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    lead: "Drop the manual grind.",
    body: "Deterministic, observable automations that replace busywork across ops — with full audit trails.",
    points: ["Deterministic flows", "Observability", "Audit trails"],
    cta: "Automate with us",
    motif: "flow",
    surface: "bg-[#e4efe6] text-[#102016]",
    ink: "text-[#102016]",
    muted: "text-[#102016]/70",
    chip: "border-black/10 bg-black/[0.06] text-[#102016]/80",
    rotate: 18,
  },
];

const secondary = [
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    desc: "IaC, Kubernetes, CI/CD and platform engineering on AWS, GCP and Azure.",
    icon: Cloud,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    desc: "Threat modelling, SOC 2 readiness and continuous security posture management.",
    icon: Shield,
  },
];

const GAP = 64;
const LERP = 0.12;

function easeInCubic(t: number) {
  return t * t * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CardMotif({ motif, className }: { motif: Flagship["motif"]; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-black/10 bg-white/50 ${className ?? ""}`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {motif === "engine" && (
        <div className="absolute inset-[10%] flex flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-lg border border-black/10 bg-white/80 px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/50">Pipeline</span>
            <span className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-[10px] font-medium">eval pass</span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[
              { l: "Prompt", v: "v12" },
              { l: "Model", v: "ft-7b" },
              { l: "Latency", v: "180ms" },
              { l: "Cost", v: "$0.02" },
              { l: "Evals", v: "0.94" },
              { l: "Traffic", v: "canary" },
            ].map((cell) => (
              <div key={cell.l} className="flex flex-col justify-between rounded-lg border border-black/10 bg-white/80 px-2.5 py-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-black/45">{cell.l}</span>
                <span className="mt-1.5 text-[12px] font-semibold text-black/85">{cell.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "agents" && (
        <div className="absolute inset-[10%] grid grid-cols-[1fr_0.9fr] gap-2.5">
          <div className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white/80 p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Agent graph</span>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {["Planner", "Tools", "Reviewer"].map((n, i) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="grid size-6 place-items-center rounded-full bg-black/15 text-[10px] font-bold">{i + 1}</span>
                  <span className="text-[12px] font-semibold text-black/85">{n}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-black/10 bg-white/80 p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Live</span>
            {[
              { l: "Tools", v: "8 active" },
              { l: "Memory", v: "On" },
              { l: "HITL", v: "Queued 1" },
            ].map((row) => (
              <div key={row.l} className="flex items-center justify-between rounded-md bg-black/[0.05] px-2 py-1.5 text-[11px]">
                <span className="text-black/55">{row.l}</span>
                <span className="font-semibold text-black/85">{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {motif === "knowledge" && (
        <div className="absolute inset-[10%] grid grid-cols-[0.95fr_1.05fr] gap-2.5">
          <div className="flex flex-col gap-1.5 rounded-lg border border-black/10 bg-white/80 p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Indexed</span>
            {["Policies.pdf", "tickets.csv", "src/api", "warehouse"].map((s) => (
              <div key={s} className="rounded-md bg-black/[0.05] px-2 py-1.5 text-[11px] font-medium text-black/80">
                {s}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between rounded-lg border border-black/10 bg-white/80 p-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Answer</span>
            <p className="text-[12px] leading-snug text-black/80">
              Clause 4.2 conflicts with internal policy. Cite: Policies.pdf p.11.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["docs", "code", "tickets"].map((t) => (
                <span key={t} className="rounded bg-black/10 px-1.5 py-0.5 font-mono text-[9px] text-black/65">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {motif === "flow" && (
        <div className="absolute inset-[10%] flex flex-col justify-center gap-2.5">
          <div className="flex items-center gap-1.5">
            {["Trigger", "Validate", "Act", "Log"].map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-1.5">
                <div className="flex flex-1 flex-col gap-1 rounded-lg border border-black/10 bg-white/85 px-2 py-2">
                  <span className="font-mono text-[9px] text-black/45">0{i + 1}</span>
                  <span className="text-[11px] font-semibold text-black/85">{s}</span>
                </div>
                {i < 3 && <div className="hidden h-px w-2 shrink-0 bg-black/25 sm:block" />}
              </div>
            ))}
          </div>
          <div className="flex h-14 items-end gap-1 rounded-lg border border-black/10 bg-white/70 px-2.5 pb-2 pt-2">
            {[40, 62, 48, 78, 55, 88, 66, 72].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-black/30" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({
  service,
  index,
  style,
  stacked = true,
  cardRef,
}: {
  service: Flagship;
  index: number;
  style?: CSSProperties;
  stacked?: boolean;
  cardRef?: Ref<HTMLElement>;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      id={service.id}
      ref={cardRef}
      className={`${stacked ? "absolute inset-0" : "relative"} flex min-h-[460px] flex-col overflow-hidden rounded-[24px] shadow-[0_24px_60px_-28px_rgb(0_0_0_/0.55)] ${service.surface}`}
      style={style}
    >
      <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-9">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 max-w-xl">
            <h3 className={`font-display text-[clamp(1.65rem,3.2vw,2.75rem)] font-semibold tracking-tight ${service.ink}`}>
              {service.title}
            </h3>
            <p className={`mt-1.5 text-[15px] md:text-[16px] ${service.muted}`}>{service.lead}</p>
          </div>
          <div className="flex shrink-0 font-mono text-[26px] font-medium tabular-nums leading-none opacity-40 md:text-[32px]">
            <span>{num[0]}</span>
            <span>{num[1]}</span>
          </div>
        </div>

        <div className="mt-6 grid flex-1 gap-5 md:mt-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-end md:gap-8">
          <div>
            <p className={`max-w-md text-[14px] leading-relaxed md:text-[15px] ${service.muted}`}>
              {service.body}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium ${service.chip}`}
                >
                  {point}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`group mt-5 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-4 py-2.5 text-[13px] font-medium ${service.ink} transition-colors hover:bg-black/10`}
            >
              {service.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <CardMotif motif={service.motif} className="min-h-[180px] md:min-h-[240px]" />
        </div>
      </div>
    </article>
  );
}

function QuietRow() {
  return (
    <div className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Also available</p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          {secondary.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                <div>
                  <h4 className="font-display text-[16px] font-semibold text-white/80">{s.title}</h4>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-white/45">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Continuous card pose from smoothed progress (0..1). No discrete depth jumps. */
function applyCardPose(el: HTMLElement, progress: number, index: number, total: number) {
  const phase = progress * total;
  const isLast = index === total - 1;
  const local = phase - index;

  let y = 0;
  let z = 0;
  let scale = 1;
  let rotate = 0;
  let opacity = 1;
  let zIndex = total - index;
  let pointerEvents: "auto" | "none" = "none";

  if (isLast) {
    const depth = Math.max(0, total - 1 - phase);
    y = depth * GAP;
    z = -depth * GAP;
    scale = 1 - depth * 0.018;
    zIndex = total;
    pointerEvents = depth < 0.35 ? "auto" : "none";
  } else if (local < 0) {
    const depth = -local;
    y = depth * GAP;
    z = -depth * GAP;
    scale = 1 - depth * 0.018;
    zIndex = total - index;
  } else if (local < 1) {
    // Advance then fly — continuous
    const advanceEnd = 0.38;
    if (local < advanceEnd) {
      const t = easeOutCubic(local / advanceEnd);
      y = -GAP * 0.15 * t;
      z = GAP * 0.35 * t;
      scale = 1 + 0.02 * t;
      zIndex = 50 + (total - index);
      pointerEvents = "auto";
    } else {
      const t = easeInCubic((local - advanceEnd) / (1 - advanceEnd));
      y = -GAP * 0.15 - t * window.innerHeight * 1.15;
      z = GAP * 0.35 + t * 80;
      scale = 1.02 + t * 0.16;
      rotate = flagships[index].rotate * t;
      opacity = 1 - t * 0.2;
      zIndex = 80 + (total - index);
      pointerEvents = "none";
    }
  } else {
    y = -window.innerHeight * 1.2;
    z = 120;
    scale = 1.18;
    rotate = flagships[index].rotate;
    opacity = 0;
    zIndex = 1;
    pointerEvents = "none";
  }

  el.style.transform = `translate3d(0, ${y}px, ${z}px) rotate(${rotate}deg) scale(${scale})`;
  el.style.opacity = String(opacity);
  el.style.zIndex = String(zIndex);
  el.style.pointerEvents = pointerEvents;
}

function VerticalFallback() {
  return (
    <section id="solutions" className="bg-transparent transition-colors duration-1000">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">Solutions</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight">
          An engineering partner for the entire AI stack.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
          From model systems to agents, knowledge, and automation — built for production, not slides.
        </p>
        <div className="mt-8 space-y-5">
          {flagships.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} stacked={false} />
          ))}
        </div>
      </div>
      <QuietRow />
    </section>
  );
}

export function SolutionsStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const rafRef = useRef<number | null>(null);
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

    const readTarget = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetProgress.current = 0;
        return;
      }
      targetProgress.current = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    };

    const tick = () => {
      readTarget();
      const prev = smoothProgress.current;
      const next = prev + (targetProgress.current - prev) * LERP;
      // Snap when nearly settled to avoid endless micro-updates
      smoothProgress.current = Math.abs(targetProgress.current - next) < 0.00035 ? targetProgress.current : next;

      const p = smoothProgress.current;
      const n = flagships.length;
      for (let i = 0; i < n; i++) {
        const node = cardRefs.current[i];
        if (node) applyCardPose(node, p, i, n);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    readTarget();
    smoothProgress.current = targetProgress.current;
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget, { passive: true });

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
    };
  }, [enabled]);

  if (!enabled) {
    return <VerticalFallback />;
  }

  return (
    <section id="solutions" className="bg-transparent transition-colors duration-1000">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-5 md:pt-16">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">Solutions</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight">
          An engineering partner for the entire AI stack.
        </h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
          From model systems to agents, knowledge, and automation — built for production, not slides.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#1472fd] px-4 py-2.5 text-[13px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#ai-engineering"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-[13px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            See capabilities
          </a>
        </div>
      </div>

      <div ref={trackRef} className="relative" style={{ height: `${flagships.length * 120}vh` }}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6 py-6">
          <div
            className="relative h-[min(84vh,740px)] w-full max-w-5xl"
            style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
          >
            {flagships.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                cardRef={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <QuietRow />
    </section>
  );
}
