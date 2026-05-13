import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: ""
};

export default function AuthModal({ apiBaseUrl, isOpen, mode, onClose, onAuthSuccess, onModeChange }) {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const endpoint = mode === "login" ? "login" : "register";
      const payload =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const response = await fetch(`${apiBaseUrl}/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      onAuthSuccess(data);
      setFormData(initialState);
      setStatus("");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-cocoa">Account</p>
            <h2 className="mt-2 font-['Playfair_Display'] text-3xl text-brand-ink">
              {mode === "login" ? "Login to continue" : "Create your account"}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-brand-cocoa">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "register" && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full rounded-2xl border border-brand-sand bg-brand-cream px-4 py-3 outline-none focus:border-brand-clay"
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className="w-full rounded-2xl border border-brand-sand bg-brand-cream px-4 py-3 outline-none focus:border-brand-clay"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full rounded-2xl border border-brand-sand bg-brand-cream px-4 py-3 outline-none focus:border-brand-clay"
          />

          {status && <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">{status}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-ink px-6 py-3 font-semibold text-white transition hover:bg-brand-cocoa disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          {mode === "login" ? "New user?" : "Already have an account?"}{" "}
          <button type="button" onClick={onModeChange} className="font-semibold text-brand-clay">
            {mode === "login" ? "Create account" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
