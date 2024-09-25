import React, { useState } from "react";
import Form from "./Form";
import HttpRequest from "../../../service/axios/Axios";
import { toast } from "react-toastify";

export default function Product() {
  // const auth = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : null;
  // console.log(auth);

  const [auth, setAuth] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const handleSaleRegister = () => {
    HttpRequest({
      method: "PUT",
      url: `http://localhost:8000/user/update/${auth.id}`,
      data: {
        ...auth,
        role: "ARTIST",
      },
    })
      .then(() => {
        const updatedAuth = { ...auth, role: "ARTIST" };
        setAuth(updatedAuth);
        localStorage.setItem("user", JSON.stringify(updatedAuth));
        toast.success("Đăng ký thành công");
      })
      .catch((err) => console.log("err", err));
    console.log("first");
  };

  return (
    <>
      <div className="p-2">
        {auth && (auth.role === "ARTIST" || auth.role === "ADMIN") ? (
          <Form />
        ) : (
          <div className=" text-danger">
            <p>
              Tài khoản của bạn không có quyền đăng bán{" "}
              <span
                onClick={handleSaleRegister}
                className="text-primary "
                style={{ cursor: "pointer" }}
              >
                {" "}
                (Đăng ký)
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
