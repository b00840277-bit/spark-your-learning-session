import { useState } from "react";
import type { GuestSession, QuizSection } from "@/data/session2";

const L = ["A", "B", "C", "D"];
const card = "border border-border bg-card shadow-[0_1px_3px_rgba(15,23,42,0.05)]";
const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.25em] text-gold";
const btn = "border border-primary bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition hover:bg-primary/90";
const btnGhost = "border border-border bg-background px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition hover:border-gold";

export function GuestSessionView({ session }: { session: GuestSession }) {
  const s = session.speaker;
  const total = session.sections.reduce((n, x) => n + x.questions.length, 0);
  return (
    <>
      <div className={`mt-10 ${card} px-6 py-6 sm:px-10`}>
        <p className={eyebrow}>Guest speaker · {s.date}</p>
        <h3 className="mt-2 text-2xl tracking-tight">{s.name}</h3>
        <p className="mt-1 text-sm font-medium text-foreground">{s.roles}</p>
        <p className="mt-3 font-display text-lg italic text-foreground">"{s.talk}"</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
      </div>

      <div className="mt-10 space-y-8">
        {session.cards.map((c, ci) => (
          <article key={c.title} className={card}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-border px-6 py-5 sm:px-10">
              <span className={eyebrow}>Card {ci + 1}</span>
              <h3 className="text-xl tracking-tight sm:text-2xl">{c.title}</h3>
              {c.subtitle && <span className="w-full text-xs text-muted-foreground">{c.subtitle}</span>}
            </div>
            <div className="px-6 py-6 sm:px-10">
              {c.bullets && (
                <ul className="space-y-2.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden className="font-display text-gold">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {c.minis && (
                <div className="grid gap-4 sm:grid-cols-3">
                  {c.minis.map((m) => (
                    <div key={m.role} className="border border-border bg-background p-4">
                      <h4 className="text-lg tracking-tight">{m.role}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.does}</p>
                      <p className="mt-3 border-l-2 border-gold bg-gold-soft px-3 py-2 text-xs font-medium text-foreground">→ {m.output}</p>
                    </div>
                  ))}
                </div>
              )}
              {c.steps && (
                <ol className="grid gap-3 md:grid-cols-6">
                  {c.steps.map((st) => (
                    <li key={st.n} className={`flex gap-3 border p-3 md:flex-col ${st.human ? "border-gold bg-gold-soft" : "border-border bg-background"}`}>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center border font-display text-sm ${st.human ? "border-gold bg-gold text-primary-foreground" : "border-border bg-card text-gold"}`}>{st.n}</span>
                      <span className="text-xs font-medium leading-relaxed text-foreground">
                        {st.text}
                        {st.human && <span className="mt-1 block text-[10px] font-semibold uppercase tracking-widest text-gold">Human checkpoint</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </article>
        ))}
      </div>

      <section aria-label="Session quiz" className="mt-16 sm:mt-20">
        <div className="flex items-baseline gap-4">
          <h3 className="text-3xl tracking-tight sm:text-4xl">{session.quizTitle}</h3>
          <span className="hidden h-px flex-1 bg-border sm:block" />
          <span className={eyebrow}>{total} Questions</span>
        </div>
        <SectionQuiz key={session.id} sections={session.sections} />
      </section>
    </>
  );
}

function SectionQuiz({ sections }: { sections: QuizSection[] }) {
  const flat = sections.flatMap((s) => s.questions.map((q) => ({ ...q, section: s })));
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(() => flat.map(() => null));
  const [done, setDone] = useState(false);
  const [review, setReview] = useState(false);
  const score = flat.filter((q, k) => picks[k] === q.answer).length;
  const restart = () => { setI(0); setPicks(flat.map(() => null)); setDone(false); setReview(false); };

  if (done) {
    const pct = Math.round((score / flat.length) * 100);
    const verdict = pct === 100 ? "Flawless — you could run this AI marketing team yourself." : pct >= 65 ? "A strong grasp of the session. Review the misses and go again." : "Worth another pass — skim the cards, then retry.";
    return (
      <div className={`mt-10 ${card} px-6 py-12 sm:px-10`}>
        <div className="text-center">
          <p className={eyebrow}>Final Score</p>
          <p className="mt-4 font-display text-7xl tracking-tight text-primary sm:text-8xl">{score}<span className="text-4xl text-muted-foreground sm:text-5xl">/{flat.length}</span></p>
          <div className="mx-auto mt-6 h-px w-16 bg-gold" />
          <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
            {sections.map((s) => {
              const qs = flat.map((q, k) => ({ q, k })).filter((x) => x.q.section.id === s.id);
              const ok = qs.filter((x) => picks[x.k] === x.q.answer).length;
              return (
                <div key={s.id} className="border border-border bg-background p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Section {s.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.title}</p>
                  <p className="mt-1 font-display text-2xl">{ok}/{qs.length}</p>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{verdict}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => setReview((r) => !r)} className={btnGhost}>{review ? "Hide answers" : "Review answers"}</button>
            <button onClick={restart} className={btn}>Retry</button>
          </div>
        </div>
        {review && (
          <ol className="mt-10 space-y-4 border-t border-border pt-8">
            {flat.map((q, k) => {
              const ok = picks[k] === q.answer;
              return (
                <li key={k} className="border-l-2 pl-4" style={{}}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Q{k + 1} · Section {q.section.id}</p>
                  <p className="mt-1 font-medium">{q.q}</p>
                  <p className={`mt-1 text-sm ${ok ? "text-success" : "text-destructive"}`}>
                    {ok ? "✓" : "✗"} Your answer: {picks[k] != null ? `${L[picks[k]!]}) ${q.options[picks[k]!]}` : "—"}
                  </p>
                  {!ok && <p className="text-sm text-success">Correct: {L[q.answer]}) {q.options[q.answer]}</p>}
                  <p className="mt-1 text-sm text-muted-foreground">{q.explanation}</p>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  }

  const q = flat[i]!;
  const picked = picks[i] ?? null;
  const answered = picked !== null;
  const answeredCount = picks.slice(0, i + 1).filter((p) => p !== null).length;

  return (
    <div className={`mt-8 ${card}`}>
      <div className="flex items-center justify-between border-b border-border px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:px-10">
        <span>Question {i + 1} <span className="text-gold">of</span> {flat.length}</span>
        <span>Section {q.section.id} · {q.section.title} · Score {score}</span>
      </div>
      <div className="h-0.5 bg-muted">
        <div className="h-full bg-gold transition-all" style={{ width: `${((i + (answered ? 1 : 0)) / flat.length) * 100}%` }} />
      </div>
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <h4 className="max-w-2xl text-2xl leading-snug tracking-tight sm:text-3xl">{q.q}</h4>
        <div className="mt-7 grid gap-3">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.answer;
            const state = !answered ? "idle" : isCorrect ? "right" : idx === picked ? "wrong" : "dim";
            return (
              <button key={idx} disabled={answered}
                onClick={() => setPicks((p) => p.map((v, k) => (k === i ? idx : v)))}
                className={`flex items-start gap-4 border p-4 text-left transition sm:p-5 ${state === "idle" ? "border-border bg-background hover:border-gold hover:bg-gold-soft/50" : state === "right" ? "border-success bg-success-soft" : state === "wrong" ? "border-destructive bg-destructive-soft" : "border-border bg-background opacity-50"}`}>
                <span aria-hidden className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border font-display text-sm ${state === "right" ? "border-success bg-success text-primary-foreground" : state === "wrong" ? "border-destructive bg-destructive text-primary-foreground" : "border-border bg-card text-gold"}`}>{L[idx]}</span>
                <span className="pt-1 text-sm font-medium leading-relaxed sm:text-base">{opt}</span>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="mt-8 border-t border-border pt-6">
            <p className={`text-sm font-semibold uppercase tracking-[0.15em] ${picked === q.answer ? "text-success" : "text-destructive"}`}>{picked === q.answer ? "Correct" : "Not quite"}</p>
            <div className="mt-3 max-w-2xl border-l-2 border-gold bg-gold-soft/60 px-5 py-4">
              <p className="text-sm leading-relaxed text-foreground">{q.explanation}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{score}/{answeredCount} so far</p>
              <button onClick={() => (i + 1 < flat.length ? setI(i + 1) : setDone(true))} className={btn}>
                {i + 1 < flat.length ? "Next question" : "See my score"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
