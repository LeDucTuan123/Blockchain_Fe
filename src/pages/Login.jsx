import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { login, setIsLogin } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const route = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    localStorage.removeItem("user");

    // Kiểm tra giá trị của email và password
    if (email === "" || password === "") {
      // Hiển thị lỗi bên dưới form
      const errorElement = document.querySelector("#error");

      if (errorElement && errorElement.classList) {
        errorElement.classList.remove("hidden");
        errorElement.textContent = "Vui lòng nhập email và mật khẩu";
      }

      // Chặn không cho submit form
      return;
    } else {
      // Ẩn lỗi
      const errorElement = document.querySelector("#error");
      errorElement?.classList.add("hidden");
    }

    dispatch(login({ email, password }));
    dispatch(setIsLogin(true));
    route("/");
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  class="my-2 mx-auto btn btn-dark"
                  type="submit"
                  // disabled
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
