import { contacts } from "@/data/siteContent";

export function NewsletterStrip() {
  return (
    <aside className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-center text-emerald-50 shadow-md sm:p-8">
      <p className="text-sm text-emerald-100/90">Subscribe to the newsletter by writing to</p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-amber-100">
        {contacts.newsletter.label}:{" "}
        <a className="underline decoration-amber-400/50 hover:text-white" href={`mailto:${contacts.newsletter.email}`}>
          {contacts.newsletter.email}
        </a>
      </p>
    </aside>
  );
}
