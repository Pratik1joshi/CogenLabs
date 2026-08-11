"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const VIDEO_SRC = "/Use_the_attached_video_as_a_MO.mp4";

/** Same plane as the unscrolled navbar / page background */
const FADE = "#ffffff";

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 1;
    void video.play().catch(() => {});
  }, []);

  return (
    <section
      id="top"
      /* Pull under sticky nav (h-16) so top fade + video sit behind it */
      className="relative isolate -mt-16 min-h-svh overflow-hidden border-b border-[#e7e5e1] bg-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-right md:object-center"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Left text readability */}
        <div className="absolute inset-0 w-full bg-gradient-to-r from-white via-white/90 to-transparent md:w-[48%] lg:w-[42%]" />

        {/* Top fade — covers navbar height then softens into the video */}
        <div
          className="absolute inset-x-0 top-0 z-[2] h-[7.5rem] sm:h-36 lg:h-44"
          style={{
            background: `linear-gradient(to bottom, ${FADE} 0%, ${FADE} 42%, rgba(255,255,255,0.72) 68%, transparent 100%)`,
          }}
        />

        {/* Bottom framing */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2] h-40 sm:h-48 lg:h-56"
          style={{
            background: `linear-gradient(to top, ${FADE} 0%, rgba(255,255,255,0.85) 45%, transparent 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-none flex-col justify-center px-6 pb-12 pt-28 sm:px-12 lg:px-16 lg:pb-16 lg:pt-32">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-8 lg:col-span-7 xl:col-span-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1472fd] sm:text-sm">
              <span>• AI Agents • Automation • Systems</span>
            </div>

            <h1 className="text-6xl font-extrabold leading-[0.95] tracking-tight text-[#101113] sm:text-7xl lg:text-[88px] xl:text-[96px]">
              Production AI{" "}
              <br className="hidden sm:inline" />
              <span className="font-serif block font-normal italic tracking-normal text-[#1472fd] sm:inline">
                that ships.
              </span>
            </h1>

            <p className="max-w-md text-base font-normal leading-relaxed text-[#56575b] sm:text-lg">
              We design and deploy AI systems that turn ambitious ideas into reliable, everyday results.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 sm:gap-8">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#101113] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1472fd] hover:shadow-xl active:scale-95"
              >
                Book a call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="flex -space-x-2.5 overflow-hidden">
                {avatars.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none relative hidden lg:col-span-5 lg:block xl:col-span-6" aria-hidden />
        </div>
      </div>
    </section>
  );
}
