import { useEffect, useState } from "react";
import HttpRequest from "../../../service/axios/Axios";
import Table from "./Table";

export default function AdminUserPage() {
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const res = await HttpRequest.get("/user/list");
        setUser(res.data);
        console.log("res: ", res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataProduct();
  }, []);

  const filteredUser = user.filter((u) => {
    if (filter === "all") return true;
    if (filter === "Admin") return u.role === "ADMIN";
    if (filter === "ARTIST") return u.role === "ARTIST";
    if (filter === "CUSTOMER") return u.role === "CUSTOMER";
  });
  console.log(filteredUser);
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
          <h5>Danh sách Người dùng</h5>
          <select
            class="form-select"
            style={{ width: "150px" }}
            aria-label="Default select example"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="Admin">Admin</option>
            <option value="ARTIST">Người bán</option>
            <option value="CUSTOMER">Người dùng</option>
          </select>
        </div>

        <Table filteredUser={filteredUser} />
      </div>
    </>
  );
}
