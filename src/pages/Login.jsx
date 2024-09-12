import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { login, setIsLogin, setUser } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import HttpRequest from "../service/axios/Axios";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const route = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    localStorage.removeItem("user");

    // Kiểm tra giá trị của email và password
    if (!email || !password) {
      // Hiển thị lỗi bên dưới form
      toast.warning("Vui lòng nhập email và mật khẩu");
      return;
    }

    try {
      const res = await HttpRequest.get("/user/list");
      const existingAccount = res.data.find(
        (account) => account.email === email
      );
      if (existingAccount) {
        if (existingAccount.password === password) {
          dispatch(login({ email, password }));
          localStorage.setItem("user", JSON.stringify(existingAccount));
          dispatch(setIsLogin(true));
          // window.location.href = "/";
          route("/");
        } else {
          toast.error("Sai mật khẩu.");
          return;
        }
      } else {
        alert("Không có tài khoản có email bạn nhập.");
      }
    } catch (error) {
      console.error(error);
      alert("Kết nối server thất bại. Vui lòng thử lại sau.");
    }
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
