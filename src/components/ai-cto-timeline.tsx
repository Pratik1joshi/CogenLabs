"use client";

import { useEffect, useRef, useState } from "react";

const segments = [
  { id: "discovery", label: "Discovery" },
  { id: "architecture", label: "Architecture" },
  { id: "mvp", label: "MVP" },
  { id: "launch", label: "Launch" },
  { id: "scale", label: "Scale" },
];

/**
 * Angles: 0 = up. Stay above the axis so labels never sit on segment names.
 */
const arcLabels = [
  { text: "Workflow audit", ring: 0, angle: -48 },
  { text: "Model selection", ring: 1, angle: -32 },
  { text: "Evals & guardrails", ring: 2, angle: -16 },
  { text: "Integrations", ring: 3, angle: 2 },
  { text: "On-call ops", ring: 4, angle: 18 },
  { text: "Cost control", ring: 5, angle: 32 },
];

const RING_RADII = [95, 150, 215, 290, 375, 470];
const ANIM_MS = 4500;
const VB_W = 1320;
const VB_H = 700;

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

/** Counter-rotate labels when the whole SVG is CSS-rotated 90° on mobile */
function upright(x: number, y: number, enabled: boolean) {
  return enabled ? `rotate(-90 ${x} ${y})` : undefined;
}

function BlueprintDiagram({
  progress,
  uprightText = false,
}: {
  progress: number;
  uprightText?: boolean;
}) {
  const a = stagesFromProgress(progress);
  const vbW = 1320;
  const vbH = 780;
  const axisY = 560;
  const startCx = 140;
  const barX0 = 460;
  const barX1 = 1180;
  const barW = barX1 - barX0;
  const segW = barW / segments.length;
  const originX = barX0;
  const drawnBarW = barW * a.bar;
  const insightX = (startCx + 88 + originX) / 2;
  const shipX = barX0 + segW * 3.05;
  const shipY = axisY - 72;

  return (
    <svg
      viewBox={`0 80 ${vbW} ${vbH - 80}`}
      className="h-auto w-full overflow-visible"
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

      {RING_RADII.map((fullR, i) => {
        const grow = clamp01(a.rings * (1.05 - i * 0.04));
        const r = fullR * grow;
        if (r < 2) return null;
        const cx = originX + r;
        const cy = axisY;
        const circ = 2 * Math.PI * r;
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
          transform={upright(startCx, axisY - 10, uprightText)}
          className="fill-white"
          style={{ fontSize: 20, fontFamily: "var(--font-sans)", fontWeight: 500 }}
        >
          Your stack
        </text>
        <text
          x={startCx}
          y={axisY + 16}
          textAnchor="middle"
          transform={upright(startCx, axisY + 16, uprightText)}
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
          y={axisY - 22}
          textAnchor="middle"
          transform={upright(insightX, axisY - 22, uprightText)}
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
          const labelX = x + segW * 0.5;
          const labelY = axisY + 48;
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
                  y1={axisY - 18}
                  x2={x}
                  y2={axisY + 18}
                  stroke="rgb(255 255 255 / 0.15)"
                  strokeWidth="1"
                />
              )}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                transform={upright(labelX, labelY, uprightText)}
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
        x={shipX}
        y={shipY}
        transform={upright(shipX, shipY, uprightText)}
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
        if (r < fullR * 0.55) return null;
        const cx = originX + r;
        const cy = axisY;
        const pt = polar(cx, cy, r * 1.02, lab.angle);
        const y = Math.min(pt.y, axisY - 28);
        return (
          <text
            key={lab.text}
            x={pt.x}
            y={y}
            transform={upright(pt.x, y, uprightText)}
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
          x={originX + 520}
          y={axisY - 310}
          transform={upright(originX + 520, axisY - 310, uprightText)}
          fill="rgb(255 255 255 / 0.55)"
          style={{ fontSize: 13, fontFamily: "var(--font-sans)" }}
        >
          Staff+ engineers embedded
        </text>
        <text
          x={originX + 560}
          y={axisY - 278}
          transform={upright(originX + 560, axisY - 278, uprightText)}
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
    <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 md:pt-16 lg:pt-20">
      <p className="font-mono text-[11px] tracking-[0.14em] text-white/45 sm:text-[12px]">( Flagship )</p>
      <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-3 lg:flex-row lg:items-end lg:gap-8">
        <h2 className="font-display text-[clamp(2.75rem,14vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
          Embed
        </h2>
        <p className="max-w-md font-display text-[clamp(1.05rem,3.8vw,1.65rem)] font-medium leading-snug tracking-tight text-white/80 lg:pb-3">
          AI CTO — a senior engineering team, on demand.
        </p>
      </div>
      <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/50 sm:mt-5 sm:text-[15px] md:text-[15.5px]">
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
        if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
          play();
        }
      },
      { threshold: [0.22, 0.35, 0.5] },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  const mobileSize = `min(980px, calc((100vw - 2rem) * ${VB_W} / ${VB_H}))`;

  return (
    <section
      id="ai-cto"
      ref={sectionRef}
      className="relative overflow-x-hidden border-b border-border bg-transparent transition-colors duration-1000"
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

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-10 pt-4 sm:px-6 sm:pb-14 md:px-8 md:pb-20 lg:px-10 lg:pb-24">
        {/* Mobile: same desktop blueprint, rotated 90° — labels stay upright */}
        <div className="relative mx-auto w-full md:hidden" style={{ height: mobileSize }}>
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: mobileSize,
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          >
            <BlueprintDiagram progress={progress} uprightText />
          </div>
        </div>

        {/* Desktop: normal horizontal */}
        <div className="hidden w-full md:block">
          <BlueprintDiagram progress={progress} />
        </div>
      </div>
    </section>
  );
}
