"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const STORAGE_KEY = "cogen-intro-played";

function shouldPlayIntro() {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload" || sessionStorage.getItem(STORAGE_KEY) !== "1";
}

export function SiteIntro({ onComplete }: { onComplete: () => void }) {
  const [active, setActive] = useState(false);
  const [flying, setFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState<CSSProperties>({});
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!shouldPlayIntro()) { onComplete(); return; }
    setActive(true);
    document.documentElement.style.overflow = "hidden";

    const flyTimer = window.setTimeout(() => {
      const logo = logoRef.current;
      const target = document.getElementById("nav-brand");
      if (!logo || !target) return;
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const scale = to.width / from.width;
      setFlyStyle({
        transform: `translate3d(${to.left + to.width / 2 - (from.left + from.width / 2)}px, ${to.top + to.height / 2 - (from.top + from.height / 2)}px, 0) scale(${scale})`,
      });
      setFlying(true);
    }, 950);

    const revealTimer = window.setTimeout(onComplete, 2050);
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      document.documentElement.style.overflow = "";
      setActive(false);
    }, 2700);

    return () => {
      [flyTimer, revealTimer, doneTimer].forEach(window.clearTimeout);
      document.documentElement.style.overflow = "";
    };
    // The intro should only run once per page visit; `onComplete` is an inline callback from the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!active) return null;

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden bg-[#f8f7f5] transition-opacity duration-500 ${flying ? "delay-[750ms] opacity-0" : "opacity-100"}`} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,232,130,.12),transparent_30%)]" />
      <div
        ref={logoRef}
        className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ ...flyStyle, transition: flying ? "transform 1150ms cubic-bezier(0.22, 1, 0.36, 1)" : undefined }}
      >
        <Image src="/logo.png" alt="" fill priority sizes="290px" className="object-cover object-center" />
      </div>
    </div>
  );
}
