import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatPrice } from "../utils/format";

export default function Success() {
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order) {
      const savedOrder = localStorage.getItem("last-order");
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }
  }, [order]);

  return (
    <section className="mx-auto flex max-w-4xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] bg-white p-8 text-center shadow-[0_24px_90px_rgba(15,23,42,0.12)] sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl">
          🎉
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-950">Order Placed Successfully 🎉</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Thank you for your purchase.</p>

        {order ? (
          <div className="mt-8 rounded-3xl bg-slate-50 p-6 text-left ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Order Details</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-950">Product:</span> {order.productName}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Price:</span> {formatPrice(order.price)}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Order Date:</span>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Order ID:</span> {order._id}
              </p>
            </div>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Back to Products
          </Link>
          <Link
            to="/"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}
