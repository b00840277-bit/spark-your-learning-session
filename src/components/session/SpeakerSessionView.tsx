import type { UpcomingSession } from "@/data/session3";

const card = "border border-border bg-card shadow-[0_1px_3px_rgba(15,23,42,0.05)]";
const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.25em] text-gold";

export function SpeakerSessionView({ session }: { session: UpcomingSession }) {
  const s = session.speaker;
  return (
    <>
      <div className={`mt-10 ${card} px-6 py-6 sm:px-10`}>
        <p className={eyebrow}>Guest speaker{s.date ? ` · ${s.date}` : ""}</p>
        <h3 className="mt-2 text-2xl tracking-tight">{s.name}</h3>
        <p className="mt-1 text-sm font-medium text-foreground">{s.roles}</p>
        <p className="mt-3 font-display text-lg italic text-foreground">"{s.talk}"</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
      </div>

      <div className={`mt-8 ${card} px-6 py-6 sm:px-10`}>
        <p className="text-sm leading-relaxed text-muted-foreground">{session.note}</p>
      </div>
    </>
  );
}
