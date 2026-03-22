import { mediaUrl } from "./constants";

/** Decorative rule used across legacy pages. */
export const vineDividerSrc = mediaUrl("2016/02/divider_vine.jpg");

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

/** Club poster & branding from the legacy home page. */
export const homeHeroAssets: GalleryImage[] = [
  {
    src: mediaUrl("2014/08/cropped-bhaktiyogaclubposter04oct.jpg"),
    alt: "Bhakti Yoga Club poster",
    caption: "Club poster",
  },
  {
    src: mediaUrl("2014/09/bycs.jpg"),
    alt: "SEVA Bhakti Yoga Club group photo",
    caption: "SEVA · Bhakti Yoga Club",
  },
];

/** Registration table and campus moments (legacy home). */
export const homeCampusMoments: GalleryImage[] = [
  {
    src: mediaUrl("2014/09/img_13291.jpg"),
    alt: "Campus outreach",
    caption: "On campus",
  },
  {
    src: mediaUrl("2014/09/img_13321.jpg"),
    alt: "Club members at a table",
    caption: "Meet us at the table",
  },
  {
    src: mediaUrl("2014/09/img_13351.jpg"),
    alt: "Discussion with students",
    caption: "Conversations that matter",
  },
  {
    src: mediaUrl("2014/09/reg11.jpg"),
    alt: "Registration and signup",
    caption: "Sign up & say hello",
  },
  {
    src: mediaUrl("2014/09/reg21.jpg"),
    alt: "Club materials on display",
    caption: "Take a flyer",
  },
  {
    src: mediaUrl("2014/09/reg31.jpg"),
    alt: "Students at the club table",
    caption: "Community table",
  },
];

/** Themes echoed across the legacy gallery — paired with each meet photo in order. */
const meetThemes = [
  "Kīrtan and quiet minds",
  "Study, laughter, prasādam",
  "Bhakti yoga — a practical science",
  "Mantra with music",
  "Friends from every background",
  "Discussion after class",
  "Campus family",
  "Absorbed in saṅkīrtan",
  "New faces, warm welcome",
  "Questions welcome",
  "From stress to stillness",
  "Vegetarian dinner together",
  "SEVA BYC",
  "Clubs like this across universities",
  "Invitation to one and all",
  "Enriching discussions",
  "Bhakti yogis in kīrtan",
  "Heart, mind, soul — peaceful",
  "Joy in practice",
] as const;

const meetFiles = [
  "meet1.jpg",
  "meet2.jpg",
  "meet3.jpg",
  "meet4.jpg",
  "meet6o.jpg",
  "meet7.jpg",
  "meet8.jpg",
  "meet9.jpg",
  "meet10.jpg",
  "meet11.jpg",
  "meet12.jpg",
  "meet13.jpg",
  "meet14.jpg",
  "meet15.jpg",
  "meet16.jpg",
  "meet17.jpg",
  "meet18.jpg",
  "meet19.jpg",
  "meet20.jpg",
] as const;

/** Full legacy home-page meet strip — every image. */
export const communityMeetPhotos: GalleryImage[] = meetFiles.map((file, i) => ({
  src: mediaUrl(`2016/02/${file}`),
  alt: `Bhakti Yoga Club gathering — photo ${i + 1}`,
  caption: meetThemes[i] ?? "Bhakti Yoga Club",
}));

/** Extra single images that appeared on the legacy home. */
export const homeFeatureStills: GalleryImage[] = [
  {
    src: mediaUrl("2016/02/enriching_discussions.jpg"),
    alt: "Group discussion at the club",
    caption: "Enriching discussions",
  },
  {
    src: mediaUrl("2016/02/krishna_naam.jpg"),
    alt: "Kṛṣṇa nāma — chanting",
    caption: "The holy name",
  },
  {
    src: mediaUrl("2014/08/paris-vyasasana-pranamas.jpg"),
    alt: "Offering respects — practice",
    caption: "Lineage & practice",
  },
];

/** About page — atmosphere & prasādam (legacy About + shared uploads). */
export const aboutGallery: GalleryImage[] = [
  {
    src: mediaUrl("2014/09/deep_contemplation.jpg"),
    alt: "Meditative moment at the club",
    caption: "Space to reflect",
  },
  {
    src: mediaUrl("2014/09/prasadamplate1.jpg"),
    alt: "Vegetarian prasādam",
    caption: "Blessed food together",
  },
  {
    src: mediaUrl("2014/09/byc_tree1.jpg"),
    alt: "Outdoor gathering",
    caption: "Under the trees",
  },
  {
    src: mediaUrl("2014/09/byc_card.jpg"),
    alt: "Club card and information",
    caption: "Take a card",
  },
  {
    src: mediaUrl("2014/09/byc_tree-copy.jpg"),
    alt: "Community outdoors",
    caption: "Friends & well-wishers",
  },
];
