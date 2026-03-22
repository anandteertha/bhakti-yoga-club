import { PageIntro } from "@/components/PageIntro";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RsvpBanner } from "@/components/RsvpBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { usePageTitle } from "@/hooks/usePageTitle";
import { aboutSections } from "@/data/aboutContent";
import { aboutGallery, vineDividerSrc } from "@/data/media";
import { contacts, meeting } from "@/data/siteContent";

export function AboutPage() {
  usePageTitle("About");
  return (
    <>
      <PageIntro
        title="About"
        subtitle="Bhakti-yoga at NC State — clear purpose, open doors, and a weekly rhythm that fits student life."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="space-y-14">
            {aboutSections.map((section) => (
              <section key={section.title}>
                <SectionHeading title={section.title} subtitle={section.lead} />
                {section.paragraphs?.length ? (
                  <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-800">
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                ) : null}
                {section.bullets?.length ? (
                  <ul className="mt-8 space-y-5">
                    {section.bullets.map((b) => (
                      <li
                        key={b.title}
                        className="rounded-2xl border border-amber-200/60 bg-white/80 p-5 shadow-sm ring-1 ring-amber-100/80"
                      >
                        <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-emerald-950">
                          {b.title}
                        </p>
                        <p className="mt-2 text-slate-700 leading-relaxed">{b.text}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-950 to-[#052e16] p-6 text-emerald-50 shadow-xl shadow-emerald-950/20">
              <img src={vineDividerSrc} alt="" className="mx-auto mb-4 max-h-8 w-auto opacity-60 invert" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/90">This week</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-emerald-300/90">When</dt>
                  <dd className="font-medium text-amber-50">{meeting.when}</dd>
                </div>
                <div>
                  <dt className="text-emerald-300/90">Where</dt>
                  <dd className="font-medium text-amber-50">{meeting.where}</dd>
                </div>
                <div>
                  <dt className="text-emerald-300/90">Newsletter</dt>
                  <dd>
                    <a className="font-medium text-amber-200 hover:underline" href={`mailto:${contacts.newsletter.email}`}>
                      {contacts.newsletter.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <div className="mt-20 border-t border-amber-200/60 pt-16">
          <SectionHeading
            eyebrow="Gallery"
            title="Atmosphere & prasādam"
            subtitle="Images from our legacy About page — full width, zoomable."
            align="center"
          />
          <div className="mt-10">
            <PhotoGallery items={aboutGallery} columns={3} aspect="landscape" />
          </div>
        </div>

        <div className="mt-16">
          <RsvpBanner />
        </div>
      </div>
    </>
  );
}
