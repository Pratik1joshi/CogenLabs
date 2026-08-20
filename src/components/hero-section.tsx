"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Globe2,
  Play,
  Shield,
  X,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const VIDEO_SRC =
  "https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/abstract-video.mp4";

const headline = [
  { text: "Production AI.", solid: true },
  { text: "Systems that ship.", solid: false },
] as const;

const metrics = [
  { icon: Shield, value: 40, suffix: "+", label: "Systems deployed" },
  { icon: Check, value: 12, suffix: "+", label: "Industries served" },
  { icon: Globe2, value: 99, suffix: ".8%", label: "Uptime target" },
] as const;

function CountUp({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const frames = 48;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const t = Math.min(1, frame / frames);
      const eased = 1 - (1 - t) ** 3;
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
      {n}
      {suffix}
    </span>
  );
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      v?.pause();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="System demo"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-5 sm:top-5"
        aria-label="Close demo"
      >
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <div className="relative aspect-video w-full max-w-5xl overflow-hidden border border-white/10 bg-black shadow-2xl">
        <video ref={videoRef} className="h-full w-full object-cover" controls playsInline>
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.4 });
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.85;
    void video.play().catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="relative isolate -mt-16 min-h-svh overflow-hidden bg-[#07080a] text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full scale-105 object-cover object-center opacity-70"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(7,8,10,0.55) 0%, rgba(7,8,10,0.88) 70%, rgba(7,8,10,0.96) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#07080a] via-[#07080a]/70 to-transparent sm:h-28" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col px-4 pb-0 pt-[4.75rem] sm:px-6 sm:pt-20 md:px-8 lg:px-10 lg:pt-24">
        <div className="flex flex-1 flex-col justify-center py-5 sm:py-7 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl"
          >
            <div className="mb-4 flex items-center gap-2.5 sm:mb-5 sm:gap-3">
              <span className="h-px w-6 shrink-0 bg-white/35 sm:w-10" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/65 sm:text-[11px]">
                Engineered to ship
              </span>
              
            </div>

            <p className="font-display mb-3 text-[1.35rem] font-semibold tracking-tight text-white sm:mb-4 sm:text-2xl">
              CoGen Labs
            </p>

            <h1 className="font-display text-[clamp(2.15rem,8.5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
              {headline.map((line) => (
                <span
                  key={line.text}
                  className={`block ${line.solid ? "text-white" : "text-white/40"}`}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/60 sm:mt-6 sm:text-[15.5px]">
              CoGen Labs designs, builds, and operates AI systems, agents, and cloud infrastructure
              that turn ambitious ideas into reliable production results.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#solutions"
                className="group inline-flex w-full items-center justify-center gap-2 border border-white px-5 py-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#07080a] sm:w-auto sm:px-6"
              >
                Explore solutions
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="group inline-flex w-full items-center justify-center gap-3 text-[13px] font-semibold text-white/75 transition-colors hover:text-white sm:w-auto sm:justify-start"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 transition-colors group-hover:border-white group-hover:bg-white/10">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                System demo
              </button>
            </div>
          </motion.div>
        </div>

        <div ref={metricsRef} className="mt-auto border-t border-white/10 py-4 sm:py-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {metrics.map(({ icon: Icon, value, suffix, label }) => (
              <div
                key={label}
                className="flex min-w-0 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-center sm:gap-3"
              >
                <Icon className="hidden h-4 w-4 shrink-0 text-white/40 sm:block" strokeWidth={1.5} />
                <div className="flex min-w-0 flex-col gap-0.5 sm:items-center sm:text-center">
                  <CountUp value={value} suffix={suffix} active={metricsInView} />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45 sm:text-[10px]">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
