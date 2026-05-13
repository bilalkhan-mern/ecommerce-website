export default function FeaturedBanner() {
  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-[2rem] bg-brand-ink px-8 py-10 text-white shadow-soft lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-sand">Featured collection</p>
          <h2 className="mt-3 font-['Playfair_Display'] text-4xl">Weekend wear that looks premium and feels easy</h2>
        </div>
        <p className="self-end text-sm leading-7 text-slate-200">
          Yeh layout intentionally simple rakha gaya hai, lekin professional feel ke saath. Aap future me isme
          login, wishlist, admin panel aur payment gateway bhi add kar sakte ho.
        </p>
      </div>
    </section>
  );
}
