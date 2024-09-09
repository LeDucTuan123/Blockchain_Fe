import React from "react";
import { Footer, Navbar } from "../../components";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {" "}
        {/* Thiết lập container với Flexbox */}
        <Navbar />
        <div className="flex-grow-1 text-center">
          {" "}
          {/* Nội dung chính sẽ chiếm phần còn lại */}
          <Outlet />
        </div>
        <Footer /> {/* Footer sẽ luôn nằm ở cuối */}
      </div>
    </>
  );
}
