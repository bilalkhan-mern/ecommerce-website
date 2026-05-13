const cards = [
  {
    title: "Men Shirts",
    text: "Smart office wear and weekend casual pieces.",
    color: "bg-[#efe3d3]"
  },
  {
    title: "Women Pants",
    text: "Comfort-driven fits with modern styling.",
    color: "bg-[#d7e5df]"
  },
  {
    title: "Kids Collection",
    text: "Fun, light, and colorful everyday outfits.",
    color: "bg-[#f5e3ea]"
  }
];

export default function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className={`${card.color} rounded-[2rem] p-6`}>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-cocoa">Collection</p>
            <h3 className="mt-3 text-2xl font-semibold text-brand-ink">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
