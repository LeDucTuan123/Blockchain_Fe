import React, { useEffect, useState } from "react";
import Table from "./Table";
import HttpRequest from "../../../service/axios/Axios";

export default function AdminOrderPage() {
  const [order, setOrder] = useState([]);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        const res = await HttpRequest.get(`/order/ordersuccess/${user.id}`);
        setOrder(res.data);
        console.log("res: ", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataOrder();
  }, [user.id]);

  return (
    <>
      <div className="d-flex row">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <h5>Danh sách sản phẩm</h5>
          <select
            class="form-select"
            style={{ width: "150px" }}
            aria-label="Default select example"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="Đã bán">Đã bán</option>
            <option value="Đang bán">Đang bán</option>
          </select>
        </div>

        <Table order={order} />
      </div>
    </>
  );
}
