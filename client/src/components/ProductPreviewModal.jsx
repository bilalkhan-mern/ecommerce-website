export default function ProductPreviewModal({ product, isOpen, onBuyNow, onClose, message }) {
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#ece3d5] p-5">
            <img src={product.image} alt={product.name} className="h-[360px] w-full rounded-2xl object-cover" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-brand-cocoa">{product.audience}</p>
                <h2 className="mt-2 font-['Playfair_Display'] text-3xl text-brand-ink">{product.name}</h2>
              </div>
              <button type="button" onClick={onClose} className="text-sm font-semibold text-brand-cocoa">
                Close
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
              {message}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-md bg-brand-cream px-3 py-1 text-xs font-semibold uppercase text-brand-cocoa">
                {product.type}
              </span>
              <span className="rounded-md border border-[#eadfce] px-3 py-1 text-xs font-semibold uppercase text-slate-500">
                {product.section}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#f7f3eb] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Price</p>
                <p className="mt-2 text-2xl font-bold text-brand-ink">Rs. {product.price}</p>
              </div>
              <div className="rounded-xl bg-[#f7f3eb] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
                <p className="mt-2 text-base font-semibold text-brand-ink">Accepted in cart</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBuyNow}
                className="rounded-lg bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-cocoa"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#d9c9b3] px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-cream"
              >
                Continue Shopping
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-[#eadfce] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Purchase Note</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Product purchase list me add ho chuka hai. Ab aap cart open karke quantity manage kar sakte ho ya
                checkout section me jaakar order place kar sakte ho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
