import "./App.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import ResetPassword from "./Components/ResetPassword";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./Components/ForgotPassword";
import WishlistPage from "./Components/WishlistPage";
import CartPage from "./Components/CartPage";
import ProductView from "./Components/ProductView";
import { useProductsStore } from "./Store/useProductsStore";
import ScrollToTop from "./Components/ScrollToTop";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import Orders from "./Components/Orders";
import Products from "./Components/Products";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { getProducts } = useProductsStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className=" size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme="light">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productview/:id" element={<ProductView />} />
        <Route path="/changepassword" element={<ResetPassword />} />
        <Route
          path="/wishlist"
          element={authUser ? <WishlistPage /> : <Navigate to="/" />}
        />{" "}
        <Route
          path="/cart"
          element={authUser ? <CartPage /> : <Navigate to="/" />}
        />
        <Route
          path="/orders"
          element={authUser ? <Orders /> : <Navigate to="/" />}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/Cancel" element={<Cancel />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
