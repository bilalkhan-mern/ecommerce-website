import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";
import { getElectronicsImage } from "../utils/electronicsImages";

const CATEGORY_KEYWORDS = {
  laptops: ["laptop", "notebook", "macbook", "ultrabook", "computer"],
  mobiles: ["mobile", "phone", "smartphone", "android", "iphone"],
  audio: ["audio", "headphone", "earbud", "earphone", "speaker", "sound"],
  wearables: ["wearable", "watch", "band", "fitness"],
  accessories: ["accessory", "accessories", "keyboard", "mouse", "charger", "adapter", "monitor", "power bank", "powerbank"],
  "smart-home": ["smart home", "smart-home", "camera", "security", "router", "doorbell", "home"],
  gaming: ["gaming", "game", "console", "gamer"],
  tablets: ["tablet", "tab", "pad"],
  networking: ["network", "router", "wifi", "wi-fi"]
};

function matchesCategory(product, category) {
  if (!category) {
    return true;
  }

  const text = [product.name, product.brand, product.category, product.description].join(" ").toLowerCase();
  const normalizedCategory = category.toLowerCase();

  if (String(product.category || "").toLowerCase() === normalizedCategory) {
    return true;
  }

  const keywords = CATEGORY_KEYWORDS[normalizedCategory] || [normalizedCategory];
  return keywords.some((keyword) => text.includes(keyword));
}

export default function Products({ products, loading, error, onBuyNow, orderingId, user, onViewDetails }) {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const section = params.get("section");

  useEffect(() => {
    if (!products.length) {
      return;
    }

    const selectedProductId = location.state?.selectedProductId;
    const selectedMatch = selectedProductId ? products.find((product) => product._id === selectedProductId) : null;
    const categoryMatch = category ? products.find((product) => matchesCategory(product, category)) : null;
    const sectionMatch =
      section === "deals"
        ? products.find((product) => product.discount >= 15 || product.oldPrice > product.price)
        : section === "trending"
          ? [...products].sort((left, right) => right.discount - left.discount)[0]
          : section === "new-arrivals"
            ? products[0]
            : null;

    setSelectedProduct(selectedMatch || categoryMatch || sectionMatch || products[0]);
  }, [category, location.state, products, section]);

  let visibleProducts = [...products];

  if (category) {
    visibleProducts = visibleProducts.filter((product) => matchesCategory(product, category));
  }

  if (section === "deals") {
    visibleProducts = visibleProducts.filter((product) => product.discount >= 15 || product.oldPrice > product.price);
  } else if (section === "trending") {
    visibleProducts = [...visibleProducts].sort((left, right) => right.discount - left.discount);
  } else if (section === "new-arrivals") {
    visibleProducts = [...visibleProducts].slice(0, 8);
  }

  const value = search.trim().toLowerCase();
  const searchResults = value
    ? visibleProducts.filter((product) =>
        [product.name, product.description, product.brand].join(" ").toLowerCase().includes(value)
      )
    : visibleProducts;

  const hasSearchResults = searchResults.length > 0;
  const displayedProducts = hasSearchResults ? searchResults : [];
  const discountProducts = [...displayedProducts].sort((left, right) => right.discount - left.discount).slice(0, 3);

  let pageTitle = "Browse every electronics item";
  let pageSubtitle = "Find the latest electronics products stored in MongoDB.";

  if (category) {
    pageTitle = `${category.charAt(0).toUpperCase() + category.slice(1)} products`;
    pageSubtitle = "This category is loaded from the database and shown in product cards.";
  } else if (section === "deals") {
    pageTitle = "Deals and offers";
    pageSubtitle = "Discounted products and special offers from the electronics catalog.";
  } else if (section === "trending") {
    pageTitle = "Trending products";
    pageSubtitle = "Popular products highlighted from the same MongoDB collection.";
  } else if (section === "new-arrivals") {
    pageTitle = "New arrivals";
    pageSubtitle = "Fresh electronics products you can add directly in MongoDB.";
  }

  const handleSelect = (product) => {
    setSelectedProduct(product);
    onViewDetails?.(product);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white shadow-[0_24px_90px_rgba(15,23,42,0.2)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">Product Explorer</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{pageTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">{pageSubtitle}</p>
        <div className="mt-6 max-w-xl">
          <label className="text-sm font-medium text-slate-200" htmlFor="search">
            Search products
          </label>
          <input
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product, brand, or description"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-white/30"
          />
        </div>
      </div>

      {error ? <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      {loading ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="h-[520px] animate-pulse rounded-[2rem] bg-white" />
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[430px] animate-pulse rounded-[1.75rem] bg-white" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <ProductDetail
              product={selectedProduct}
              onBuyNow={onBuyNow}
              onClose={() => setSelectedProduct(displayedProducts[0] || products[0] || null)}
              user={user}
              ordering={orderingId === selectedProduct?._id}
            />
          </div>

          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Discount Picks</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">Featured discount products in cards</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {discountProducts.map((product, index) => (
                <div key={product._id} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        {product.discount}% OFF
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-950">{product.name}</h4>
                      <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
                    </div>
                    <img
                      src={getElectronicsImage(product, index + 30)}
                      alt={product.name}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">All Products</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Browse every electronics item</h2>
            </div>
            <Link to="/" className="text-sm font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4">
              Back to Home
            </Link>
          </div>

          {hasSearchResults ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onBuyNow={onBuyNow}
                  onViewDetails={handleSelect}
                  ordering={orderingId === product._id}
                  user={user}
                  imageIndex={index + 10}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No products matched your search.
            </div>
          )}
        </>
      )}
    </section>
  );
}
