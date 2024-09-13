import React, { useEffect, useState } from "react";
import Table from "./Table";
import HttpRequest from "../../../service/axios/Axios";

export default function AdminProductPage() {
  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const res = await HttpRequest.get("/painting/list");
        setProduct(res.data);
        console.log("res: ", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataProduct();
  }, []);

  const filteredProducts = product.filter((item) => {
    if (filter === "all") return true;
    if (filter === "Đang bán") return item.status === false;
    if (filter === "Đã bán") return item.status === true;
  });

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

        <Table filteredProducts={filteredProducts} />
      </div>
    </>
  );
}
