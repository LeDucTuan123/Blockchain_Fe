import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import HttpRequest from "../service/axios/Axios";
import { toast } from "react-toastify";
const Register = () => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [passwprdRe, setPasswordRe] = useState();
  const navigate = useNavigate();

  function handleSignUp() {
    HttpRequest.get("/user/list")
      .then((res) => {
        const existingAccount = res.data.find(
          (account) => account.email === email
        );
        if (existingAccount) {
          toast.warning("Email đã tồn tại");
        } else {
          // Tiếp tục với xử lý đăng ký khi không có tài khoản nào có email đã nhập
          if (
            !email ||
            !password ||
            !passwprdRe ||
            !phone ||
            !firstname ||
            !lastname
          ) {
            toast.warning("Vui lòng điền đầy đủ thông tin.");
            return;
          }
          if (phone.length !== 11) {
            toast.warning("Số điện thoại 11 số.");
            return;
          }

          if (password === passwprdRe) {
            HttpRequest.post(
              "/api/v1/auth/signup",
              {
                email,
                password,
                role: "CUSTOMER",
                phone,
                lastname,
                firstname,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => {
                toast.success("Đăng ký thành công");
                navigate("/login", { state: { email, password } });
              })
              .catch((error) => {
                console.log(error);
                toast.error("Đăng ký thất bại");
              });
          } else {
            toast.warning("Xác nhận mật khẩu không khớp");
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Đã có lỗi xảy ra khi kiểm tra tài khoản.");
      });
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Đăng ký tài khoản</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <div className="d-flex gap-2">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Họ"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <label for="firstname">Họ</label>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Tên"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <label for="lastname">Tên</label>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="email">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="phone"
                placeholder="0123456789"
                onChange={(e) => setPhone(e.target.value)}
              />
              <label for="phone">Số điện thoại</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="*****"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="password">Mật khẩu</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="*****"
                onChange={(e) => setPasswordRe(e.target.value)}
              />
              <label for="password">Nhập lại mật khẩu</label>
            </div>

            <div className="my-3">
              <p>
                Already has an account?{" "}
                <Link
                  to="/login"
                  className="text-decoration-underline text-info"
                >
                  Login
                </Link>{" "}
              </p>
            </div>
            <div className="text-center">
              <button
                className="my-2 mx-auto btn btn-dark"
                onClick={handleSignUp}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
