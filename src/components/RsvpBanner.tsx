import { rsvp } from "@/data/siteContent";

export function RsvpBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200/90 bg-amber-50/90 px-4 py-3 sm:px-5">
      <p className="text-sm font-medium text-slate-800">{rsvp.label}</p>
      <a
        href={rsvp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2 text-sm font-semibold text-amber-50 shadow-sm transition hover:bg-emerald-800"
      >
        Open Facebook events
        <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
