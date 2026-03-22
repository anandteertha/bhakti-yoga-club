import { mediaUrl } from "./constants";

export type EventCategory = "speakers" | "programs" | "wellness";

export type PastEventItem = {
  id: string;
  title: string;
  year: number;
  category: EventCategory;
  description?: string;
  images: readonly { src: string; alt: string }[];
};

const y2016 = (file: string) => mediaUrl(`2016/02/${file}`);

/**
 * Full visual archive — visiting teachers, programs, and wellness events.
 * Every image file from the legacy Past Events gallery is represented here.
 */
export const pastEventGroups: readonly PastEventItem[] = [
  {
    id: "jayadvaita-2015",
    title: "H.H. Jayadvaita Swami — visit",
    year: 2015,
    category: "speakers",
    description: "Talks and association during a campus visit.",
    images: [
      { src: y2016("hh_jayadvaita_maharaj_2015.jpg"), alt: "H.H. Jayadvaita Swami — portrait" },
      { src: y2016("hhjam_talk.jpg"), alt: "H.H. Jayadvaita Swami — talk" },
    ],
  },
  {
    id: "hanumatpresaka-2015",
    title: "H.H. Hanumatpresaka Swami — visit",
    year: 2015,
    category: "speakers",
    description: "Evening with an itinerant teacher in the bhakti tradition.",
    images: [
      { src: y2016("hh_hanumatpreshaka_maharaj_2015.jpg"), alt: "H.H. Hanumatpresaka Swami — 2015" },
    ],
  },
  {
    id: "programs-mm",
    title: "Programs & gatherings",
    year: 2015,
    category: "programs",
    description: "Invitation through closing kīrtan — complete album from the archive.",
    images: [
      { src: y2016("mm_invite.jpg"), alt: "Program invitation" },
      { src: y2016("mm1.jpg"), alt: "Program gathering 1" },
      { src: y2016("mm2.jpg"), alt: "Program gathering 2" },
      { src: y2016("mm3.jpg"), alt: "Program gathering 3" },
      { src: y2016("mm4.jpg"), alt: "Program gathering 4" },
      { src: y2016("mm5.jpg"), alt: "Program gathering 5" },
      { src: y2016("mm6.jpg"), alt: "Program gathering 6" },
      { src: y2016("mm7.jpg"), alt: "Program gathering 7" },
      { src: y2016("mm8.jpg"), alt: "Program gathering 8" },
      { src: y2016("mm9.jpg"), alt: "Program gathering 9" },
    ],
  },
  {
    id: "stress-buster",
    title: "Stress buster",
    year: 2015,
    category: "wellness",
    description: "A wellness-focused evening — poster and group photo.",
    images: [
      { src: y2016("stress_buster.jpg"), alt: "Stress buster — poster" },
      { src: y2016("stress_buster_gr.jpg"), alt: "Stress buster — group" },
    ],
  },
];

export const pastEventsIntro = "Hare Krishna!" as const;

export const categoryLabels: Record<EventCategory, string> = {
  speakers: "Visiting teachers",
  programs: "Programs & gatherings",
  wellness: "Wellness",
};
