import { PageIntro } from "@/components/PageIntro";
import { RsvpBanner } from "@/components/RsvpBanner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { visitingMonks } from "@/data/visitingMonks";
import { vineDividerSrc } from "@/data/media";

export function VisitingMonksPage() {
  usePageTitle("Visiting Monks");
  return (
    <>
      <PageIntro
        title="Visiting teachers"
        subtitle="Scholars and practitioners who have shared time with our club — bios from our archives, edited for clarity."
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
        {visitingMonks.map((person, index) => (
          <article
            key={person.name}
            className="overflow-hidden rounded-[2rem] border border-amber-200/60 bg-white/90 shadow-md ring-1 ring-amber-100/80"
          >
            <div className="grid gap-0 lg:grid-cols-[minmax(280px,340px)_1fr]">
              <div className="relative aspect-[4/5] min-h-[280px] lg:aspect-auto lg:min-h-full">
                <img
                  src={person.image}
                  alt={person.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700/90">Guest</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-emerald-950 sm:text-4xl">
                  {person.name}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
                  {person.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {person.link ? (
                  <p className="mt-8">
                    <a
                      href={person.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-emerald-800"
                    >
                      {person.link.label}
                      <span aria-hidden>↗</span>
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        <div className="flex justify-center py-4">
          <img src={vineDividerSrc} alt="" className="max-h-10 w-auto opacity-70" loading="lazy" />
        </div>

        <RsvpBanner />
      </div>
    </>
  );
}
