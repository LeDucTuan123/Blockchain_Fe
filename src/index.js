import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import {
  Home,
  Product,
  Products,
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
// import DetailProduct from "./pages/DetailProduct";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
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

        {/* //profile */}
        <Route path="/member" element={<ProfileLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="product" element={<ProductPainting />} />
          <Route path="order" element={<Orther />} />
          <Route path="address" element={<h1>Địa chỉ</h1>} />
          <Route path="notification" element={<h1>Thông báo</h1>} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
