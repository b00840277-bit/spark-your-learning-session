import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guest Speaker Hub | ESSEC Digital Platforms" },
      { name: "description", content: "Session recaps and interactive quizzes for the ESSEC Digital Platforms guest speaker series." },
      { property: "og:title", content: "ESSEC Digital Platforms - Guest Speaker Hub" },
      { property: "og:description", content: "A considered recap of each guest speaker session, followed by a quiz to test what stuck." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Question = { part: string; q: string; options: string[]; answer: number; explanation: string };
type Bullet = { term: string; desc: string };
type SummaryItem = { title: string; body?: string; bullets?: Bullet[]; note?: string };
type SummaryCard = { part: string; heading: string; items: SummaryItem[] };
type Session = { id: string; label: string; title: string; active: boolean; summary?: SummaryCard[]; questions?: Question[] };

const SESSION1_SUMMARY: SummaryCard[] = [
  {
    part: "Part One",
    heading: "Front-End Design, Prompting & Workflow",
    items: [
      {
        title: "The Art of Prompting",
        body: "Moving beyond generic prompts like \"build a website\" to structured prompts that specify Role, Goal, Target Audience, Core Pages, Visual Style, Output Structure, and Key Features.",
      },
      {
        title: "Visual Shell & Handoff",
        body: "Build the visual front-end shell using Claude Design without writing any code, then use 'Handoff to Claude Code' to export the visual design into an execution engine.",
      },
      {
        title: "Agentic Coding with Claude Code",
        body: "A terminal-based coding agent able to inspect a full codebase, execute system shell commands, run automated routines and pipelines, perform global refactoring, and maintain session context memory trees across work cycles.",
      },
      {
        title: "Deployment Options",
        body: "Run locally via localhost, zip the static files for Tiiny.host, or wire up automated continuous deployment through Vercel.",
      },
    ],
  },
  {
    part: "Part Two",
    heading: "The Web File Triad, Version Control & Vercel",
    items: [
      {
        title: "The Core Web Triad",
        bullets: [
          { term: "index.html", desc: "Defines the text and structure — headings, paragraphs, and buttons." },
          { term: "styles.css", desc: "Controls visual appearance, colour palette, typography, and responsive mobile/desktop layouts." },
          { term: "script.js", desc: "Handles interactivity, click events, and dynamic behaviour." },
        ],
      },
      {
        title: "Version Control on GitHub",
        body: "Projects live in Repositories for cloud storage, sharing, and team collaboration. The key Git concepts:",
        bullets: [
          { term: "Fork", desc: "copying another user's repository to your account." },
          { term: "Clone", desc: "downloading a remote repository to your local machine." },
          { term: "Commit", desc: "saving a local snapshot with a descriptive message." },
          { term: "Push", desc: "uploading local commits straight to GitHub." },
          { term: "Pull Request (PR) & Merge", desc: "proposing changes for peer review before merging into the main branch." },
        ],
      },
      {
        title: "Continuous Deployment with Vercel",
        body: "Connect a GitHub repository directly to Vercel for instant live site updates on every Push, with automatic preview links for PRs.",
        note: "Lovable shortcut: Settings → GitHub → Connect handles repository creation and real-time synchronisation automatically.",
      },
    ],
  },
  {
    part: "Part Three",
    heading: "Static Site Limitations, Authentication & Supabase",
    items: [
      {
        title: "Limits of Static Sites",
        body: "No persistent session memory — user state is forgotten the moment tabs close (think of a Wordle clone) — and no way to fetch live external dynamic data.",
      },
      {
        title: "Authentication & Tokens",
        bullets: [
          { term: "Sign Up", desc: "creates a new user row with an email and an encrypted password." },
          { term: "Log In", desc: "verifies credentials and issues a temporary session Token — a digital pass that authenticates requests without repeated password entries." },
          { term: "Log Out", desc: "discards the token from browser memory." },
        ],
      },
      {
        title: "Supabase (BaaS)",
        body: "An open-source Backend-as-a-Service providing authentication, user verification, and relational databases. Natively connected with GitHub, Vercel, and Lovable for full-stack web applications.",
      },
    ],
  },
];

const SESSIONS: Session[] = [
  {
    id: "s1",
    label: "Session 1",
    title: "Vibe Coding & Web Dev",
    active: true,
    summary: SESSION1_SUMMARY,
    questions: [
      {
        part: "Part One",
        q: "What is the primary advantage of a structured prompt over a generic request when designing a web app?",
        options: [
          "It speeds up internet connection.",
          "It clearly defines Role, Goal, Target Audience, Visual Style, and Features to avoid generic AI outputs.",
          "It automatically writes CSS files without AI.",
          "It bypasses GitHub authorization.",
        ],
        answer: 1,
        explanation: "A structured prompt spells out Role, Goal, Target Audience, Core Pages, Visual Style, Output Structure, and Key Features — so the AI output matches your intent instead of a generic template.",
      },
      {
        part: "Part One",
        q: "How does 'Handoff to Claude Code' connect Claude Design to the building phase?",
        options: [
          "It converts the design directly into a PDF report.",
          "It exports the finished visual shell directly into Claude Code to generate the functional site code.",
          "It uploads the site to a public domain automatically.",
          "It creates a Supabase database table.",
        ],
        answer: 1,
        explanation: "Claude Design builds the visual shell without code; Handoff exports that design into Claude Code, which then generates the functional site code.",
      },
      {
        part: "Part Two",
        q: "Which file would you modify to change the colour and desktop/mobile layout of a navigation button?",
        options: ["index.html", "script.js", "styles.css", "database.sql"],
        answer: 2,
        explanation: "styles.css controls visual appearance, the colour palette, typography, and the responsive mobile/desktop layouts — structure lives in index.html, behaviour in script.js.",
      },
      {
        part: "Part Two",
        q: "What is the key distinction between GitHub and Vercel in the deployment workflow?",
        options: [
          "GitHub hosts live websites, while Vercel stores raw code files.",
          "GitHub stores code files and history, while Vercel reads the repository and deploys it live on every Push.",
          "Both perform identical tasks with no differences.",
          "Vercel is only used for editing HTML text.",
        ],
        answer: 1,
        explanation: "GitHub is the repository — code and history, shared and reviewed with the team. Vercel reads that repository and deploys it live, updating automatically on every Push.",
      },
      {
        part: "Part Three",
        q: "What is a session 'Token' in web authentication?",
        options: [
          "A permanent password stored on the desktop.",
          "A temporary digital pass issued upon Log In so the browser can authenticate subsequent requests without re-asking for the password.",
          "A physical security key required to access GitHub.",
          "A script that styles buttons in CSS.",
        ],
        answer: 1,
        explanation: "Log In verifies credentials and issues a temporary token; it authenticates each request without repeated password entries, and Log Out simply discards it from browser memory.",
      },
      {
        part: "Part Three",
        q: "Why is a Backend-as-a-Service like Supabase necessary for modern web applications?",
        options: [
          "To increase CSS animation speeds.",
          "To provide user authentication, databases, and persistent state that static sites lack.",
          "To replace GitHub repositories.",
          "To host static HTML pages without a browser.",
        ],
        answer: 1,
        explanation: "Static sites forget user state and cannot fetch live data. Supabase adds authentication, user verification, and relational databases — natively connected with GitHub, Vercel, and Lovable.",
      },
    ],
  },
  { id: "s2", label: "Session 2", title: "Guest Speaker", active: false },
  { id: "s3", label: "Session 3", title: "Guest Speaker", active: false },
  { id: "s4", label: "Session 4", title: "Guest Speaker", active: false },
];

const OPTION_LETTERS = ["A", "B", "C", "D"];

function Index() {
  const [tab, setTab] = useState(SESSIONS[0]!.id);
  const current = SESSIONS.find((s) => s.id === tab)!;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-5 pt-5 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            ESSEC Business School · MMD
          </p>
          <h1 className="mt-1 text-2xl tracking-tight sm:text-3xl">
            The Digital Platforms Hub
          </h1>
          <nav className="mt-4 flex gap-6 overflow-x-auto" role="tablist">
            {SESSIONS.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={tab === s.id}
                disabled={!s.active}
                onClick={() => setTab(s.id)}
                className={`shrink-0 whitespace-nowrap border-b-2 pb-3 pt-1 text-sm font-semibold tracking-wide transition ${
                  tab === s.id
                    ? "border-gold text-foreground"
                    : s.active
                      ? "border-transparent text-muted-foreground hover:text-foreground"
                      : "cursor-not-allowed border-transparent text-muted-foreground/60"
                }`}
              >
                {s.label} — {s.title}
                {!s.active && <span className="ml-2 text-xs font-medium uppercase tracking-widest text-gold">Soon</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">{current.label}</p>
          <h2 className="mt-2 text-4xl leading-tight tracking-tight sm:text-5xl">{current.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A considered recap of what the session covered, drawn strictly from the course presentation — then a short
            quiz below to see what stuck.
          </p>
        </div>

        {current.summary && <SummaryCards cards={current.summary} />}

        {current.questions && (
          <section aria-label="Session quiz" className="mt-16 sm:mt-20">
            <div className="flex items-baseline gap-4">
              <h3 className="text-3xl tracking-tight sm:text-4xl">Test Yourself</h3>
              <span className="hidden h-px flex-1 bg-border sm:block" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                {current.questions.length} Questions
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              One question for each core concept. Pick an answer for instant feedback and a full explanation.
            </p>
            <Quiz key={current.id} questions={current.questions} />
          </section>
        )}
      </main>

      <footer className="border-t border-border py-8">
        <p className="mx-auto max-w-4xl px-5 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:px-8">
          ESSEC MMD · Digital Platforms · Guest Speaker Series
        </p>
      </footer>
    </div>
  );
}

function SummaryCards({ cards }: { cards: SummaryCard[] }) {
  return (
    <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-12">
      {cards.map((card) => (
        <article key={card.part} className="border border-border bg-card shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-6 py-5 sm:px-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">{card.part}</span>
            <h3 className="w-full text-xl tracking-tight sm:w-auto sm:flex-1 sm:text-2xl">{card.heading}</h3>
          </div>
          <div className="grid gap-x-10 gap-y-8 px-6 py-8 sm:grid-cols-2 sm:px-10">
            {card.items.map((item) => (
              <div key={item.title}>
                <h4 className="text-lg tracking-tight">{item.title}</h4>
                {item.body && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>}
                {item.bullets && (
                  <dl className="mt-3 space-y-2.5">
                    {item.bullets.map((b) => (
                      <div key={b.term} className="grid gap-0.5 pl-4">
                        <dt className="text-sm font-semibold text-foreground">
                          <span aria-hidden className="mr-2 font-display text-gold">·</span>
                          <code className="font-sans">{b.term}</code>
                        </dt>
                        <dd className="text-sm leading-relaxed text-muted-foreground">{b.desc}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {item.note && (
                  <p className="mt-3 border-l-2 border-gold bg-gold-soft px-3 py-2 text-xs leading-relaxed font-medium text-foreground">
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function Quiz({ questions }: { questions: Question[] }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict =
      pct === 100
        ? "Flawless — every concept, from prompting to Supabase, is yours."
        : pct >= 65
          ? "A strong grasp of the session. Review the explanations above and go again."
          : "Worth another pass — skim the recap, then try the quiz once more.";
    return (
      <div className="mt-10 border border-border bg-card px-6 py-14 text-center shadow-[0_1px_3px_rgba(15,23,42,0.05)] sm:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Final Score</p>
        <p className="mt-4 font-display text-7xl tracking-tight text-primary sm:text-8xl">
          {score}
          <span className="text-4xl text-muted-foreground sm:text-5xl">/{questions.length}</span>
        </p>
        <div className="mx-auto mt-6 h-px w-16 bg-gold" />
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{verdict}</p>
        <button
          onClick={restart}
          className="mt-8 border border-primary bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition hover:bg-primary/90"
        >
          Take it again
        </button>
      </div>
    );
  }

  const q = questions[i]!;
  const answered = picked !== null;

  return (
    <div className="mt-8 border border-border bg-card shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between border-b border-border px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:px-10">
        <span>
          Question {i + 1} <span className="text-gold">of</span> {questions.length}
        </span>
        <span>
          {q.part} · Score {score}
        </span>
      </div>
      <div className="h-0.5 bg-muted">
        <div className="h-full bg-gold transition-all" style={{ width: `${((i + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <h4 className="max-w-2xl text-2xl leading-snug tracking-tight sm:text-3xl">{q.q}</h4>

        <div className="mt-7 grid gap-3">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.answer;
            const state = !answered ? "idle" : isCorrect ? "right" : idx === picked ? "wrong" : "dim";
            return (
              <button
                key={idx}
                disabled={answered}
                onClick={() => { setPicked(idx); if (isCorrect) setScore((s) => s + 1); }}
                className={`flex items-start gap-4 border p-4 text-left transition sm:p-5 ${
                  state === "idle"
                    ? "border-border bg-background hover:border-gold hover:bg-gold-soft/50"
                    : state === "right"
                      ? "border-success bg-success-soft"
                      : state === "wrong"
                        ? "border-destructive bg-destructive-soft"
                        : "border-border bg-background opacity-50"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border font-display text-sm ${
                    state === "right"
                      ? "border-success bg-success text-white"
                      : state === "wrong"
                        ? "border-destructive bg-destructive text-white"
                        : "border-border bg-card text-gold"
                  }`}
                >
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="pt-1 text-sm font-medium leading-relaxed sm:text-base">{opt}</span>
                {state === "right" && <span className="ml-auto hidden pt-1 text-success sm:block">✓</span>}
                {state === "wrong" && <span className="ml-auto hidden pt-1 text-destructive sm:block">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-8 border-t border-border pt-6">
            <p className={`text-sm font-semibold uppercase tracking-[0.15em] ${picked === q.answer ? "text-success" : "text-destructive"}`}>
              {picked === q.answer ? "Correct" : "Not quite"}
            </p>
            <div className="mt-3 max-w-2xl border-l-2 border-gold bg-gold-soft/60 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Why</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{q.explanation}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {score}/{i + 1} so far
              </p>
              <button
                onClick={() => { if (i + 1 < questions.length) { setI(i + 1); setPicked(null); } else setDone(true); }}
                className="border border-primary bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition hover:bg-primary/90"
              >
                {i + 1 < questions.length ? "Next question" : "See my score"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
