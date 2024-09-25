import React from "react";

export default function Table({ filteredProducts }) {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <th>STT</th>
          <th>Ảnh</th>
          <th>Người bán</th>
          <th>Tên sản phẩm</th>
          <th>Miêu tả</th>
          <th>Giá</th>
          <th>Tình trạng</th>
        </thead>
        <tbody>
          {filteredProducts &&
            filteredProducts.map((item, index) => (
              <tr key={item.paintingId}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${item.imageUrl}`}
                    alt="##"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{item.user && item.user.email}</td>
                <td>{item.title}</td>
                <td>{item.paintingDescription}</td>
                <td>{item.price}</td>
                <td
                  className={`${
                    item.status === false ? "text-primary" : "text-success"
                  }`}
                >
                  {item.status === false ? "Đang bán" : "Đã bán"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
