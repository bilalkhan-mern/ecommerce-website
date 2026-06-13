import { formatPrice } from "../utils/format";
import { getElectronicsImage } from "../utils/electronicsImages";

export default function ProductCard({ product, onBuyNow, onViewDetails, ordering, user, imageIndex = 0 }) {
  const imageSrc = getElectronicsImage(product, imageIndex);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          {product.discount}% OFF
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {product.category}
          </span>
          <span className="text-sm text-slate-500">{product.brand}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-950">{product.name}</h3>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-slate-950">{formatPrice(product.price)}</p>
            <p className="text-sm text-slate-500 line-through">{formatPrice(product.oldPrice)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{user ? "Ready" : "Login"}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onViewDetails?.(product)}
            className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            disabled={ordering}
            className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {ordering ? "Placing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </article>
  );
}
