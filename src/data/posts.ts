import { LEGACY_SITE, mediaUrl } from "./constants";

export type Post = {
  slug: string;
  title: string;
  wpUrl: string;
  datePosted: string;
  dateUpdated?: string;
  heroImage: string;
  heroAlt: string;
  excerpt?: string;
  body?: readonly string[];
  externalLink?: { label: string; href: string };
};

const wp = (path: string) => `${LEGACY_SITE.replace(/\/$/, "")}${path}`;

export const posts: readonly Post[] = [
  {
    slug: "unravel-the-secrets-of-yoga",
    title: "Unravel the secrets of yoga…",
    wpUrl: wp("/2015/01/06/unravel-the-secrets-of-yoga/"),
    datePosted: "2015-01-06",
    dateUpdated: "2015-01-09",
    heroImage: mediaUrl("2015/01/home1.png"),
    heroAlt: "Illustration from the club archive",
    excerpt: "A visual note from the archives — yoga as practical, joyful, and deeply personal.",
  },
  {
    slug: "srila-prabhupada",
    title: "Bhakti yoga ambassador to the west: Śrīla Prabhupāda",
    wpUrl: wp("/2014/08/27/srila-prabhupada/"),
    datePosted: "2014-08-27",
    dateUpdated: "2014-09-27",
    heroImage: mediaUrl("2014/08/paris-vyasasana-pranamas.jpg"),
    heroAlt: "Offering respects — image from the club archive",
    excerpt: "How genuine spiritual guidance accelerates growth — and the paramparā that carries bhakti-yoga forward.",
    body: [
      "In order to become proficient in anything complex and significant, one requires assistance. Training with a skilled practitioner speeds up advancement. The science of Bhakti yoga has been, and continues to be, transmitted via the guru, or spiritual master, in an unbroken succession of teachers as indicated in Bhagavad-gita, evam parampara praptam, imam rajarsayo vidhuh. His Divine Grace, A. C. Bhaktivedanta Swami Prabhupada, a spiritual master in the disciplic line tracing its origins back to Krsna, brought the science of Bhakti Yoga to the West.",
    ],
    externalLink: {
      label: "Further reading (linked from the original post)",
      href: "http://www.bhaktivedantacenter.com/wp/uva-bhakti-yoga-club/srila-prabhupada/",
    },
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
