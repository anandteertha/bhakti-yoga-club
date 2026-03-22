import { Link } from "react-router-dom";
import { PageIntro } from "@/components/PageIntro";
import { ClubEventCard } from "@/components/ClubEventCard";
import { RsvpBanner } from "@/components/RsvpBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { useEvents } from "@/context/EventsContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getPastEvents, getUpcomingEvents } from "@/data/clubEvents";

export function EventsPage() {
  usePageTitle("Events");
  const { events, status, fetchError } = useEvents();
  const upcoming = getUpcomingEvents(events);
  const past = getPastEvents(events);
  const sheetUrl = import.meta.env.VITE_EVENTS_SHEET_CSV_URL;

  return (
    <>
      <PageIntro
        title="Events"
        subtitle={
          sheetUrl
            ? "Upcoming and past update when you refresh — data is fetched from your Google Sheet (see .env)."
            : "Upcoming programs and past gatherings from bundled events data. Add VITE_EVENTS_SHEET_CSV_URL for live sheet sync."
        }
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 sm:px-6 sm:py-16">
        {fetchError && sheetUrl ? (
          <p className="rounded-xl border border-amber-300/80 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Could not load the live sheet ({fetchError}). Showing the bundled copy.{" "}
            {import.meta.env.DEV
              ? "Dev uses a Vite proxy; if this persists, check the URL."
              : "On production, a browser may block cross-origin requests — see README for proxy options."}
          </p>
        ) : null}

        <section>
          <SectionHeading
            eyebrow="Calendar"
            title="Upcoming"
            subtitle="RSVP where linked. Open any card for full details and gallery."
          />
          {status === "loading" && sheetUrl ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-2xl border border-amber-200/60 bg-amber-100/40"
                />
              ))}
            </div>
          ) : upcoming.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-amber-300/80 bg-amber-50/50 px-6 py-10 text-center text-slate-600">
              No upcoming events in the list. Add rows in your{" "}
              <strong className="text-slate-800">Google Sheet</strong> and set{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">VITE_EVENTS_SHEET_CSV_URL</code> in{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">.env</code>, then{" "}
              <strong className="text-slate-800">refresh this page</strong>. See{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">README.md</code>.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
                <ClubEventCard key={e.slug} event={e} />
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionHeading
            eyebrow="Archive"
            title="Past (this site)"
            subtitle="Events whose last day has passed. Add gallery paths in the sheet after the event."
          />
          {status === "loading" && sheetUrl ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-2xl border border-amber-200/60 bg-amber-100/40"
                />
              ))}
            </div>
          ) : past.length === 0 ? (
            <p className="mt-8 text-slate-600">
              No past entries yet — past dates move here automatically from the sheet.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <ClubEventCard key={e.slug} event={e} />
              ))}
            </div>
          )}
        </section>

        <p className="text-center text-sm text-slate-600">
          Older photo albums from before this site:{" "}
          <Link className="font-semibold text-emerald-900 underline" to="/past-events">
            Past events archive
          </Link>
        </p>

        <RsvpBanner />
      </div>
    </>
  );
}
