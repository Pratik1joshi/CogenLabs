"use client";

import { useEffect, useRef, useState } from "react";

const segments = [
  { id: "discovery", label: "Discovery" },
  { id: "architecture", label: "Architecture" },
  { id: "mvp", label: "MVP" },
  { id: "launch", label: "Launch" },
  { id: "scale", label: "Scale" },
];

const arcLabels = [
  { text: "Workflow audit", ring: 0, angle: -118 },
  { text: "Model selection", ring: 1, angle: -102 },
  { text: "Evals & guardrails", ring: 2, angle: -88 },
  { text: "Integrations", ring: 3, angle: -74 },
  { text: "On-call ops", ring: 4, angle: -58 },
  { text: "Cost control", ring: 5, angle: -42 },
];

/** Radii grow rightward; all circles touch the same origin on the left */
const RING_RADII = [95, 150, 215, 290, 375, 470];
const ANIM_MS = 4500;

function clamp01(n: number) {
  return Math.min(Math.max(n, 0), 1);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function stagesFromProgress(p: number) {
  const line = easeOutCubic(clamp01(p / 0.18));
  const start = easeOutCubic(clamp01((p - 0.08) / 0.14));
  const insight = easeOutCubic(clamp01((p - 0.16) / 0.12));
  const bar = clamp01((p - 0.24) / 0.28);
  const rings = easeOutCubic(clamp01((p - 0.38) / 0.38));
  const labels = easeOutCubic(clamp01((p - 0.5) / 0.35));
  const ship = easeOutCubic(clamp01((p - 0.7) / 0.25));
  return { line, start, insight, bar, rings, labels, ship };
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function BlueprintDiagram({ progress }: { progress: number }) {
  const a = stagesFromProgress(progress);
  const vbW = 1320;
  const vbH = 780;
  const axisY = 560;
  const startCx = 140;
  const barX0 = 460;
  const barX1 = 1180;
  const barW = barX1 - barX0;
  const segW = barW / segments.length;
  /** Shared left touch-point for every expanding arc (start of Discovery) */
  const originX = barX0;
  const drawnBarW = barW * a.bar;
  const insightX = (startCx + 88 + originX) / 2;

  return (
    <svg
      viewBox={`0 80 ${vbW} ${vbH - 80}`}
      className="h-auto w-full max-h-none overflow-visible"
      role="img"
      aria-label="AI CTO engagement path from your stack through discovery to scale"
    >
      {Array.from({ length: 27 }).map((_, i) => (
        <line
          key={i}
          x1={10 + i * 50}
          y1={8}
          x2={10 + i * 50}
          y2={vbH - 6}
          stroke="rgb(255 255 255 / 0.035)"
          strokeWidth="1"
        />
      ))}

      {/* Arcs share ONE origin: centers sit at originX + r so leftmost point is fixed */}
      {RING_RADII.map((fullR, i) => {
        const grow = clamp01(a.rings * (1.05 - i * 0.04));
        const r = fullR * grow;
        if (r < 2) return null;
        const cx = originX + r;
        const cy = axisY;
        const circ = 2 * Math.PI * r;
        // Draw from the shared left touch-point (west) sweeping upward/right
        return (
          <circle
            key={fullR}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgb(255 255 255 / 0.32)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - grow)}
            transform={`rotate(180 ${cx} ${cy})`}
            opacity={0.25 + grow * 0.5}
          />
        );
      })}

      {/* diagonal guide from shared origin */}
      <line
        x1={originX}
        y1={axisY}
        x2={originX + 560 * a.rings}
        y2={axisY - 380 * a.rings}
        stroke="rgb(255 255 255 / 0.2)"
        strokeWidth="1"
        opacity={a.rings}
      />

      <line x1={70} y1={axisY} x2={1220} y2={axisY} stroke="rgb(255 255 255 / 0.12)" strokeWidth="1" />
      <line
        x1={70}
        y1={axisY}
        x2={70 + 1150 * a.line}
        y2={axisY}
        stroke="rgb(255 255 255 / 0.85)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* origin node marker */}
      <rect
        x={originX - 3.5}
        y={axisY - 3.5}
        width={7}
        height={7}
        fill="rgb(255 255 255 / 0.9)"
        opacity={Math.min(1, a.bar * 4)}
      />

      <g opacity={a.start}>
        <circle
          cx={startCx}
          cy={axisY}
          r={88 * (0.78 + a.start * 0.22)}
          fill="none"
          stroke="rgb(255 255 255 / 0.88)"
          strokeWidth="1.35"
        />
        <text
          x={startCx}
          y={axisY - 10}
          textAnchor="middle"
          className="fill-white"
          style={{ fontSize: 20, fontFamily: "var(--font-sans)", fontWeight: 500 }}
        >
          Your stack
        </text>
        <text
          x={startCx}
          y={axisY + 16}
          textAnchor="middle"
          fill="rgb(255 255 255 / 0.45)"
          style={{ fontSize: 13, fontFamily: "var(--font-mono)" }}
        >
          systems & goals
        </text>
      </g>

      <g opacity={a.insight}>
        <line
          x1={startCx + 92}
          y1={axisY}
          x2={originX - 18}
          y2={axisY}
          stroke="rgb(255 255 255 / 0.7)"
          strokeWidth="1.35"
        />
        <polygon
          points={`${originX - 10},${axisY} ${originX - 22},${axisY - 6.5} ${originX - 22},${axisY + 6.5}`}
          fill="rgb(255 255 255 / 0.7)"
        />
        <text
          x={insightX}
          y={axisY - 18}
          textAnchor="middle"
          fill="rgb(255 255 255 / 0.75)"
          style={{ fontSize: 14.5, fontFamily: "var(--font-sans)" }}
        >
          Brief & hypothesis
        </text>
      </g>

      <g opacity={Math.min(1, a.bar * 3)}>
        <rect x={barX0} y={axisY - 1.25} width={drawnBarW} height={2.5} fill="rgb(255 255 255 / 0.88)" />
        {segments.map((seg, i) => {
          const x = barX0 + i * segW;
          const visible = a.bar > i / segments.length;
          const local = clamp01((a.bar - i / segments.length) * segments.length);
          return (
            <g key={seg.id} opacity={visible ? 0.35 + local * 0.65 : 0.15}>
              {i > 0 && (
                <rect
                  x={x - 3.5}
                  y={axisY - 3.5}
                  width={7}
                  height={7}
                  fill={visible ? "rgb(255 255 255 / 0.92)" : "rgb(255 255 255 / 0.2)"}
                />
              )}
              {i > 0 && (
                <line
                  x1={x}
                  y1={axisY - 22}
                  x2={x}
                  y2={axisY + 22}
                  stroke="rgb(255 255 255 / 0.15)"
                  strokeWidth="1"
                />
              )}
              <text
                x={x + segW * 0.45}
                y={axisY + 36}
                textAnchor="middle"
                fill="rgb(255 255 255 / 0.78)"
                style={{ fontSize: 14, fontFamily: "var(--font-sans)" }}
              >
                · {seg.label}
              </text>
            </g>
          );
        })}
      </g>

      <text
        x={barX0 + segW * 3.05}
        y={axisY - 64}
        fill="rgb(255 255 255 / 0.94)"
        opacity={a.ship}
        style={{
          fontSize: 72,
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
        }}
      >
        Ship
      </text>

      {arcLabels.map((lab, i) => {
        const fullR = RING_RADII[lab.ring];
        const grow = clamp01(a.rings * (1.05 - lab.ring * 0.04));
        const r = fullR * grow;
        const t = clamp01((a.labels - i * 0.07) / 0.55);
        if (r < 8) return null;
        const cx = originX + r;
        const cy = axisY;
        const pt = polar(cx, cy, r * 0.98, lab.angle);
        return (
          <text
            key={lab.text}
            x={pt.x}
            y={pt.y}
            fill="rgb(255 255 255 / 0.72)"
            opacity={t}
            style={{ fontSize: 13, fontFamily: "var(--font-sans)" }}
          >
            {lab.text}
          </text>
        );
      })}

      <g opacity={a.labels * 0.9}>
        <text
          x={originX + 480}
          y={axisY - 300}
          fill="rgb(255 255 255 / 0.55)"
          style={{ fontSize: 13, fontFamily: "var(--font-sans)" }}
        >
          Staff+ engineers embedded
        </text>
        <text
          x={originX + 520}
          y={axisY - 268}
          fill="rgb(255 255 255 / 0.55)"
          style={{ fontSize: 13, fontFamily: "var(--font-sans)" }}
        >
          Weekly cadence · on-call
        </text>
      </g>
    </svg>
  );
}

