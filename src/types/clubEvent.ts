import type { EventCategory } from "@/data/pastEvents";

/**
 * One club event — loaded from `src/content/events.json`.
 * Dates are local calendar days in `YYYY-MM-DD` form.
 */
export type ClubEventRecord = {
  slug: string;
  title: string;
  /** First day of the event (required). */
  date: string;
  /** Last day for multi-day events; omit for a single day. */
  endDate?: string | null;
  /** Display time, e.g. "6:30 PM" — free text. */
  time?: string | null;
  summary: string;
  /** Longer copy; use blank lines between paragraphs for breaks. */
  description: string;
  location?: string | null;
  category: EventCategory;
  /** Optional hero for cards and top of detail page. */
  coverImage?: string | null;
  /** Photo gallery — paths under `public/` e.g. `/events/my-event/1.jpg`. */
  gallery: readonly { src: string; alt: string }[];
  rsvpUrl?: string | null;
};

export type EventsFile = {
  events: ClubEventRecord[];
};
