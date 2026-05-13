import { categories, productTypes } from "../data/highlights";

export default function Filters({
  selectedAudience,
  selectedType,
  searchTerm,
  onAudienceChange,
  onTypeChange,
  onSearchChange
}) {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-cocoa">Shop products</p>
            <h2 className="mt-2 font-['Playfair_Display'] text-2xl text-brand-ink">Browse the catalog</h2>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products, formal, dress..."
            className="w-full rounded-lg border border-brand-sand bg-brand-cream px-4 py-2.5 text-sm outline-none transition focus:border-brand-clay lg:max-w-xs"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onAudienceChange(category.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedAudience === category.id
                    ? "bg-brand-ink text-white"
                    : "bg-brand-cream text-brand-ink hover:bg-brand-sand"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {productTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onTypeChange(type.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedType === type.id
                    ? "bg-brand-clay text-white"
                    : "bg-[#f3eee5] text-brand-ink hover:bg-brand-sand"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
