import { mediaUrl } from "./constants";

export type VisitingProfile = {
  name: string;
  image: string;
  imageAlt: string;
  paragraphs: readonly string[];
  link?: { label: string; href: string };
};

export const visitingMonks: readonly VisitingProfile[] = [
  {
    name: "H.H. Hanumatpresaka Swami",
    image: mediaUrl("2016/02/hh_hanumatpreshaka_maharaj.jpg"),
    imageAlt: "H.H. Hanumatpresaka Swami",
    paragraphs: [
      "H.H. Hanumatpresaka Swami grew up in California. He graduated first in psychology at UC Davis (1970), with minors in biology and electrical engineering, then began doctoral work at Northwestern. With his mentor’s blessing, he turned east in search of deeper knowledge.",
      "Along the way he earned a black belt in Okinawan karate and, in 1974, received initiation from Śrīla Prabhupāda. He served extensively in San Francisco and later with Bhakti-svarūpa Dāmodara Swami at the Bhaktivedanta Institute.",
      "A bhakti-yogī for more than forty years, he founded the North American Institute for Oriental and Classical Studies, teaches as a visiting professor in Peru, and supports educational programs across the Americas, Europe, and India.",
    ],
  },
  {
    name: "H.H. Jayadvaita Swami",
    image: mediaUrl("2016/02/hh_jayadvaita_maharaj.jpg"),
    imageAlt: "H.H. Jayadvaita Swami",
    paragraphs: [
      "Jayādvaita Swami — writer, editor, publisher, and teacher — is an initiated disciple of Śrīla Prabhupāda, ISKCON’s Founder-Ācārya.",
      "His writing goes straight to life’s largest questions. As an editor he has shaped dozens of classic volumes. He directs the African division of the Bhaktivedanta Book Trust. As a teacher he travels constantly — clear, learned, and often unexpectedly funny.",
    ],
    link: { label: "jswami.info", href: "http://www.jswami.info/" },
  },
  {
    name: "H.G. Brajananda Prabhu",
    image: mediaUrl("2016/02/brajananda_pr.jpg"),
    imageAlt: "H.G. Brajananda Prabhu",
    paragraphs: [
      "Brajananda Prabhu is a musician by training. He visits universities across the U.S. to share how bhakti-yoga works in practice.",
      "He is an initiated disciple of H.H. Radhanātha Swami.",
    ],
  },
];
