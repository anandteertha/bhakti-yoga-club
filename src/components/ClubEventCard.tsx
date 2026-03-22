import { Link } from "react-router-dom";
import type { ClubEventRecord } from "@/types/clubEvent";
import { formatEventDateRange, isEventPast } from "@/data/clubEvents";
import { categoryLabels } from "@/data/pastEvents";

type ClubEventCardProps = {
  event: ClubEventRecord;
};

export function ClubEventCard({ event }: ClubEventCardProps) {
  const past = isEventPast(event);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/70 bg-white/90 shadow-sm ring-1 ring-amber-100 transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/events/${event.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-amber-100/50">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900/90 to-emerald-950 text-amber-100">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold opacity-90">
              {event.title.slice(0, 1)}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900 shadow">
          {categoryLabels[event.category]}
        </span>
        {past ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-100">
            Past
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <time className="text-sm font-medium text-amber-800/90">
          {formatEventDateRange(event)}
          {event.time ? ` · ${event.time}` : ""}
        </time>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-emerald-950">
          <Link to={`/events/${event.slug}`} className="hover:underline">
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{event.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to={`/events/${event.slug}`}
            className="text-sm font-semibold text-emerald-900 hover:underline"
          >
            {past ? "Photos & details →" : "Details & RSVP →"}
          </Link>
          {!past && event.rsvpUrl ? (
            <a
              href={event.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-amber-800 hover:underline"
            >
              External link ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
