import { meeting } from "@/data/siteContent";

export function MeetingCard() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-white via-amber-50/50 to-emerald-50/30 p-6 shadow-lg shadow-amber-900/5 ring-1 ring-amber-100 sm:p-10">
      <div
        className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800/80">Weekly</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-emerald-950 sm:text-4xl">
          Meetings
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Same time every week — mantra, discussion, dinner, friendship. No experience required.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-200/60 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
            <dt className="text-xs font-bold uppercase tracking-wide text-amber-900/70">When</dt>
            <dd className="mt-2 text-lg font-semibold leading-snug text-slate-900">{meeting.when}</dd>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
            <dt className="text-xs font-bold uppercase tracking-wide text-emerald-900/70">Where</dt>
            <dd className="mt-2 text-lg font-semibold leading-snug text-slate-900">{meeting.where}</dd>
          </div>
          <div className="rounded-2xl border border-amber-200/60 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
            <dt className="text-xs font-bold uppercase tracking-wide text-amber-900/70">Who</dt>
            <dd className="mt-2 text-lg font-semibold leading-snug text-slate-900">{meeting.who}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
