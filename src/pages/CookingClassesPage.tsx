import { PageIntro } from "@/components/PageIntro";
import { RsvpBanner } from "@/components/RsvpBanner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cookingPage } from "@/data/cookingContent";

export function CookingClassesPage() {
  usePageTitle("Cooking Classes");
  return (
    <>
      <PageIntro
        title="Cooking classes"
        subtitle="Sāttvika recipes, devotional attitude, and the joy of feeding friends — watch the newsletter for dates."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div className="space-y-6 text-lg leading-relaxed text-slate-800">
            {cookingPage.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <figure className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-200/40 to-emerald-300/25 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-200/80 bg-white shadow-xl ring-1 ring-amber-100">
              <img
                src={cookingPage.image}
                alt={cookingPage.imageAlt}
                className="aspect-[4/3] w-full object-cover sm:aspect-auto sm:max-h-[420px]"
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <div className="mt-16">
          <RsvpBanner />
        </div>
      </div>
    </>
  );
}
