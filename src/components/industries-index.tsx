"use client";

import { useState } from "react";

type Industry = {
  id: string;
  name: string;
  note: string;
  chips: string[];
};

const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    note: "Clinical workflows, prior auth, HIPAA.",
    chips: ["HIPAA", "Clinical", "Prior auth"],
  },
  {
    id: "finance",
    name: "Finance",
    note: "Ops automation, risk, fraud detection.",
    chips: ["Risk", "Fraud", "Ops"],
  },
  {
    id: "education",
    name: "Education",
    note: "Tutors, admin automation, assessment.",
    chips: ["Tutors", "Admin", "Assess"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    note: "Vision QA, forecasting, MES agents.",
    chips: ["Vision", "Forecast", "MES"],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    note: "Concierge agents, revenue systems.",
    chips: ["Concierge", "Revenue"],
  },
  {
    id: "government",
    name: "Government",
    note: "Secure AI, citizen services, records.",
    chips: ["Secure", "Citizens", "Records"],
  },
  {
    id: "retail",
    name: "Retail",
    note: "Merchandising, catalog, support agents.",
    chips: ["Merch", "Catalog", "Support"],
  },
];

export function IndustriesIndex() {
  const [activeId, setActiveId] = useState(industries[0].id);

  return (
    <section id="industries" className="border-b border-border bg-transparent py-24 md:py-28 transition-colors duration-1000">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-primary">Industries</p>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold tracking-tight text-foreground">
            Built for regulated, high-stakes environments.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Domain-aware systems where compliance, auditability, and reliability are non-negotiable.
          </p>
        </div>

        <div className="mt-14 border-t border-border">
          {industries.map((it, i) => {
            const active = activeId === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onMouseEnter={() => setActiveId(it.id)}
                onFocus={() => setActiveId(it.id)}
                className={`group relative flex w-full flex-col gap-3 border-b border-border py-6 text-left transition-colors sm:flex-row sm:items-center sm:gap-8 sm:py-7 ${
                  active ? "bg-card/50" : "hover:bg-card/30"
                }`}
              >
                <span
                  className={`absolute inset-y-0 left-0 w-px transition-colors ${
                    active ? "bg-primary" : "bg-transparent"
                  }`}
                  aria-hidden
                />

                <span
                  className={`shrink-0 pl-3 font-mono text-[12px] tabular-nums sm:w-10 sm:pl-4 ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className={`min-w-0 flex-1 pl-3 font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold tracking-tight transition-colors sm:pl-0 ${
                    active ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  <span
                    className={`bg-gradient-to-r from-primary to-primary bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 ${
                      active ? "bg-[length:100%_1px]" : "group-hover:bg-[length:100%_1px]"
                    }`}
                  >
                    {it.name}
                  </span>
                </h3>

                <p
                  className={`max-w-sm pl-3 text-[13.5px] leading-relaxed transition-opacity sm:pl-0 sm:text-right ${
                    active ? "text-muted-foreground opacity-100" : "text-muted-foreground/70 opacity-90"
                  }`}
                >
                  {it.note}
                </p>

                <div
                  className={`flex flex-wrap gap-1.5 pl-3 transition-opacity sm:max-w-[220px] sm:justify-end sm:pl-0 ${
                    active ? "opacity-100" : "opacity-55"
                  }`}
                >
                  {it.chips.map((c) => (
                    <span
                      key={c}
                      className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] ${
                        active
                          ? "border-border bg-background text-foreground/80"
                          : "border-border/70 bg-transparent text-muted-foreground"
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
