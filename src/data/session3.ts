export type SpeakerSession = {
  id: string;
  label: string;
  title: string;
  heading: string;
  badge: string;
  speaker: { name: string; roles: string; date?: string; talk: string; bio: string };
  note: string;
};

export const SESSION3: SpeakerSession = {
  id: "s3",
  label: "Session 3",
  title: "LinkedIn: From SEO to GEO",
  heading: "LinkedIn in the Era of LLM: From SEO to GEO",
  badge: "In progress",
  speaker: {
    name: "Cindy Leong",
    roles: "Head of Scaled Agency Development, APAC · LinkedIn",
    talk: "LinkedIn in the Era of LLM: from SEO to GEO",
    bio: "Leads the Scaled Agency team in APAC, working with independent agencies. Develops strategies to strengthen agencies' capabilities and knowledge, and supports them with tailored resources so they can create more value for their clients on LinkedIn.",
  },
  note: "Recap and quiz coming soon. I'm waiting for the session slides, and I'll add them as soon as I have them.",
};