function Heading() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:pt-24 lg:pt-28">
      <p className="font-mono text-[12px] tracking-[0.14em] text-white/45">( Flagship )</p>
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-10">
        <h2 className="font-display text-[clamp(3.5rem,12vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
          Embed
        </h2>
        <p className="max-w-md pb-2 font-display text-[clamp(1.15rem,2.2vw,1.65rem)] font-medium leading-snug tracking-tight text-white/80 lg:pb-4">
          AI CTO — a senior engineering team, on demand.
        </p>
      </div>
      <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-white/50 md:text-[15.5px]">
        Embed a CoGen engineering pod inside your company. We own the AI roadmap, ship production
        systems, and stay to operate them — from first audit to durable scale.
      </p>
    </div>
  );
}

export function AiCtoTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const playedRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const play = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      const start = performance.now();

      const tick = (now: number) => {
        const t = clamp01((now - start) / ANIM_MS);
        setProgress(t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
          play();
        }
      },
      { threshold: [0.28, 0.4, 0.55] },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <section
      id="ai-cto"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-transparent transition-colors duration-1000"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 100%",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 58% 78%, rgb(255 255 255 / 0.06), transparent 68%)",
        }}
      />

      <Heading />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-24 pt-2 md:px-8 md:pb-32 md:pt-4 lg:px-10 lg:pb-36">
        <div className="min-h-[min(70vh,700px)] w-full">
          <BlueprintDiagram progress={progress} />
        </div>
      </div>
    </section>
  );
}
