export default function CartDrawer({
  isOpen,
  cartItems,
  totalPrice,
  onClose,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <div className={`fixed inset-0 z-40 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-soft transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-['Playfair_Display'] text-2xl text-brand-ink">Your Cart</h2>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-brand-cocoa">
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {!cartItems.length && (
            <div className="rounded-xl bg-brand-cream p-4 text-sm text-slate-600">
              Cart empty hai. Products add karke checkout section use karo.
            </div>
          )}

          {cartItems.map((item) => (
            <div key={item._id} className="rounded-xl border border-brand-sand p-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-ink">{item.name}</h3>
                  <p className="text-sm text-slate-500">Rs. {item.price}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDecrease(item._id)}
                      className="h-8 w-8 rounded-md bg-brand-cream text-lg"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onIncrease(item._id)}
                      className="h-8 w-8 rounded-md bg-brand-cream text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item._id)}
                  className="text-sm font-semibold text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-brand-ink p-5 text-white">
          <p className="text-sm text-slate-200">Estimated Total</p>
          <p className="mt-2 text-2xl font-bold">Rs. {totalPrice}</p>
        </div>
      </aside>
    </div>
  );
}
