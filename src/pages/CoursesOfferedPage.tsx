import { PageIntro } from "@/components/PageIntro";
import { RsvpBanner } from "@/components/RsvpBanner";
import { SectionHeading } from "@/components/SectionHeading";
import { usePageTitle } from "@/hooks/usePageTitle";
import { coursePresentation } from "@/data/courses";
import { vineDividerSrc } from "@/data/media";

export function CoursesOfferedPage() {
  usePageTitle("Courses offered");
  return (
    <>
      <PageIntro
        title="Courses offered"
        subtitle="A three-session introduction to the Bhagavad-gītā — slides preserved from our archive, free to download."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex justify-center">
          <img src={vineDividerSrc} alt="" className="max-h-10 w-auto opacity-70" loading="lazy" />
        </div>

        <figure className="mt-10 overflow-hidden rounded-[2rem] border border-amber-200/80 bg-white shadow-lg ring-1 ring-amber-100">
          <img
            src={coursePresentation.image}
            alt={coursePresentation.imageAlt}
            className="w-full object-cover"
            loading="lazy"
          />
        </figure>

        <SectionHeading
          className="mt-12"
          eyebrow="Downloads"
          title="Session PDFs"
          subtitle={coursePresentation.intro}
        />
        <ul className="mt-8 space-y-4">
          {coursePresentation.pdfs.map((pdf) => (
            <li key={pdf.href}>
              <a
                href={pdf.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-amber-200/70 bg-white/90 px-5 py-4 shadow-sm ring-1 ring-amber-100 transition hover:border-emerald-900/20 hover:shadow-md"
              >
                <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-emerald-950 group-hover:underline">
                  {pdf.label}
                </span>
                <span className="shrink-0 rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900">
                  PDF ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <img src={vineDividerSrc} alt="" className="max-h-10 w-auto opacity-70" loading="lazy" />
        </div>

        <div className="mt-12">
          <RsvpBanner />
        </div>
      </div>
    </>
  );
}
