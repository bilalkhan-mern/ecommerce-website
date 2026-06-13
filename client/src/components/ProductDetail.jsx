import { formatPrice } from "../utils/format";
import { getElectronicsImage } from "../utils/electronicsImages";

export default function ProductDetail({ product, onBuyNow, onClose, user, ordering }) {
  if (!product) {
    return null;
  }

  const imageSrc = getElectronicsImage(product, 99);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[1.5rem] bg-slate-100">
          <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              {product.discount}% Discount
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {product.category}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-slate-950">{product.name}</h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">{product.brand}</p>
          <p className="mt-5 text-base leading-7 text-slate-600">{product.description}</p>

          <div className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-bold text-slate-950">{formatPrice(product.price)}</p>
                <p className="mt-1 text-sm text-slate-500 line-through">{formatPrice(product.oldPrice)}</p>
              </div>
              <p className="text-right text-sm text-slate-500">
                {user ? "Logged in and ready to purchase" : "Login required for purchase"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onBuyNow(product)}
              disabled={ordering}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
            >
              {ordering ? "Placing..." : "Buy Now"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
            >
              Close View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
