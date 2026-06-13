const ELECTRONICS_IMAGES = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606400082777-0e0b0f0b2d5a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555617117-08e4d2bf3abf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511467687858-23d96c32e0f7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80"
];

function hashString(text) {
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function getElectronicsImage(product, fallbackIndex = 0) {
  const key = `${product?._id || ""}${product?.name || ""}${product?.category || ""}${fallbackIndex}`;
  const hash = key ? hashString(key) : fallbackIndex;
  return ELECTRONICS_IMAGES[hash % ELECTRONICS_IMAGES.length];
}
