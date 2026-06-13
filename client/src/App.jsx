import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { api, authConfig } from "./api";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Success from "./pages/Success";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("ecommerce-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("ecommerce-token") || "");
  const [checkingSession, setCheckingSession] = useState(true);
  const [authMessage, setAuthMessage] = useState("");
  const [orderingId, setOrderingId] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductsError("");
        const response = await api.get("/api/products");
        setProducts(response.data.products || []);
      } catch (error) {
        setProductsError("Products could not be loaded. Please make sure the backend is running.");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        const response = await api.get("/api/auth/me", authConfig(token));
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("ecommerce-token");
        localStorage.removeItem("ecommerce-user");
        localStorage.removeItem("pending-product-id");
        setToken("");
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    verifySession();
  }, [token]);

  useEffect(() => {
    const continuePendingPurchase = async () => {
      if (!user || !token) {
        return;
      }

      const pendingProductId = localStorage.getItem("pending-product-id");
      if (!pendingProductId) {
        return;
      }

      try {
        const response = await api.get(`/api/products/${pendingProductId}`);
        await placeOrder(response.data.product);
      } catch (error) {
        setAuthMessage("We could not continue the saved purchase. Please try again from Products.");
      }
    };

    continuePendingPurchase();
  }, [user, token]);

  useEffect(() => {
    if (!authMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setAuthMessage("");
    }, 3500);

    return () => window.clearTimeout(timeoutId);
  }, [authMessage]);

  const handleAuthSuccess = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("ecommerce-token", data.token);
    localStorage.setItem("ecommerce-user", JSON.stringify(data.user));
    setAuthMessage("Welcome back! Your session is saved in localStorage.");
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("ecommerce-token");
    localStorage.removeItem("ecommerce-user");
    localStorage.removeItem("pending-product-id");
    navigate("/");
  };

  const placeOrder = async (product) => {
    try {
      setOrderingId(product._id);
      const response = await api.post(
        "/api/orders",
        { productId: product._id },
        authConfig(token)
      );

      localStorage.setItem("last-order", JSON.stringify(response.data.order));
      localStorage.removeItem("pending-product-id");
      navigate("/success", { state: { order: response.data.order } });
    } catch (error) {
      const message = error.response?.data?.message || "Order placement failed.";
      setAuthMessage(message);
    } finally {
      setOrderingId("");
    }
  };

  const handleBuyNow = (product) => {
    if (!user || !token) {
      localStorage.setItem("pending-product-id", product._id);
      navigate("/login", {
        state: {
          from: location.pathname,
          message: "Please log in to place your order."
        }
      });
      return;
    }

    placeOrder(product);
  };

  const suggestedProducts = products.slice(0, 4);
  const discountProducts = [...products].sort((left, right) => right.discount - left.discount).slice(0, 6);

  const handleViewDetails = (product) => {
    navigate("/products", { state: { selectedProductId: product._id } });
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4 text-slate-700">
        <div className="rounded-3xl bg-white/85 px-6 py-5 shadow-soft ring-1 ring-black/5">
          Checking your session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar user={user} onLogout={handleLogout} />

      {authMessage ? (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {authMessage}
          </div>
        </div>
      ) : null}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                suggestedProducts={suggestedProducts}
                discountProducts={discountProducts}
                loading={loadingProducts}
                error={productsError}
                onBuyNow={handleBuyNow}
                onViewDetails={handleViewDetails}
                user={user}
              />
            }
          />
          <Route
            path="/products"
            element={
              <Products
                products={products}
                loading={loadingProducts}
                error={productsError}
                onBuyNow={handleBuyNow}
                orderingId={orderingId}
                user={user}
                onViewDetails={handleViewDetails}
              />
            }
          />
          <Route
            path="/login"
            element={<Login onAuthSuccess={handleAuthSuccess} user={user} />}
          />
          <Route
            path="/register"
            element={<Register onAuthSuccess={handleAuthSuccess} user={user} />}
          />
          <Route
            path="/success"
            element={
              <RequireAuth user={user}>
                <Success />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
