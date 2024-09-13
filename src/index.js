import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import {
  Home,
  Product,
  Products as PRS,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";
// import Routee from "./route";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { Profile } from "./pages/Profile/Profile";
import { Orther } from "./pages/Profile/Orther";
import { ProductPainting } from "./pages/Profile/Product";
import { store } from "./redux/store";
import Wallet from "./pages/Profile/MyWallet/Wallet";
import PaymentSuccess from "./pages/PaymentSuccess";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Products from "./components/Products";
import { ToastContainer } from "react-toastify";
import { AdminLayout } from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import { AdminProductPage } from "./pages/Admin/Product";
import { AdminUserPage } from "./pages/Admin/User";
import { AdminOrderPage } from "./pages/Admin/Order";
// import DetailProduct from "./pages/DetailProduct";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      // transition: Bounce,
    />
    {/* Same as */}
    <ToastContainer />
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<PRS />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/profile/" element={<PageNotFound />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="painting/:searchengine" element={<Products />} />
        </Route>

        {/* //profile */}
        <Route path="/member" element={<ProfileLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="product" element={<ProductPainting />} />
          <Route path="order" element={<Orther />} />
          <Route path="address" element={<h1>Địa chỉ</h1>} />
          <Route path="notification" element={<h1>Thông báo</h1>} />
          <Route path="mywallet" element={<Wallet />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index={true} element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="user" element={<AdminUserPage />} />
          <Route path="setting" element={<h1>setting</h1>} />
          <Route path="order" element={<AdminOrderPage />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
