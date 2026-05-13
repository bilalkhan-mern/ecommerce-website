import { highlights } from "../data/highlights";

export default function Highlights() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
      {highlights.map((item) => (
        <div key={item.title} className="rounded-[1.75rem] border border-brand-sand bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-brand-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
        </div>
      ))}
    </section>
  );
}
