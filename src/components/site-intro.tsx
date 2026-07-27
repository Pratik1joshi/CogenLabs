"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const STORAGE_KEY = "cogen-intro-played";
const INTRO_TEXT = "COGEN LABS";

function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (nav?.type === "reload") return true;
  if (sessionStorage.getItem(STORAGE_KEY) === "1") return false;
  return true;
}

type Phase = "hold" | "wipe" | "morph";

export function SiteIntro({ onComplete }: { onComplete: () => void }) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("hold");
  const [morphStyle, setMorphStyle] = useState<CSSProperties>({});
  const [visibleCount, setVisibleCount] = useState(0);
  const wordRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const markPlayed = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    markPlayed();
    document.documentElement.style.overflow = "";
    onComplete();
    setActive(false);
  };

  useLayoutEffect(() => {
    if (!shouldPlayIntro()) {
      onComplete();
      return;
    }

    setActive(true);
    setVisibleCount(0);
    document.documentElement.style.overflow = "hidden";

    let charIdx = 0;
    const tChars = window.setInterval(() => {
      charIdx++;
      setVisibleCount(charIdx);
      if (charIdx >= INTRO_TEXT.length) window.clearInterval(tChars);
    }, 80);

    const tWipe = window.setTimeout(() => setPhase("wipe"), 1000);
    const tMorph = window.setTimeout(() => {
      const target = document.getElementById("nav-brand-text");
      const word = wordRef.current;
      if (target && word) {
        const from = word.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        const scale = Math.max(to.width / Math.max(from.width, 1), 0.06);
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        setMorphStyle({
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`,
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease 450ms",
          opacity: 0,
        });
      }
      setPhase("morph");
      window.setTimeout(() => onComplete(), 500);
    }, 2500);

    const tDone = window.setTimeout(finish, 3600);

    return () => {
      window.clearInterval(tChars);
      window.clearTimeout(tWipe);
      window.clearTimeout(tMorph);
      window.clearTimeout(tDone);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!active) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[100] flex flex-col bg-background"
      style={{
        height: phase === "morph" ? 64 : "100dvh",
        transition: "height 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        borderBottom:
          phase === "morph" ? "1px solid color-mix(in oklab, var(--border) 85%, transparent)" : "none",
      }}
      aria-hidden
    >
      <div className="relative z-20 flex flex-1 items-center justify-center px-6">
        <div className="relative w-fit overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 z-0 w-[38vw] min-w-[180px] max-w-[420px]"
            style={{
              background:
                "linear-gradient(90deg, rgb(255 255 255 / 0.65), rgb(255 255 255 / 0.22) 60%, transparent)",
              backdropFilter: "blur(16px) saturate(1.15)",
              WebkitBackdropFilter: "blur(16px) saturate(1.15)",
              borderRight: "1px solid rgb(255 255 255 / 0.5)",
              boxShadow: "10px 0 48px rgb(15 23 42 / 0.07)",
              transform: phase === "hold" ? "translate3d(-110%,0,0)" : "translate3d(280%,0,0)",
              transition:
                phase === "wipe" || phase === "morph"
                  ? "transform 1200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms ease"
                  : "none",
              opacity: phase === "morph" ? 0 : 1,
            }}
          />
          <div
            ref={wordRef}
            className="font-display relative z-10 font-semibold tracking-[-0.05em] text-foreground will-change-transform"
            style={{
              fontSize: "clamp(2.75rem, 12vw, 7.5rem)",
              lineHeight: 0.95,
              ...(phase === "morph" ? morphStyle : {}),
            }}
          >
            {INTRO_TEXT.split("").map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: i < visibleCount ? 1 : 0,
                  transform: i < visibleCount ? "translateY(0)" : "translateY(10px)",
                  transition: phase === "morph" ? "none" : "opacity 300ms ease, transform 300ms ease",
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
