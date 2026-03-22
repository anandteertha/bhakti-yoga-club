/**
 * Editorial copy for the About page — concise, scannable, true to the club’s mission at NCSU.
 */

export type AboutSection = {
  title: string;
  /** One short hook under the title. */
  lead?: string;
  paragraphs?: readonly string[];
  bullets?: readonly { title: string; text: string }[];
};

export const aboutSections: readonly AboutSection[] = [
  {
    title: "Higher learning, inward too",
    lead: "Between classes and career prep, college is a rare window to ask bigger questions — with honest company.",
    paragraphs: [
      "SEVA Bhakti Yoga Club is a registered student organization at NC State. We’re here for students and community members who want more than grades alone: clarity about purpose, lasting peace, and a sane rhythm for the week.",
    ],
  },
  {
    title: "What is Bhakti Yoga?",
    paragraphs: [
      "Bhakti means devotion — directed, intelligent love for the Supreme. Bhakti-yoga is the path of connecting the heart through mantra, wisdom, and service. You don’t need flexibility or prior experience; you need curiosity and sincerity.",
      "Our study centers on the Bhagavad-gītā — nonsectarian principles that have shaped thinkers from Emerson to Eliot. We read carefully, discuss openly, and let the text speak to daily life.",
    ],
  },
  {
    title: "What a Wednesday looks like",
    bullets: [
      {
        title: "Kīrtan",
        text: "Call-and-response mantra meditation with music — joyfully simple.",
      },
      {
        title: "Class & discussion",
        text: "A Bhagavad-gītā verse, unpacked together — bring questions.",
      },
      {
        title: "Prasādam",
        text: "Free vegetarian dinner — sanctified food, shared around a table.",
      },
      {
        title: "No fees",
        text: "The club does not charge membership dues.",
      },
    ],
  },
  {
    title: "Who it’s for",
    paragraphs: [
      "If you’re carrying stress, searching for meaning, or simply want warm community on campus — you’re welcome. Come once or every week; stay for the conversation or quietly soak in the sound.",
    ],
  },
];
