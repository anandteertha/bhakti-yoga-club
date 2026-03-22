import { brand, contacts, legacyWordPress, rsvp } from "@/data/siteContent";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-amber-200/80 bg-gradient-to-b from-emerald-950 to-[#022c1c] text-amber-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={brand.logoSrc}
              alt={brand.logoAlt}
              width={64}
              height={64}
              className="h-14 w-14 shrink-0 rounded-full border border-white/20 bg-white object-contain p-0.5"
              loading="lazy"
              decoding="async"
            />
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight text-amber-100">
              SEVA Bhakti Yoga Club
              <span className="mt-0.5 block text-xs font-normal text-emerald-200/90">NCSU</span>
            </p>
          </div>
          <h2 className="mt-8 font-[family-name:var(--font-display)] text-xl font-semibold text-amber-100">
            Stay connected
          </h2>
          <p className="mt-2 text-sm text-emerald-100/90">
            {contacts.newsletter.description}{" "}
            <a
              className="font-medium text-amber-200 underline decoration-amber-400/50 underline-offset-2 hover:text-white"
              href={`mailto:${contacts.newsletter.email}`}
            >
              {contacts.newsletter.label}: {contacts.newsletter.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-emerald-100/90">
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 font-medium text-amber-100 ring-1 ring-white/15 transition hover:bg-white/15"
              href={rsvp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {rsvp.label}
              <span aria-hidden>↗</span>
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-amber-100">
            Feedback
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100/90">
            {contacts.feedback.line.split(contacts.feedback.email)[0]}
            <a
              className="font-medium text-amber-200 underline decoration-amber-400/50 underline-offset-2 hover:text-white"
              href={`mailto:${contacts.feedback.email}`}
            >
              {contacts.feedback.email}
            </a>
            {contacts.feedback.line.split(contacts.feedback.email)[1]}
          </p>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-amber-100">
            Archive
          </h2>
          <p className="mt-2 text-sm text-emerald-100/90">
            Older comments and long-form posts may still live on our former WordPress site while we migrate fully
            to this home.
          </p>
          <a
            className="mt-3 inline-flex text-sm font-medium text-amber-200 underline decoration-amber-400/50 underline-offset-2 hover:text-white"
            href={legacyWordPress.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {legacyWordPress.label} ↗
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-emerald-200/80">
        © {new Date().getFullYear()} SEVA Bhakti Yoga Club @ NCSU · Maintained by the club
      </div>
    </footer>
  );
}
