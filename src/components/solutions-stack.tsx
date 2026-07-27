"use client";

import { useEffect, useRef, useState, type CSSProperties, type Ref } from "react";
import { ArrowRight, Cloud, Shield } from "lucide-react";

type Flagship = {
  id: string;
  title: string;
  lead: string;
  body: string;
  cta: string;
  motif: "engine" | "agents" | "knowledge" | "flow";
  surface: string;
  ink: string;
  muted: string;
  rotate: number;
};

const flagships: Flagship[] = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    lead: "Production LLM systems.",
    body: "Evals, inference infrastructure, and domain-fit models — built to survive production, not just demos.",
    cta: "Talk through your stack",
    motif: "engine",
    surface: "bg-[#f4f2ec] text-[#111]",
    ink: "text-[#111]",
    muted: "text-[#111]/70",
    rotate: -16,
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    lead: "Agents that behave in production.",
    body: "Tool-using agents with memory, guardrails, and human-in-the-loop — observable and controllable at scale.",
    cta: "Talk about agents",
    motif: "agents",
    surface: "bg-[#dce8f5] text-[#0f172a]",
    ink: "text-[#0f172a]",
    muted: "text-[#0f172a]/70",
    rotate: 14,
  },
  {
    id: "knowledge-systems",
    title: "Knowledge Systems",
    lead: "Retrieval that grounds answers.",
    body: "Enterprise retrieval over documents, code, tickets, and warehouses — with citations you can trust.",
    cta: "Explore knowledge",
    motif: "knowledge",
    surface: "bg-[#e8e4f4] text-[#1a1230]",
    ink: "text-[#1a1230]",
    muted: "text-[#1a1230]/70",
    rotate: -11,
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    lead: "Drop the manual grind.",
    body: "Deterministic, observable automations that replace busywork across ops — with full audit trails.",
    cta: "Automate with us",
    motif: "flow",
    surface: "bg-[#e4efe6] text-[#102016]",
    ink: "text-[#102016]",
    muted: "text-[#102016]/70",
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
    <div className={`relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(0 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {motif === "engine" && (
        <div className="absolute inset-[12%] flex flex-col gap-2.5">
          <div className="relative h-2 w-2/5 overflow-hidden rounded bg-black/15">
            <div className="absolute inset-y-0 left-0 w-1/2 rounded bg-black/35" />
          </div>
          <div className="mt-1 grid flex-1 grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-md bg-black/15"
              />
            ))}
          </div>
        </div>
      )}

      {motif === "agents" && (
        <svg className="absolute inset-[10%] h-[80%] w-[80%]" viewBox="0 0 240 180" fill="none" aria-hidden>
          <path
            d="M50 90 H110 M130 50 L190 90 M130 130 L190 90"
            stroke="rgb(0 0 0 / 0.28)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
          {[
            [40, 90, 0],
            [120, 40, 0.35],
            [120, 140, 0.7],
            [200, 90, 1.05],
          ].map(([x, y, delay], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="10"
              className="fill-black/30"
            />
          ))}
        </svg>
      )}

      {motif === "knowledge" && (
        <div className="absolute inset-[14%] flex flex-col gap-2.5 rounded-xl border border-black/10 bg-white/40 p-3.5">
          <div className="relative h-2 w-2/5 overflow-hidden rounded bg-black/15">
            <div className="absolute inset-y-0 w-full origin-left rounded bg-black/30" />
          </div>
          <div className="mt-1 space-y-2">
            {[100, 86, 72, 78].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded bg-black/12"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {motif === "flow" && (
        <div className="absolute inset-x-[12%] bottom-[16%] top-[20%] flex items-end gap-1.5">
          {[42, 68, 50, 86, 58, 94, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-black/25"
              style={{ height: `${h}%` }}
            />
          ))}
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
      ref={cardRef}
      className={`${stacked ? "absolute inset-0" : "relative"} flex min-h-[520px] flex-col overflow-hidden rounded-[28px] shadow-[0_24px_60px_-28px_rgb(0_0_0_/0.55)] ${service.surface}`}
      style={style}
    >
      <div className="flex flex-1 flex-col p-7 md:p-9 lg:p-11">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 max-w-xl">
            <h3 className={`font-display text-[clamp(1.75rem,3.5vw,3rem)] font-semibold tracking-tight ${service.ink}`}>
              {service.title}
            </h3>
            <p className={`mt-2 text-[15px] md:text-[16px] ${service.muted}`}>{service.lead}</p>
          </div>
          <div className="flex shrink-0 font-mono text-[28px] font-medium tabular-nums leading-none opacity-40 md:text-[36px]">
            <span>{num[0]}</span>
            <span>{num[1]}</span>
          </div>
        </div>

        <div className="mt-8 grid flex-1 gap-6 md:mt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end md:gap-10">
          <div>
            <p className={`max-w-md text-[14.5px] leading-relaxed md:text-[15.5px] ${service.muted}`}>
              {service.body}
            </p>
            <a
              href="#contact"
              className={`group mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-4 py-2.5 text-[13px] font-medium ${service.ink} transition-colors hover:bg-black/10`}
            >
              {service.cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <CardMotif motif={service.motif} className="min-h-[200px] bg-black/[0.04] md:min-h-[280px]" />
        </div>
      </div>
    </article>
  );
}

function QuietRow() {
  return (
    <div className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Also available</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {secondary.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                <div>
                  <h4 className="font-display text-[16px] font-semibold text-white/80">{s.title}</h4>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/45">{s.desc}</p>
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
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">Solutions</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight">
          An engineering partner for the entire AI stack.
        </h2>
        <div className="mt-12 space-y-6">
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
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-6 md:pt-24">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">Solutions</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold tracking-tight">
          An engineering partner for the entire AI stack.
        </h2>
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
