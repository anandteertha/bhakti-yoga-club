import type { ClubEventRecord } from "@/types/clubEvent";

/** Today as YYYY-MM-DD in the viewer's local timezone. */
export function getLocalDateString(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Last calendar day of the event (inclusive). */
export function getEventEndDateString(event: ClubEventRecord): string {
  return event.endDate?.trim() || event.date;
}

/**
 * Past when today is strictly after the last day of the event
 * (so the last day still counts as current/upcoming).
 */
export function isEventPast(event: ClubEventRecord, today = getLocalDateString()): boolean {
  return today > getEventEndDateString(event);
}

export function getUpcomingEvents(events: readonly ClubEventRecord[]): ClubEventRecord[] {
  return events
    .filter((e) => !isEventPast(e))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(events: readonly ClubEventRecord[]): ClubEventRecord[] {
  return events
    .filter((e) => isEventPast(e))
    .sort((a, b) => getEventEndDateString(b).localeCompare(getEventEndDateString(a)));
}

export function getEventBySlug(
  events: readonly ClubEventRecord[],
  slug: string | undefined,
): ClubEventRecord | undefined {
  if (!slug) return undefined;
  return events.find((e) => e.slug === slug);
}

export function formatEventDateRange(event: ClubEventRecord): string {
  const start = event.date;
  const end = event.endDate?.trim();
  if (!end || end === start) {
    return start;
  }
  return `${start} → ${end}`;
}
