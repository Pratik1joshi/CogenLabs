"use client";

import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = ["AI agents", "Workflow automation", "Production systems"];

export function HeroSection() {
  return (
    <section id="top" className="hero-shell relative isolate overflow-hidden border-b border-[#e7e5e1] bg-[#f8f7f5]">
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid min-h-[600px] max-w-7xl grid-cols-1 items-start gap-5 px-4 pb-10 pt-7 sm:px-6 md:h-[670px] md:min-h-0 md:grid-cols-[.92fr_1.08fr] md:gap-2 md:px-6 md:pb-0 md:pt-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-[38rem] md:pt-5"
        >
          <div className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1472fd]">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            AI engineering studio
          </p>
          </div>

          <h1 className="font-display mt-7 text-[clamp(2.25rem,5.2vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#101113]">
          Production AI, embedded in
            <br />
            <span className="text-[#1472fd]">your business.</span>
          </h1>

          <p className="mt-7 max-w-[33rem] text-[17px] leading-[1.55] tracking-[-0.018em] text-[#56575b] sm:text-[19px]">
            CoGen Labs designs and deploys AI systems that turn ambitious ideas into reliable, everyday results.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-lg bg-[#1472fd] px-5 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_22px_-12px_rgba(20,114,253,.65)] transition-transform hover:-translate-y-0.5">
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#solutions" className="inline-flex rounded-lg border border-[#d9d6d1] bg-white/70 px-5 py-3.5 text-[14px] font-semibold text-[#242528] transition-colors hover:bg-white">
              Explore our work
            </a>
          </div>

          <div className="mt-12 hidden items-center gap-5 sm:flex">
            <div className="flex -space-x-2">
              {["AI", "ML", "DX"].map((item, index) => (
                <div key={item} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f8f7f5] bg-[#1472fd] text-[9px] font-bold text-white" style={{ backgroundColor: index === 1 ? "#2b9eed" : index === 2 ? "#39e882" : undefined }}>
                  {item}
                </div>
              ))}
            </div>
            <p className="text-[13px] leading-snug text-[#6e6d6a]">A practical AI team, built around how you work.</p>
          </div>
        </motion.div>

        <div className="relative md:pt-32 -mx-4 flex h-[255px] min-h-0 items-start justify-center overflow-hidden sm:-mx-6 sm:h-[315px] md:mx-0 md:mr-[-26vw] md:h-auto md:min-h-[450px] md:overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.93, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hero-wheel relative aspect-square w-[520px] shrink-0 translate-x-0 md:w-[min(75vw,980px)] md:translate-x-[18%]"
          >
            <Image src="/heroRotating2.png" alt="AI platforms connected by CoGen" fill priority sizes="(min-width: 768px) 820px, 115vw" className="hero-wheel-image object-contain" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="absolute bottom-2 left-[10%] z-20 hidden w-[188px] rounded-xl border border-white/80 bg-white/92 p-4 shadow-[0_18px_45px_-22px_rgba(22,30,50,.35)] backdrop-blur sm:block md:bottom-10 md:left-[18%]">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#a09c96]">Built to connect</p>
            <p className="mt-1.5 font-display text-[18px] font-semibold tracking-[-0.04em] text-[#15161a]">Your entire stack.</p>
            <div className="mt-3 space-y-1.5">
              {capabilities.map((capability) => <div key={capability} className="flex items-center gap-1.5 text-[11px] font-medium text-[#55565a]"><Check className="h-3 w-3 text-[#39c978]" />{capability}</div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
