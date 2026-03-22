type PageIntroProps = {
  title: string;
  subtitle?: string;
};

export function PageIntro({ title, subtitle }: PageIntroProps) {
  return (
    <div className="relative overflow-hidden border-b border-amber-200/50 bg-gradient-to-br from-amber-100/50 via-[color:var(--color-saffron-50)] to-emerald-100/40">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-900/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
          SEVA · NCSU
        </div>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-emerald-950 sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
