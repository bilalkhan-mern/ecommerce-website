import { useState } from "react";
import { Link } from "react-router-dom";

const categoryLinks = [
  { label: "Laptops", to: "/products?category=laptops", note: "Work and study machines" },
  { label: "Mobiles", to: "/products?category=mobiles", note: "Daily use smartphones" },
  { label: "Audio", to: "/products?category=audio", note: "Headphones and earbuds" },
  { label: "Wearables", to: "/products?category=wearables", note: "Smartwatches and bands" },
  { label: "Accessories", to: "/products?category=accessories", note: "Power banks and keyboards" },
  { label: "Smart Home", to: "/products?category=smart-home", note: "Connected home gadgets" }
];

const utilityLinks = [
  { label: "Deals", to: "/products?section=deals" },
  { label: "Trending", to: "/products?section=trending" },
  { label: "New Arrivals", to: "/products?section=new-arrivals" }
];

const linkClass =
  "rounded-full px-4 py-2 text-sm font-normal text-slate-700 transition hover:bg-slate-100 hover:text-slate-950";

const categoryPillClass =
  "rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-normal uppercase tracking-[0.18em] text-slate-600 transition hover:border-slate-400 hover:text-slate-950";

export default function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const closeMenus = () => {
    setMobileOpen(false);
    setCategoriesOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenus}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white shadow-soft">
              E
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">Electro Hub</p>
              <p className="text-base font-semibold text-slate-950">Style Commerce</p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/" className={linkClass} onClick={closeMenus}>
              Home
            </Link>
            <Link to="/products" className={linkClass} onClick={closeMenus}>
              View All
            </Link>
            <button
              type="button"
              onClick={() => setCategoriesOpen((value) => !value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-normal text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Categories
            </button>
            {utilityLinks.map((link) => (
              <Link key={link.label} to={link.to} className={linkClass} onClick={closeMenus}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-normal text-emerald-700">
                  Hi, {user.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    closeMenus();
                    onLogout();
                  }}
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-normal text-white transition hover:bg-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkClass} onClick={closeMenus}>
                  Login
                </Link>
                <Link to="/register" className={linkClass} onClick={closeMenus}>
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 shadow-sm md:hidden"
          >
            Menu
          </button>
        </div>

        <div className="mt-4 hidden flex-wrap gap-2 md:flex">
          {categoryLinks.map((link) => (
            <Link key={link.label} to={link.to} className={categoryPillClass} onClick={closeMenus}>
              {link.label}
            </Link>
          ))}
        </div>

        {categoriesOpen ? (
          <div className="mt-4 hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.1)] md:block">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Shop by Category</p>
                <p className="mt-2 text-sm text-slate-600">
                  Use these shortcuts to jump straight to the electronics section you want.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCategoriesOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-normal text-slate-700 transition hover:border-slate-400"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-400 hover:bg-white"
                  onClick={closeMenus}
                >
                  <p className="text-sm font-normal text-slate-950">{link.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{link.note}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 sm:px-6">
            <Link to="/" className={linkClass} onClick={closeMenus}>
              Home
            </Link>
            <Link to="/products" className={linkClass} onClick={closeMenus}>
              View All
            </Link>
            <button
              type="button"
              onClick={() => setCategoriesOpen((value) => !value)}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-normal text-slate-800"
            >
              Categories
              <span>{categoriesOpen ? "-" : "+"}</span>
            </button>

            {categoriesOpen ? (
              <div className="grid gap-2">
                {categoryLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700"
                    onClick={closeMenus}
                  >
                    <p className="font-normal text-slate-950">{link.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{link.note}</p>
                  </Link>
                ))}
              </div>
            ) : null}

            {utilityLinks.map((link) => (
              <Link key={link.label} to={link.to} className={linkClass} onClick={closeMenus}>
                {link.label}
              </Link>
            ))}

            {user ? (
              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  onLogout();
                }}
                className="w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-normal text-white"
              >
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" className={linkClass} onClick={closeMenus}>
                  Login
                </Link>
                <Link to="/register" className={linkClass} onClick={closeMenus}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
