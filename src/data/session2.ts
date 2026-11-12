export type SpeakerInfo = { name: string; roles: string; date: string; talk: string; bio: string };
export type MiniCard = { role: string; does: string; output: string };
export type Step = { n: number; text: string; human?: boolean };
export type ContentCard = {
  title: string;
  bullets?: string[];
  minis?: MiniCard[];
  steps?: Step[];
  subtitle?: string;
};
export type SectionQuestion = { q: string; options: string[]; answer: number; explanation: string };
export type QuizSection = { id: string; title: string; questions: SectionQuestion[] };
export type GuestSession = {
  id: string;
  label: string;
  title: string;
  speaker: SpeakerInfo;
  cards: ContentCard[];
  quizTitle: string;
  sections: QuizSection[];
};

export const SESSION2: GuestSession = {
  id: "s2",
  label: "Session 2",
  title: "Building an AI Marketing Team",
  speaker: {
    name: "Nick Goh",
    roles: "CEO, INSPIRO Consulting · CMO, Yellow Pages Singapore · Marketing Lead, YP Academy",
    date: "30 October 2026",
    talk: "Building an AI Marketing Team: a lite agentic workflow with Claude",
    bio: "Agency leadership at Lowe & Partners and Euro RSCG (now Havas); brands incl. SAP, Red Hat, Prudential, UOB; MSc Marketing (King's College London); judge at Effie Awards Singapore.",
  },
  cards: [
    {
      title: "Why now: the agency shift",
      bullets: [
        "WPP folding Ogilvy, VML and AKQA into a single creative banner.",
        "Getty Images filed for US bankruptcy and advanced a restructuring plan.",
        "Reuters: companies cutting jobs as investment shifts toward AI.",
      ],
    },
    {
      title: "The lite agentic workflow",
      bullets: [
        "An AI \"team\" run inside a Claude Project: each chat = one team role, all sharing the Project's knowledge base.",
        "Reusable Skills (each a SKILL.md with purpose, when to use, inputs needed) are called with a slash command, e.g. /marketing-brief-builder.",
        "Email trigger: a scheduled task runs the Marketing Brief Builder daily on incoming briefs (Gmail), producing a draft brief.",
      ],
    },
    {
      title: "Planning team",
      minis: [
        { role: "Brief Writer", does: "Drafts the brief from Project context; needs goal, audience, budget, timing.", output: "Draft brief" },
        { role: "Brief Validator", does: "Critiques the brief in a fresh chat; checks objective, audience, message, metric.", output: "Verdict and top fixes" },
        { role: "Strategist", does: "Digests the validated brief and develops the Big Idea.", output: "Big Idea one-pager" },
      ],
    },
    {
      title: "Production team",
      minis: [
        { role: "Designer / Art Director", does: "Creates the key visuals, using connectors such as Higgsfield.", output: "KV concepts and assets" },
        { role: "Copywriter", does: "Builds the messaging hierarchy and adapts it per channel and platform.", output: "Channel-by-channel copy" },
        { role: "Reviewer", does: "Checks work against brand voice; confirms it delivers the brief and Big Idea.", output: "Edits and sign-off" },
      ],
    },
    {
      title: "The handoff chain",
      steps: [
        { n: 1, text: "Brief Writer drafts the brief" },
        { n: 2, text: "Brief Validator (new chat, fresh eyes)" },
        { n: 3, text: "Strategist shapes the Big Idea" },
        { n: 4, text: "YOU approve and save to the knowledge base", human: true },
        { n: 5, text: "Designer + Copywriter (KVs via Higgsfield, plus channel messaging)" },
        { n: 6, text: "Reviewer checks brand voice" },
      ],
    },
    {
      title: "Live case: Louis Vuitton \"Terra\"",
      subtitle: "Fictional launch · Project \"LVMH AI Marketing Team\"",
      bullets: [
        "Flow: Marketing Brief Builder → brief revision → Research & Strategy foundation → Messaging Hierarchy → Key Visuals (ChatGPT + Higgsfield / Cinema Studio) → Instagram Story and post.",
        "Creative idea: \"Nothing to explain.\" — Story frames: \"Terra. Louis Vuitton craft, since 1854.\" → \"Discover Terra.\"",
        "Creative Review Scorer: 3-frame Story scored 5.7/10 (BBH 5, Ogilvy 6, McCann 6); a hand-on-clasp close-up scored 6.7/10 (BBH 6, Ogilvy 7, McCann 7).",
        "Flagged weakness: the desert-safari setting works against the research, since LV already over-indexes on explorer/travel content.",
      ],
    },
    {
      title: "Takeaways",
      bullets: [
        "Roles beat one giant prompt: small specialised chats, one job each.",
        "Fresh-eyes review and the human approval step keep quality and judgment in the loop.",
        "Scoring creative work with explicit lenses turns feedback into measurable iteration.",
      ],
    },
  ],
  quizTitle: "Test yourself — Session 2",
  sections: [
    {
      id: "A",
      title: "Workflow & Setup",
      questions: [
        { q: "In the lite agentic workflow, how are the team roles separated?", options: ["Each role is a separate client account", "Each role is a backup copy of the previous chat", "Each chat in the Claude Project acts as one team role", "Each role runs on a different Claude model"], answer: 2, explanation: "One chat = one role, all drawing on the Project's shared knowledge base." },
        { q: "Which sections appear in the Marketing Brief Builder SKILL.md shown in the talk?", options: ["Purpose, When to use, Inputs needed", "Budget, Invoice, Contract", "Hashtags, Alt text, Captions", "Prompt, Temperature, Token limit"], answer: 0, explanation: "A Skill packages purpose, trigger conditions and required inputs, and is invoked with a slash command." },
        { q: "Which news stories framed the shift in the agency world at the start of the talk?", options: ["Nike's rebrand, Meta layoffs, Spotify price rise", "Google antitrust, Apple event, Tesla recall", "Omnicom IPO, Publicis acquisition, TikTok ban", "WPP folding Ogilvy, VML and AKQA into one banner; Getty Images' bankruptcy filing; companies cutting jobs as investment shifts toward AI"], answer: 3, explanation: "All three headlines show agencies and creative businesses restructuring around AI." },
      ],
    },
    {
      id: "B",
      title: "The Handoff Chain",
      questions: [
        { q: "Why does the Brief Validator work in a new chat?", options: ["To save tokens", "To review the brief with fresh eyes, free from the Writer's context", "To publish the brief faster", "Because Claude limits chats to one role per day"], answer: 1, explanation: "A new chat gives an independent critique rather than the Writer grading its own work." },
        { q: "What does the Brief Validator check?", options: ["Logo, font, colour, layout", "Budget, tax, legal, shipping", "Objective, audience, message, metric", "Hashtags, alt text, captions"], answer: 2, explanation: "The output is a verdict plus the top fixes on those four points." },
        { q: "What is the Strategist's output?", options: ["A Big Idea one-pager", "Final video assets", "A media invoice", "Channel-by-channel copy"], answer: 0, explanation: "The Strategist digests the validated brief and shapes the Big Idea; copy comes later from the Copywriter." },
        { q: "Which step belongs to the human in the chain, before production starts?", options: ["Drafting the brief", "Generating the key visuals", "Scoring creativity", "Approving the work and saving it to the knowledge base"], answer: 3, explanation: "Step 4 is the human checkpoint: approved outputs become context for the next roles." },
      ],
    },
    {
      id: "C",
      title: "Live Case: LV \"Terra\"",
      questions: [
        { q: "What fictional brief ran through the live demo?", options: ["A Gucci perfume campaign", "A Dior store opening", "The social media launch of Louis Vuitton's \"Terra\" handbag", "An Hermès scarf relaunch"], answer: 2, explanation: "The Project \"LVMH AI Marketing Team\" built the Terra launch end to end." },
        { q: "How does the Creative Review Scorer skill rate creative work?", options: ["A creativity score out of 10 through three agency lenses (BBH, Ogilvy, McCann)", "A legal pass/fail verdict", "A forecast of likes and shares", "A ranking by production cost"], answer: 0, explanation: "Each lens gives its own score, plus strengths, weaknesses and suggestions." },
        { q: "What weakness did the Reviewer flag in the 3-frame Story (5.7/10)?", options: ["The caption was far too long", "The desert-safari setting clashed with the research, since LV already over-indexes on explorer/travel content", "The hashtags were missing", "The bag appeared in only one frame"], answer: 1, explanation: "The creative contradicted the research; the higher-scoring concept (6.7/10) was a refined close-up of a hand on the clasp." },
      ],
    },
  ],
};
