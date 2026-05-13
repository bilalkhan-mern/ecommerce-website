const steps = [
  { id: "cart", label: "Cart" },
  { id: "checkout", label: "Checkout" },
  { id: "confirmed", label: "Confirmed" }
];

export default function ProgressSteps({ currentStep }) {
  const activeIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-[#111827] p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => {
            const isActive = index <= activeIndex;

            return (
              <div
                key={step.id}
                className={`rounded-xl border px-4 py-4 ${
                  isActive ? "border-[#c49a6c] bg-[#1b2432]" : "border-white/8 bg-[#0f1722]"
                }`}
              >
                <p className={`text-xs uppercase tracking-[0.22em] ${isActive ? "text-[#d9b38c]" : "text-slate-500"}`}>
                  Step {index + 1}
                </p>
                <p className={`mt-2 text-lg font-semibold ${isActive ? "text-white" : "text-slate-400"}`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
