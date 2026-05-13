const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Men Clothing", action: { audience: "men", type: "all", search: "" } },
      { label: "Women Clothing", action: { audience: "women", type: "all", search: "" } },
      { label: "Kids Clothing", action: { audience: "kids", type: "all", search: "" } },
      { label: "New Arrivals", action: { audience: "all", type: "all", search: "" } }
    ]
  },
  {
    title: "Categories",
    links: [
      { label: "Shirts", action: { audience: "all", type: "shirt", search: "" } },
      { label: "Pants", action: { audience: "all", type: "pant", search: "" } },
      { label: "Dresses", action: { audience: "all", type: "dress", search: "" } },
      { label: "Blazers", action: { audience: "all", type: "blazer", search: "" } }
    ]
  },
  {
    title: "Collections",
    links: [
      { label: "Formal Wear", action: { audience: "all", type: "all", search: "formal" } },
      { label: "Casual Wear", action: { audience: "all", type: "all", search: "casual" } },
      { label: "Party Wear", action: { audience: "all", type: "all", search: "party" } },
      { label: "Daily Essentials", action: { audience: "all", type: "all", search: "essentials" } }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Order Help", href: "#account" },
      { label: "Shipping Info", href: "#checkout" },
      { label: "Returns", href: "#account" },
      { label: "Contact Store", href: "#footer-contact" }
    ]
  }
];

export default function Footer({ onNavSelect }) {
  return (
    <footer className="mt-10 border-t border-brand-sand bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,0.8fr)] lg:px-8">
        <div id="footer-contact">
          <p className="font-['Playfair_Display'] text-2xl font-bold text-brand-ink">StyleCart</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
            Everyday clothing store for men, women and kids with curated formal, casual and party collections.
          </p>
          <div className="mt-4 space-y-1 text-sm text-slate-600">
            <p>Email: support@stylecart.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: New Delhi, India</p>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-cocoa">{column.title}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              {column.links.map((item) =>
                item.action ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onNavSelect(item.action)}
                    className="block text-left transition hover:text-brand-clay"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a key={item.label} href={item.href} className="block transition hover:text-brand-clay">
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#eee3d3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Copyright 2026 StyleCart. All rights reserved.</p>
          <p>Mens | Womens | Kids | Formal | Casual | Party</p>
        </div>
      </div>
    </footer>
  );
}
