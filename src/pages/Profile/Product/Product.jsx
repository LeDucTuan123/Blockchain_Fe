import React from "react";
import Form from "./Form";

export default function Product() {
  const auth = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  console.log(auth);
  return (
    <>
      <div className="p-2">
        {auth && auth.role === "ARTIST" ? (
          <Form />
        ) : (
          <div className=" text-danger">
            <p>Tài khoản của bạn không có quyền đăng bán</p>
          </div>
        )}
      </div>
    </>
  );
}
