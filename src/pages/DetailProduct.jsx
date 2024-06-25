import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
export default function DetailProduct() {
  const state = useSelector((state) => state.handleCart);

  return (
    <>
      <Navbar />
      <div className="container">
        <div
          className="card mb-3  d-flex flex-row "
          style={{
            // maxWidth: "18rem",
            // backgroundColor: "#2c2c2c",
            color: "white",
            border: "1px solid $333",
          }}
        >
          <img
            src="https://i.seadn.io/s/raw/files/3a5e0e8dda3c238452e7ab5f0dfa3bce.png?auto=format&dpr=1&h=500&fr=1"
            className="card-img-top p-5"
            alt="Artwork"
            style={{ width: "500px" }}
          />
          <div
            className="card-body pt-5"
            style={{ fontSize: "20px", fontWeight: 400, color: "#333" }}
          >
            <h5 className="card-title ">Muraqqa: Neural Impressions</h5>
            <p className="card-text">
              <strong>Tác giả:</strong>
              <br />
              <strong>Thể loại:</strong> phong cảnh
              <br />
              <strong>Giá:</strong> 100$
            </p>
            {/* <div className="d-flex justify-content-between">
              <button className="btn btn-outline-light">
                <i className="bi bi-heart"></i>
              </button>
            </div> */}
            <p className="card-text mt-2">
              <strong>Mô tả:</strong> Muraqqa: Neural Impressions
            </p>
            <button className="btn btn-warning">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}){" "}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
