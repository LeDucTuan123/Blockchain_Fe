import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { setIsLogin } from "../redux/slices/authSlice";
import { setCountCart } from "../redux/slices/commonSlice";
import HttpRequest from "../service/axios/Axios";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const islogin = useSelector((state) => state.auth?.isLogin);
  const countCart = useSelector((state) => state.common?.countCart);
  console.log("count cart: ", countCart);

  const [auth, setAuth] = useState();

  const isPhantomInstalled = window.phantom?.solana?.isPhantom;

  const userData = localStorage.getItem("user");
  console.log("isPhantomInstalled: ", isPhantomInstalled);
  if (userData) {
    if (!isPhantomInstalled) {
      alert("Hãy cài ví Phantom để có trải nghiệm tốt nhất");
      window.open("https://phantom.app/", "_blank");
    }
  }

  useEffect(() => {
    if (userData) {
      setAuth(JSON.parse(userData)); //
      dispatch(setIsLogin(true));
    }
  }, [countCart, islogin]);

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          {" "}
          Solana
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav m-auto my-2 text-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Trang chủ{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/product">
              Sản phẩm
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/member/profile">
              About
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li> */}
        </ul>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarSupportedContent"
        >
          <div className="w-50 p-2">
            <input
              type="text"
              name="Search"
              id=""
              className="w-100 rounded-3 p-2"
              placeholder="Search"
              style={{ outline: "none", color: "#333" }}
            />
          </div>
          <div className="buttons d-flex text-center">
            <NavLink
              to="/cart"
              className="btn btn-outline-dark m-2 position-relative"
            >
              <i className="fa fa-cart-shopping mr-1"></i>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "yellow",
                  right: "5px",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="position-absolute top-0  "
              >
                <span style={{ fontSize: "12px", color: "#ec8686" }}>
                  {countCart}
                </span>
              </div>
            </NavLink>
            {auth && islogin ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle d-flex align-items-center h-100"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.firstname} {auth.lastname}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center h-100"
                        to="/member/profile"
                      >
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center h-100"
                        to="#"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
