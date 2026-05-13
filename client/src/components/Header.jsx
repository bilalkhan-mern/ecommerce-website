import { useState } from "react";

const navGroups = [
  {
    title: "Categories",
    items: [
      { label: "All", action: { audience: "all", type: "all", search: "" } },
      { label: "Men", action: { audience: "men", type: "all", search: "" } },
      { label: "Women", action: { audience: "women", type: "all", search: "" } },
      { label: "Kids", action: { audience: "kids", type: "all", search: "" } }
    ]
  },
  {
    title: "Clothing",
    items: [
      { label: "Shirts", action: { audience: "all", type: "shirt", search: "" } },
      { label: "Pants", action: { audience: "all", type: "pant", search: "" } },
      { label: "Dresses", action: { audience: "all", type: "dress", search: "" } },
      { label: "Blazers", action: { audience: "all", type: "blazer", search: "" } },
      { label: "T-Shirts", action: { audience: "all", type: "tshirt", search: "" } },
      { label: "Hoodies", action: { audience: "all", type: "hoodie", search: "" } }
    ]
  },
  {
    title: "Sub Category",
    items: [
      { label: "Formal", action: { audience: "all", type: "all", search: "formal" } },
      { label: "Casual", action: { audience: "all", type: "all", search: "casual" } },
      { label: "Party Wear", action: { audience: "all", type: "all", search: "party" } },
      { label: "Essentials", action: { audience: "all", type: "all", search: "essentials" } }
    ]
  }
];

function isActionActive(action, selectedAudience, selectedType, searchTerm) {
  const normalizedSearch = searchTerm.toLowerCase();
  const actionAudience = action.audience ?? selectedAudience;
  const actionType = action.type ?? selectedType;
  const actionSearch = (action.search ?? "").toLowerCase();

  return actionAudience === selectedAudience && actionType === selectedType && actionSearch === normalizedSearch;
}

export default function Header({
  cartCount,
  currentUser,
  isMobileMenuOpen,
  onAuthOpen,
  onCartOpen,
  onLogout,
  onMobileMenuToggle,
  onNavSelect,
  selectedAudience,
  selectedType,
  searchTerm
}) {
  const [openGroup, setOpenGroup] = useState("Categories");

  return (
    <header className="sticky top-0 z-30 border-b border-[#e8dece] bg-[#fbf8f2]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-['Playfair_Display'] text-2xl font-bold text-brand-ink">StyleCart</p>
            <p className="text-xs text-brand-cocoa">Mens, womens and kids collection</p>
          </div>

          <div className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {navGroups.map((group) => (
              <div key={group.title} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenGroup((previous) => (previous === group.title ? "" : group.title))}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    openGroup === group.title ? "bg-brand-ink text-white" : "text-brand-ink hover:text-brand-clay"
                  }`}
                >
                  {group.title}
                </button>

                {openGroup === group.title && (
                  <div className="absolute left-1/2 top-full z-40 mt-3 w-64 -translate-x-1/2 rounded-xl border border-[#eadfce] bg-white p-3 shadow-soft">
                    <p className="px-2 pb-2 text-xs uppercase tracking-[0.22em] text-brand-cocoa">{group.title}</p>
                    <div className="grid gap-1">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            onNavSelect(item.action);
                            setOpenGroup(group.title);
                          }}
                          className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                            isActionActive(item.action, selectedAudience, selectedType, searchTerm)
                              ? "bg-brand-ink text-white"
                              : "text-brand-ink hover:bg-brand-cream"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCartOpen}
              className="rounded-lg bg-brand-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-cocoa"
            >
              Cart ({cartCount})
            </button>

            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={onAuthOpen}
                className="rounded-lg border border-brand-ink px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-ink hover:text-white"
              >
                {currentUser ? currentUser.name : "Login / Register"}
              </button>
              {currentUser && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-sm font-semibold text-brand-cocoa transition hover:text-brand-ink"
                >
                  Logout
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={onMobileMenuToggle}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ddcfb8] bg-white lg:hidden"
            >
              <span className="text-lg text-brand-ink">{isMobileMenuOpen ? "X" : "="}</span>
            </button>
          </div>
        </div>

        <div className="mt-3 hidden items-center gap-6 border-t border-[#eee3d3] pt-3 text-sm md:flex lg:hidden">
          <a href="#shop" className="transition hover:text-brand-clay">Shop</a>
          <a href="#account" className="transition hover:text-brand-clay">Account</a>
          <a href="#checkout" className="transition hover:text-brand-clay">Checkout</a>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 rounded-xl border border-[#eadfce] bg-white p-4 shadow-soft lg:hidden">
            <div className="grid gap-4">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-brand-cocoa">{group.title}</p>
                  <div className="grid gap-2">
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => onNavSelect(item.action)}
                        className={`rounded-lg px-4 py-3 text-left text-sm font-medium ${
                          isActionActive(item.action, selectedAudience, selectedType, searchTerm)
                            ? "bg-brand-ink text-white"
                            : "bg-brand-cream text-brand-ink"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid gap-2 border-t border-[#eee3d3] pt-4">
                <a href="#shop" className="rounded-lg border border-[#eadfce] px-4 py-3 text-sm text-brand-ink">Shop</a>
                <a href="#account" className="rounded-lg border border-[#eadfce] px-4 py-3 text-sm text-brand-ink">Account</a>
                <a href="#checkout" className="rounded-lg border border-[#eadfce] px-4 py-3 text-sm text-brand-ink">Checkout</a>
                <button
                  type="button"
                  onClick={onAuthOpen}
                  className="rounded-lg bg-brand-ink px-4 py-3 text-left text-sm font-semibold text-white"
                >
                  {currentUser ? currentUser.name : "Login / Register"}
                </button>
                {currentUser && (
                  <button
                    type="button"
                    onClick={onLogout}
                    className="rounded-lg border border-[#eadfce] px-4 py-3 text-left text-sm text-brand-ink"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
