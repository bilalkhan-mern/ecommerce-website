import { useEffect, useState } from "react";

const slides = [
  {
    tag: "Formal collection",
    title: "Sharp shirts, tailored pants and clean office layers.",
    text: "Discover premium looks for meetings, events and polished everyday wear.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
    search: "formal"
  },
  {
    tag: "Women edit",
    title: "Dresses, kurtis, jackets and easy everyday styles.",
    text: "Fresh looks designed for workwear, festive dressing and relaxed weekends.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
    search: "dress"
  },
  {
    tag: "Kids and casual",
    title: "Playwear, hoodies and party picks for every season.",
    text: "Colorful clothing for movement, comfort and cheerful family occasions.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    search: "kids"
  }
];

export default function Hero({ onHeroSelect }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentSlide = slides[activeSlide];

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-[2rem] bg-brand-ink shadow-soft"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(17, 24, 39, 0.86), rgba(17, 24, 39, 0.35)), url(${currentSlide.image})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="grid min-h-[470px] gap-8 px-6 py-8 text-white sm:px-8 lg:grid-cols-[1fr_300px] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.32em] text-brand-sand">{currentSlide.tag}</p>
            <h1 className="mt-4 max-w-2xl font-['Playfair_Display'] text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {currentSlide.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">{currentSlide.text}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onHeroSelect(currentSlide.search)}
                className="rounded-lg bg-brand-clay px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b16744]"
              >
                Shop This Collection
              </button>
              <a
                href="#shop"
                className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View All Products
              </a>
            </div>
          </div>

          <div className="grid gap-3 self-end">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`rounded-xl border px-4 py-4 text-left transition ${
                  index === activeSlide
                    ? "border-white/40 bg-white/15"
                    : "border-white/10 bg-black/15 hover:bg-white/10"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-brand-sand">{slide.tag}</p>
                <p className="mt-2 text-sm font-semibold text-white">{slide.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
