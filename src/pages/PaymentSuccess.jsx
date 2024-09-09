import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <>
      <div>
        <h1 className="text-success pt-5">Thanh toán thành công</h1>
        <p className="text-success">
          <Icon icon="mdi:success-bold" width="96" height="96" />
        </p>
        <Link to="/" className="btn  btn-outline-dark mx-4">
          <i className="fa fa-arrow-left"></i> Quay lại trang chủ
        </Link>
        <Link to="/member/order" className="btn btn-outline-dark mx-4">
          Đơn hàng của tôi
        </Link>
      </div>
    </>
  );
}
