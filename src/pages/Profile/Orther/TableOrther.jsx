import React, { useEffect, useState } from "react";
import HttpRequest from "../../../service/axios/Axios";
import DetailOrder from "./DetailOrder";

export default function TableOrther() {
  const [dataOrder, setDataOrder] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataProductOrder, setDataProductOrder] = useState();
  const [detailOrder, setDetailOrder] = useState();

  useEffect(() => {
    const FetchData = async () => {
      const res = await HttpRequest.get(`/order/ordersuccess/${user.id}`);
      setDataOrder(res.data);
    };
    FetchData();
  }, [user.id]);
  console.log("first: ", dataOrder);

  const handleOnclickModel = (order) => {
    let id = order.orderdetails[0].paintingid;
    HttpRequest.get(`/painting/${id}`).then((res) => {
      console.log(res.data);
      setDataProductOrder(res.data);
      setDetailOrder(order);
      console.log("detailOrder: ", detailOrder);
    });
  };

  return (
    <div className=" w-100 rounded-lg">
      <h1 className="text-uppercase text-lg font-bold">Đơn hàng của tôi</h1>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <button className={`btn btn-outline-secondary font-weight-bold`}>
          Tất cả
        </button>
        <button className={`btn btn-success font-weight-bold`}>
          Đã thanh toán
        </button>
        {/* <button className={`btn btn-primary  font-weight-bold`}>
          Chưa thanh toán
        </button>
        <button className={`btn btn-warning  font-weight-bold`}>
          Đang xử lý
        </button>
        <button
          className={`btn btn-danger 
           font-weight-bold`}
        >
          Đã hủy
        </button> */}
      </div>
      <hr className="my-4" />
      <div className="table-responsive shadow-sm rounded-lg">
        <table className="table table-striped table-hover text-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Ngày mua</th>
              <th scope="col">Người nhận</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <>
            <tbody>
              {dataOrder &&
                // eslint-disable-next-line array-callback-return
                dataOrder.map((item) => (
                  <tr key={item.id}>
                    <td>{item.codeorder}</td>
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
                    <td>{item.receiver}</td>
                    <td>{item.totalamount}</td>
                    <td className="text-center">
                      <span className={`badge badge-success`}>
                        Đã thanh toán
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-link text-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => handleOnclickModel(item)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        </table>
        <DetailOrder
          dataProductOrder={dataProductOrder}
          detailOrder={detailOrder}
        />
      </div>
    </div>
  );
}
