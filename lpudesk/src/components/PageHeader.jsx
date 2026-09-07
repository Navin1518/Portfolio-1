import Container from "./Container.jsx";

/** Reusable heading strip shown at the top of every inner page. */
export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-900">{title}</h1>
            {description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
