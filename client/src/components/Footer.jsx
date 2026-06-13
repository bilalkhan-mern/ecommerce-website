import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/60 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-semibold text-white">Electro Hub</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            A clean electronics store for laptops, phones, audio gear, wearables, and smart home picks.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Main Links</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/" className="text-slate-300 transition hover:text-white">
              Home
            </Link>
            <Link to="/products" className="text-slate-300 transition hover:text-white">
              View All
            </Link>
            <Link to="/login" className="text-slate-300 transition hover:text-white">
              Login
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Categories</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/products?category=laptops" className="text-slate-300 transition hover:text-white">
              Laptops
            </Link>
            <Link to="/products?category=mobiles" className="text-slate-300 transition hover:text-white">
              Mobiles
            </Link>
            <Link to="/products?category=audio" className="text-slate-300 transition hover:text-white">
              Audio
            </Link>
            <Link to="/products?category=accessories" className="text-slate-300 transition hover:text-white">
              Accessories
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Store Highlights</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Latest gadgets and everyday essentials</li>
            <li>Curated product collections with clean cards</li>
            <li>Easy browsing with clear prices and offers</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-500">
        Built for a modern electronics shopping experience.
      </div>
    </footer>
  );
}
