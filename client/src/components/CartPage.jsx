export default function CartPage({
  cartItems,
  totalPrice,
  onIncrease,
  onDecrease,
  onRemove,
  onContinueShopping,
  onProceedToCheckout
}) {
  return (
    <section id="cart" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d9b38c]">Cart Page</p>
              <h2 className="mt-2 font-['Playfair_Display'] text-3xl text-white">Your shopping bag</h2>
            </div>
            <button
              type="button"
              onClick={onContinueShopping}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
            >
              Continue Shopping
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {!cartItems.length && (
              <div className="rounded-xl border border-white/8 bg-[#0f1722] p-5 text-sm text-slate-300">
                Your cart is empty. Add products to start your order.
              </div>
            )}

            {cartItems.map((item) => (
              <div key={item._id} className="rounded-xl border border-white/8 bg-[#0f1722] p-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img src={item.image} alt={item.name} className="h-28 w-full rounded-xl object-cover sm:w-28" />
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#d9b38c]">{item.audience}</p>
                        <h3 className="mt-1 text-lg font-semibold text-white">{item.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Price</p>
                        <p className="mt-1 text-lg font-bold text-white">Rs. {item.price}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onDecrease(item._id)}
                          className="h-9 w-9 rounded-md bg-[#1f2937] text-lg text-white"
                        >
                          -
                        </button>
                        <span className="min-w-10 text-center text-sm font-semibold text-white">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onIncrease(item._id)}
                          className="h-9 w-9 rounded-md bg-[#1f2937] text-lg text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item._id)}
                        className="text-sm font-semibold text-red-400 transition hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.22em] text-[#d9b38c]">Subtotal</p>
          <p className="mt-3 text-4xl font-bold text-white">Rs. {totalPrice}</p>
          <p className="mt-3 text-sm text-slate-300">{cartItems.length} items selected for checkout.</p>

          <div className="mt-6 space-y-3 rounded-xl border border-white/8 bg-[#0f1722] p-4 text-sm text-slate-300">
            <p>Review your selected products</p>
            <p>Update quantity or remove items</p>
            <p>Proceed to address and payment step</p>
          </div>

          <button
            type="button"
            onClick={onProceedToCheckout}
            disabled={!cartItems.length}
            className="mt-6 w-full rounded-lg bg-[#c49a6c] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#d7ab7a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
