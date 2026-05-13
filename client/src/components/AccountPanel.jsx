export default function AccountPanel({ currentUser, orderHistory, onLoginClick }) {
  return (
    <section id="account" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-cocoa">Account</p>
          <h2 className="mt-2 font-['Playfair_Display'] text-2xl text-brand-ink">
            {currentUser ? `Welcome, ${currentUser.name}` : "Sign in to shop"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Account details and recent orders.</p>

          {currentUser ? (
            <div className="mt-6 space-y-3">
              <div className="rounded-lg bg-brand-cream px-4 py-3 text-sm text-brand-ink">
                Email: {currentUser.email}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="mt-5 rounded-lg bg-brand-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-cocoa"
            >
              Login / Register
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-cocoa">Recent orders</p>
              <h3 className="mt-2 font-['Playfair_Display'] text-2xl text-brand-ink">Order history</h3>
            </div>
            <span className="rounded-lg bg-brand-cream px-3 py-2 text-sm font-semibold text-brand-cocoa">
              {orderHistory.length} orders
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {!currentUser && (
              <div className="rounded-lg bg-brand-cream p-4 text-sm text-slate-600">
                Sign in karke apne orders yahan dekh sakte ho.
              </div>
            )}

            {currentUser && !orderHistory.length && (
              <div className="rounded-lg bg-brand-cream p-4 text-sm text-slate-600">
                Abhi tak koi order nahi hai.
              </div>
            )}

            {orderHistory.map((order) => (
              <div key={order._id} className="rounded-xl border border-brand-sand p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">Order ID: {order._id}</p>
                    <p className="mt-1 text-sm text-slate-500">{order.status}</p>
                  </div>
                  <div className="text-sm text-slate-600">Rs. {order.totalAmount}</div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{order.items.length} products in this order</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
