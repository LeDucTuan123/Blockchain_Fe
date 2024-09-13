import React, { useState } from "react";
import DetailOrder from "./DetailOrder";
import HttpRequest from "../../../service/axios/Axios";

export default function Table({ order }) {
  const [dataProductOrder, setDataProductOrder] = useState();
  const [detailOrder, setDetailOrder] = useState();

  const handleOnclickModel = (id, order) => {
    HttpRequest.get(`/painting/${id}`).then((res) => {
      console.log(res.data);
      setDataProductOrder(res.data);
      setDetailOrder(order);
      console.log("detailOrder: ", detailOrder);
    });
  };

  return (
    <>
      <table className="table table-hover">
        <thead>
          <th>Mã đơn hàng</th>
          <th>Ngày đặt hàng</th>
          <th>Tổng tiền</th>
          <th>Địa chỉ nhận hàng</th>
          <th>Tình trạng</th>
          <th>###</th>
        </thead>
        <tbody>
          {order &&
            order.map((item) => (
              <tr key={item.id}>
                <td>{item.codeorder}</td>
                <td>
                  {new Date(item.orderdate).getFullYear() +
                    "-" +
                    (new Date(item.orderdate).getMonth() + 1)
                      .toString()
                      .padStart(2, "0") +
                    "-" +
                    new Date(item.orderdate)
                      .getDate()
                      .toString()
                      .padStart(2, "0")}
                </td>
                <td>{item.totalamount}</td>
                <td>{item.address}</td>
                <td>{item.statuss.statuss}</td>
                <td>
                  <button
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() =>
                      handleOnclickModel(item.orderdetails[0].paintingid, item)
                    }
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DetailOrder
        dataProductOrder={dataProductOrder}
        detailOrder={detailOrder}
      />
    </>
  );
}
