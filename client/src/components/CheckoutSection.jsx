import { useEffect, useState } from "react";

const initialForm = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  note: "",
  paymentOption: "Cash on Delivery"
};

export default function CheckoutSection({
  apiBaseUrl,
  cartItems,
  currentUser,
  token,
  totalPrice,
  onOrderPlaced,
  onRequireLogin,
  onBackToCart
}) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData((previous) => ({
        ...previous,
        customerName: previous.customerName || currentUser.name,
        email: previous.email || currentUser.email
      }));
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cartItems.length) {
      setStatus({ type: "error", message: "Checkout se pehle cart me product add karo." });
      return;
    }

    if (!token || !currentUser) {
      setStatus({ type: "error", message: "Order place karne ke liye pehle login karo." });
      onRequireLogin();
      return;
    }

    try {
      setSubmitting(true);
      setStatus({ type: "", message: "" });

      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          items: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price
          })),
          totalAmount: totalPrice,
          paymentMethod: formData.paymentOption
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order submit failed");
      }

      setFormData(initialForm);
      onOrderPlaced(data.order);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong while placing your order."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="checkout" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#d9b38c]">Checkout Page</p>
              <h2 className="mt-2 font-['Playfair_Display'] text-3xl text-white">Order summary</h2>
            </div>
            <button
              type="button"
              onClick={onBackToCart}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
            >
              Back to Cart
            </button>
          </div>

          <div className="mt-4 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {currentUser ? `Logged in as ${currentUser.name}` : "Login required before placing order"}
          </div>

          <div className="mt-5 rounded-xl border border-white/8 bg-[#0f1722] p-4">
            <p className="text-sm text-slate-400">Total Amount</p>
            <p className="mt-2 text-3xl font-bold text-white">Rs. {totalPrice}</p>
            <p className="mt-2 text-sm text-slate-300">{cartItems.length} items selected</p>
          </div>

          <div className="mt-5 rounded-xl border border-white/8 bg-[#0f1722] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Static Payment Options</p>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>Cash on Delivery</p>
              <p>UPI on Delivery</p>
              <p>Card on Delivery</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-white/8 bg-[#0f1722] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Items Summary</p>
            <div className="mt-3 space-y-3">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between gap-3 text-sm text-slate-300">
                  <p>{item.name} x {item.quantity}</p>
                  <p>Rs. {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-soft">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="rounded-lg border border-white/10 bg-[#0f1722] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-[#c49a6c]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="rounded-lg border border-white/10 bg-[#0f1722] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-[#c49a6c]"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="rounded-lg border border-white/10 bg-[#0f1722] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-[#c49a6c]"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Delivery address"
              required
              className="rounded-lg border border-white/10 bg-[#0f1722] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-[#c49a6c]"
            />
          </div>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="4"
            placeholder="Extra note"
            className="mt-4 w-full rounded-lg border border-white/10 bg-[#0f1722] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-[#c49a6c]"
          />

          <select
            name="paymentOption"
            value={formData.paymentOption}
            onChange={handleChange}
            className="mt-4 w-full rounded-lg border border-white/10 bg-[#0f1722] px-4 py-3 text-white outline-none focus:border-[#c49a6c]"
          >
            <option>Cash on Delivery</option>
            <option>UPI on Delivery</option>
            <option>Card on Delivery</option>
          </select>

          {status.message && (
            <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-lg bg-[#c49a6c] px-6 py-3 font-semibold text-[#111827] transition hover:bg-[#d7ab7a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </section>
  );
}
