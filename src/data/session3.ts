import type { SpeakerInfo } from "@/data/session2";

export type UpcomingSession = {
  id: string;
  label: string;
  /** Page heading shown under the tab. */
  title: string;
  /** Short label used in the tab bar after "Session N — ". */
  tab: string;
  /** Badge shown on the tab (e.g. "In progress", "Soon"). */
  badge: string;
  speaker: SpeakerInfo;
  /** Plain note shown in a card under the speaker block. */
  note: string;
};

export const SESSION3: UpcomingSession = {
  id: "s3",
  label: "Session 3",
  title: "LinkedIn in the Era of LLM: From SEO to GEO",
  tab: "LinkedIn: From SEO to GEO",
  badge: "In progress",
  speaker: {
    name: "Cindy Leong",
    roles: "Head of Scaled Agency Development, APAC · LinkedIn",
    date: "",
    talk: "LinkedIn in the Era of LLM: from SEO to GEO",
    bio: "Leads the Scaled Agency team in APAC, working with independent agencies. Develops strategies to strengthen agencies' capabilities and knowledge, and supports them with tailored resources so they can create more value for their clients on LinkedIn.",
  },
  note: "Recap and quiz coming soon. I'm waiting for the session slides, and I'll add them as soon as I have them.",
};
