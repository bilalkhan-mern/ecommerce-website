const sections = [
  { label: "Men", value: "men", mode: "audience" },
  { label: "Women", value: "women", mode: "audience" },
  { label: "Kids", value: "kids", mode: "audience" },
  { label: "Formal", value: "formal", mode: "search" },
  { label: "Casual", value: "casual", mode: "search" },
  { label: "Dresses", value: "dress", mode: "search" }
];

export default function BrowseSections({ onSelectAudience, onSelectType, onSelectSearch }) {
  const handleClick = (item) => {
    onSelectType("all");

    if (item.mode === "audience") {
      onSelectAudience(item.value);
      onSelectSearch("");
      return;
    }

    onSelectAudience("all");
    onSelectSearch(item.value);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {sections.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleClick(item)}
            className="rounded-xl border border-[#eadfce] bg-white px-4 py-4 text-left shadow-soft transition hover:border-brand-clay hover:bg-[#fffaf2]"
          >
            <p className="text-sm font-semibold text-brand-ink">{item.label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
