import { Link, useParams } from "react-router-dom";
import { PageIntro } from "@/components/PageIntro";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RsvpBanner } from "@/components/RsvpBanner";
import { useEvents } from "@/context/EventsContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { formatEventDateRange, getEventBySlug, isEventPast } from "@/data/clubEvents";
import { categoryLabels } from "@/data/pastEvents";
import type { GalleryImage } from "@/data/media";
import { assetUrl } from "@/lib/assetUrl";

export function EventDetailPage() {
  const { slug } = useParams();
  const { events, status } = useEvents();
  const event = getEventBySlug(events, slug);
  usePageTitle(event?.title ?? "Event");

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <p className="text-slate-600">Loading event…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-emerald-950">
          Event not found
        </h1>
        <Link to="/events" className="mt-8 inline-block font-semibold text-emerald-900 hover:underline">
          ← All events
        </Link>
      </div>
    );
  }

  const past = isEventPast(event);
  const galleryItems: GalleryImage[] = event.gallery.map((g) => ({
    src: assetUrl(g.src),
    alt: g.alt,
    caption: g.alt,
  }));

  return (
    <>
      <PageIntro
        title={event.title}
        subtitle={`${formatEventDateRange(event)}${event.time ? ` · ${event.time}` : ""}${
          event.location ? ` · ${event.location}` : ""
        }`}
      />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900">
            {categoryLabels[event.category]}
          </span>
          {past ? (
            <span className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
              Past event
            </span>
          ) : (
            <span className="rounded-full bg-amber-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
              Upcoming
            </span>
          )}
        </div>

        {event.coverImage ? (
          <figure className="mt-8 overflow-hidden rounded-[2rem] border border-amber-200/80 shadow-lg">
            <img src={assetUrl(event.coverImage)} alt="" className="w-full object-cover" loading="lazy" />
          </figure>
        ) : null}

        <p className="mt-8 text-lg font-medium text-slate-800">{event.summary}</p>
        <div className="prose prose-slate prose-lg mt-6 max-w-none">
          {event.description
            .split(/\n\n+/)
            .map((para) => para.trim())
            .filter(Boolean)
            .map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                {para}
              </p>
            ))}
        </div>

        {!past && event.rsvpUrl ? (
          <p className="mt-10">
            <a
              href={event.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-emerald-800"
            >
              RSVP / more info ↗
            </a>
          </p>
        ) : null}

        {galleryItems.length > 0 ? (
          <div className="mt-14 border-t border-amber-200/60 pt-14">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-emerald-950">
              Gallery
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Images listed in your sheet for this event (<code className="rounded bg-slate-100 px-1">gallery</code>{" "}
              column).
            </p>
            <div className="mt-8">
              <PhotoGallery items={galleryItems} columns={3} aspect="landscape" />
            </div>
          </div>
        ) : past ? (
          <p className="mt-10 rounded-xl border border-dashed border-amber-200/80 bg-amber-50/40 px-4 py-3 text-sm text-slate-600">
            No gallery yet — add files under <code className="text-xs">public/events/{event.slug}/</code> and list them
            in the sheet.
          </p>
        ) : null}

        <p className="mt-12">
          <Link to="/events" className="font-semibold text-emerald-900 hover:underline">
            ← All events
          </Link>
        </p>

        <div className="mt-10">
          <RsvpBanner />
        </div>
      </article>
    </>
  );
}
