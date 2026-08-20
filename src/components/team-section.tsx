import { ArrowUpRight } from "lucide-react";

const team = [
  {
    name: "Alex Morgan",
    role: "CEO",
    initials: "AM",
    bio: "Placeholder for a short introduction about the team member and their focus.",
    tone: "from-[#4d7cfe] via-[#2854d8] to-[#101a45]",
  },
  {
    name: "Jordan Lee",
    role: "CTO",
    initials: "JL",
    bio: "Placeholder for a short introduction about the team member and their focus.",
    tone: "from-[#8e67ee] via-[#5132a3] to-[#20153e]",
  },
  {
    name: "Sam Patel",
    role: "CFO",
    initials: "SP",
    bio: "Placeholder for a short introduction about the team member and their focus.",
    tone: "from-[#24a18b] via-[#176a67] to-[#102d37]",
  },
  {
    name: "Taylor Kim",
    role: "CPO",
    initials: "TK",
    bio: "Placeholder for a short introduction about the team member and their focus.",
    tone: "from-[#f07a61] via-[#b8464f] to-[#401828]",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="border-b border-white/10 bg-transparent py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-primary">Our team</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              The people who turn ambition into production.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/60 md:text-right">
            A four-person team combining strategy, product, engineering, and operational rigor.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <article
              key={member.role}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className={`relative aspect-[4/4.5] overflow-hidden bg-gradient-to-br ${member.tone}`}>
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgb(255 255 255 / 0.18) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.18) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute bottom-5 left-5 flex size-14 items-center justify-center rounded-full border border-white/30 bg-black/10 font-display text-lg font-semibold tracking-tight text-white backdrop-blur-sm">
                  {member.initials}
                </div>
                <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                  Image placeholder
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-primary">
                      {String(index + 1).padStart(2, "0")} — {member.role}
                    </p>
                    <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-white">{member.name}</h3>
                  </div>
                  <span className="grid size-8 place-items-center rounded-full border border-white/10 text-white/45 transition-colors group-hover:border-white/30 group-hover:text-white">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
