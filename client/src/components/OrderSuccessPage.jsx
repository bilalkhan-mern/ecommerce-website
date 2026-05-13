export default function OrderSuccessPage({ orderInfo, onBackToShop }) {
  if (!orderInfo) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 text-2xl text-green-300">
          OK
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#d9b38c]">Order Confirmed</p>
        <h2 className="mt-3 font-['Playfair_Display'] text-4xl text-white">Your order has been placed successfully</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Reference ID: {orderInfo._id}. Your selected payment option is {orderInfo.paymentMethod}.
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/8 bg-[#0f1722] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Amount</p>
            <p className="mt-2 text-xl font-bold text-white">Rs. {orderInfo.totalAmount}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-[#0f1722] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
            <p className="mt-2 text-xl font-bold text-white">{orderInfo.status}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-[#0f1722] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Items</p>
            <p className="mt-2 text-xl font-bold text-white">{orderInfo.items.length}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToShop}
          className="mt-8 rounded-lg bg-[#c49a6c] px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#d7ab7a]"
        >
          Back to Shopping
        </button>
      </div>
    </section>
  );
}
