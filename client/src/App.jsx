import { useEffect, useState } from "react";
import AccountPanel from "./components/AccountPanel";
import AuthModal from "./components/AuthModal";
import BrowseSections from "./components/BrowseSections";
import CartPage from "./components/CartPage";
import CheckoutSection from "./components/CheckoutSection";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OrderSuccessPage from "./components/OrderSuccessPage";
import ProgressSteps from "./components/ProgressSteps";
import ProductPreviewModal from "./components/ProductPreviewModal";
import ProductGrid from "./components/ProductGrid";

export default function App() {
  const apiBaseUrl = "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("stylecart-token") || "");
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("stylecart-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [orderHistory, setOrderHistory] = useState([]);
  const [productError, setProductError] = useState("");
  const [previewProduct, setPreviewProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [currentStep, setCurrentStep] = useState("cart");
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProductError("");
        const response = await fetch(`${apiBaseUrl}/api/products`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        setProductError("Products load nahi ho pa rahe. Backend server check karo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!token) {
        setOrderHistory([]);
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not fetch orders.");
        }

        setOrderHistory(data.orders || []);
      } catch (error) {
        console.error("Order history error:", error);
      }
    };

    fetchMyOrders();
  }, [token]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const filteredProducts = products.filter((product) => {
    const audienceMatch = selectedAudience === "all" || product.audience === selectedAudience;
    const typeMatch = selectedType === "all" || product.type === selectedType;
    const searchValue = searchTerm.toLowerCase();
    const searchText = [
      product.name,
      product.description,
      product.audience,
      product.type,
      product.section
    ]
      .join(" ")
      .toLowerCase();
    const searchMatch = searchText.includes(searchValue);
    return audienceMatch && typeMatch && searchMatch;
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleNavSelect = ({ audience = "all", type = "all", search = "" }) => {
    setSelectedAudience(audience);
    setSelectedType(type);
    setSearchTerm(search);
    setIsMobileMenuOpen(false);
    setCurrentStep("cart");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const requireAuth = () => {
    openAuthModal("login");
  };

  const handleAuthSuccess = (data) => {
    setToken(data.token);
    setCurrentUser(data.user);
    localStorage.setItem("stylecart-token", data.token);
    localStorage.setItem("stylecart-user", JSON.stringify(data.user));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setToken("");
    setCurrentUser(null);
    setOrderHistory([]);
    localStorage.removeItem("stylecart-token");
    localStorage.removeItem("stylecart-user");
  };

  const handleAddToCart = (product) => {
    if (!currentUser || !token) {
      requireAuth();
      return;
    }

    setCartItems((previous) => {
      const existingProduct = previous.find((item) => item._id === product._id);

      if (existingProduct) {
        return previous.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setPreviewProduct(product);
    setCartMessage(`${product.name} has been added to your cart successfully.`);
    setToastMessage(`${product.name} added to cart`);
    setCurrentStep("cart");
  };

  const handleBuyNow = () => {
    setPreviewProduct(null);
    setCurrentStep("checkout");
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((previous) =>
      previous.map((item) => (item._id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((previous) =>
      previous
        .map((item) => (item._id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((previous) => previous.filter((item) => item._id !== productId));
  };

  const handleOrderSuccess = (order) => {
    setCartItems([]);
    setLastPlacedOrder(order);
    setCurrentStep("confirmed");
    if (token) {
      fetch(`${apiBaseUrl}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => setOrderHistory(data.orders || []))
        .catch((error) => console.error("Order refresh error:", error));
    }
  };

  return (
    <div className="min-h-screen">
      {toastMessage && (
        <div className="fixed right-4 top-4 z-[60] rounded-xl bg-brand-ink px-4 py-3 text-sm font-medium text-white shadow-soft">
          {toastMessage}
        </div>
      )}

      <Header
        cartCount={cartCount}
        currentUser={currentUser}
        isMobileMenuOpen={isMobileMenuOpen}
        onAuthOpen={() => openAuthModal("login")}
        onCartOpen={() => {
          if (!currentUser || !token) {
            requireAuth();
            return;
          }

          setCurrentStep("cart");
          document.getElementById("cart")?.scrollIntoView({ behavior: "smooth" });
        }}
        onLogout={handleLogout}
        onMobileMenuToggle={() => setIsMobileMenuOpen((previous) => !previous)}
        onNavSelect={handleNavSelect}
        selectedAudience={selectedAudience}
        selectedType={selectedType}
        searchTerm={searchTerm}
      />
      <Hero onHeroSelect={(search) => handleNavSelect({ audience: "all", type: "all", search })} />
      <ProgressSteps currentStep={currentStep} />
      <BrowseSections
        onSelectAudience={setSelectedAudience}
        onSelectType={setSelectedType}
        onSelectSearch={setSearchTerm}
      />
      <Filters
        selectedAudience={selectedAudience}
        selectedType={selectedType}
        searchTerm={searchTerm}
        onAudienceChange={setSelectedAudience}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />
      {productError && (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">{productError}</div>
        </div>
      )}
      <ProductGrid products={filteredProducts} loading={loading} onAddToCart={handleAddToCart} />
      {currentStep === "cart" && (
        <CartPage
          cartItems={cartItems}
          totalPrice={totalPrice}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          onRemove={handleRemoveItem}
          onContinueShopping={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
          onProceedToCheckout={() => {
            setCurrentStep("checkout");
            document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
      {currentStep === "checkout" && (
        <CheckoutSection
          apiBaseUrl={apiBaseUrl}
          cartItems={cartItems}
          currentUser={currentUser}
          token={token}
          totalPrice={totalPrice}
          onOrderPlaced={handleOrderSuccess}
          onRequireLogin={() => openAuthModal("login")}
          onBackToCart={() => {
            setCurrentStep("cart");
            document.getElementById("cart")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
      {currentStep === "confirmed" && (
        <OrderSuccessPage
          orderInfo={lastPlacedOrder}
          onBackToShop={() => {
            setCurrentStep("cart");
            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
      <AccountPanel
        currentUser={currentUser}
        orderHistory={orderHistory}
        onLoginClick={() => openAuthModal("login")}
      />
      <Footer onNavSelect={handleNavSelect} />

      <ProductPreviewModal
        product={previewProduct}
        isOpen={Boolean(previewProduct)}
        onBuyNow={handleBuyNow}
        onClose={() => setPreviewProduct(null)}
        message={cartMessage}
      />

      <AuthModal
        apiBaseUrl={apiBaseUrl}
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        onModeChange={() => setAuthMode((previous) => (previous === "login" ? "register" : "login"))}
      />
    </div>
  );
}
