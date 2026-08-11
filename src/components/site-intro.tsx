"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STORAGE_KEY = "cogen-intro-played";
/** Scale past the frame so the bottom-right watermark is clipped. */
const CROP_SCALE = 1.2;
const MAX_WAIT_MS = 12000;
/** Must match public/ filename case — Linux (Vercel) is case-sensitive. */
const INTRO_VIDEO = "/Scene.mp4";

function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  // Play on first visit this session, or any hard reload
  return nav?.type === "reload" || sessionStorage.getItem(STORAGE_KEY) !== "1";
}

export function SiteIntro({ onComplete }: { onComplete: () => void }) {
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (!shouldPlayIntro()) {
      onComplete();
      return;
    }
    setActive(true);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!active) return;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setExiting(true);
      onComplete();

      window.setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.documentElement.style.overflow = "";
        setActive(false);
      }, 900);
    };

    const video = videoRef.current;
    const failSafe = window.setTimeout(finish, MAX_WAIT_MS);

    if (!video) {
      finish();
      return () => window.clearTimeout(failSafe);
    }

    const onEnded = () => finish();
    const onError = () => finish();

    const tryPlay = () => {
      void video.play().catch(() => {
        // Autoplay can reject briefly; keep overlay up until ended/error/failSafe.
        // Do NOT finish here — that caused Vercel to skip when load was slow.
      });
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    video.addEventListener("loadeddata", tryPlay);

    if (video.readyState >= 2) tryPlay();
    else video.load();

    return () => {
      window.clearTimeout(failSafe);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("loadeddata", tryPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-white will-change-transform ${
        exiting ? "pointer-events-none" : ""
      }`}
      style={{
        transform: exiting ? "translate3d(0, -100%, 0)" : "translate3d(0, 0, 0)",
        transition: exiting ? "transform 850ms cubic-bezier(0.76, 0, 0.24, 1)" : undefined,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 overflow-hidden bg-white">
        <video
          ref={videoRef}
          src={INTRO_VIDEO}
          muted
          playsInline
          preload="auto"
          className="absolute left-1/2 top-1/2 h-full w-full max-w-none object-contain"
          style={{
            transform: `translate(calc(-50% - 2%), calc(-50% - 2.5%)) scale(${CROP_SCALE})`,
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );
}
