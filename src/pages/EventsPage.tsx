import { Link } from "react-router-dom";
import { PageIntro } from "@/components/PageIntro";
import { ClubEventCard } from "@/components/ClubEventCard";
import { RsvpBanner } from "@/components/RsvpBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getPastEventsFromFile, getUpcomingEvents } from "@/data/clubEvents";

export function EventsPage() {
  usePageTitle("Events");
  const upcoming = getUpcomingEvents();
  const past = getPastEventsFromFile();

  return (
    <>
      <PageIntro
        title="Events"
        subtitle="Upcoming programs and past gatherings — managed in events.json (no code edits). Past dates move here automatically."
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <SectionHeading
            eyebrow="Calendar"
            title="Upcoming"
            subtitle="RSVP where linked. Details and galleries open on each event page."
          />
          {upcoming.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-amber-300/80 bg-amber-50/50 px-6 py-10 text-center text-slate-600">
              No upcoming events yet. Add rows in your{" "}
              <strong className="text-slate-800">Google Sheet</strong>, set{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">EVENTS_SHEET_CSV_URL</code> in{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">.env</code>, then run{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">npm run sync-events</code> or{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">npm run build</code>. See{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-sm text-emerald-900">public/events/README.md</code>.
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
            subtitle="Events whose last day has passed. Add photos in the JSON gallery after the event."
          />
          {past.length === 0 ? (
            <p className="mt-8 text-slate-600">
              No past entries yet — or remove the sample row in{" "}
              <code className="rounded bg-slate-100 px-1 text-sm">events.json</code>.
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
