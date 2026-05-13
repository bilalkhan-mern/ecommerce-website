export default function ProductGrid({ products, loading, onAddToCart }) {
  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#eadfce] bg-white p-8 text-center shadow-soft">Loading products...</div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#eadfce] bg-white p-8 text-center shadow-soft">
          No products found. Try another filter.
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product._id} className="overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-soft">
            <div className="h-52 bg-brand-sand/20 p-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brand-cocoa">{product.audience}</p>
                  <h3 className="mt-1 text-lg font-semibold text-brand-ink">{product.name}</h3>
                </div>
                <span className="rounded-md bg-brand-cream px-2.5 py-1 text-xs font-semibold uppercase text-brand-cocoa">
                  {product.type}
                </span>
              </div>

              <div className="mt-2">
                <span className="rounded-md border border-[#eadfce] px-2 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  {product.section}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Price</p>
                  <p className="text-lg font-bold text-brand-ink">Rs. {product.price}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="rounded-lg bg-brand-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-cocoa"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
