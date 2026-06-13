import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/format";
import { getElectronicsImage } from "../utils/electronicsImages";

export default function Home({ suggestedProducts, discountProducts, loading, error, onBuyNow, onViewDetails, user }) {
  return (
    <div className="bg-surface">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Freshers-friendly Electronics Store
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Buy laptops, phones, audio gear, and smart gadgets in one clean storefront.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              The products are loaded from MongoDB Atlas, the buy flow uses JWT login, and the layout stays simple
              enough for a fresher project demo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                View All Products
              </Link>
              <Link
                to={user ? "/products" : "/login"}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
              >
                {user ? "Start Shopping" : "Login to Buy"}
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5">
                <p className="text-2xl font-bold text-slate-950">12+</p>
                <p className="mt-1 text-sm text-slate-600">Electronics products</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5">
                <p className="text-2xl font-bold text-slate-950">JWT</p>
                <p className="mt-1 text-sm text-slate-600">Auth flow</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-black/5">
                <p className="text-2xl font-bold text-slate-950">Atlas</p>
                <p className="mt-1 text-sm text-slate-600">Database data</p>
              </div>
            </div>
          </div>

          <div className="grid place-items-center">
            <div className="relative w-full max-w-lg rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.16)] backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80"
                alt="Electronics hero"
                className="h-[430px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-slate-950/90 p-5 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Featured experience</p>
                <p className="mt-2 text-xl font-semibold">Clean product discovery and simple checkout flow</p>
                <p className="mt-1 text-sm text-slate-300">
                  Hero, suggested products, detailed view, and discount cards all in one project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Suggested Products</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Products selected for the home page</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4"
          >
            View all
          </Link>
        </div>

        {error ? <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[430px] animate-pulse rounded-[1.75rem] bg-white/80" />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {suggestedProducts.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                onBuyNow={onBuyNow}
                onViewDetails={onViewDetails}
                user={user}
                imageIndex={index + 1}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Discount Products</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Best deals with simple card layout</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4"
          >
            Explore more
          </Link>
        </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {discountProducts.map((product, index) => (
            <div
              key={product._id}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    {product.discount}% OFF
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
                </div>
                <img src={getElectronicsImage(product, index + 20)} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-slate-950">{formatPrice(product.price)}</p>
                  <p className="text-sm text-slate-500 line-through">{formatPrice(product.oldPrice)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onBuyNow(product)}
                  className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
