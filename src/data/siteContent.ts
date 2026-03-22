import { FACEBOOK_EVENTS, LEGACY_SITE } from "./constants";
import { assetUrl } from "@/lib/assetUrl";

export const club = {
  name: "SEVA Bhakti Yoga Club @ NCSU",
  tagline: "A fresh look at an ancient practice",
} as const;

/** Official circular mark — file in /public */
export const brand = {
  logoSrc: assetUrl("/brand-logo.png"),
  logoAlt:
    "SEVA Bhakti Yoga Club — North Carolina State University: Hare Krishna mantra, lotus emblem, and club wordmark",
} as const;

export const meeting = {
  when: "6:30pm on Wednesdays",
  where: "Cox Hall, room 200",
  who: "All of You!",
} as const;

export const contacts = {
  newsletter: {
    label: "Simone Panja",
    email: "spanja@ncsu.edu",
    description: "Subscribe to the newsletter by writing to",
  },
  feedback: {
    email: "hp4t@virginia.edu",
    line:
      "Write to hp4t@virginia.edu for posting feedback. Let us know how we can serve you better.",
  },
} as const;

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Visiting Monks", to: "/visiting-monks" },
  { label: "Courses offered", to: "/courses-offered" },
  { label: "Cooking Classes", to: "/cooking-classes" },
  { label: "Past Events", to: "/past-events" },
] as const;

export const rsvp = {
  label: "RSVP on Facebook",
  href: FACEBOOK_EVENTS,
} as const;

/** Optional: older posts & comments until fully migrated. */
export const legacyWordPress = {
  label: "Legacy WordPress archive",
  href: LEGACY_SITE,
} as const;
