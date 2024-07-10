import React from "react";

export default function TableOrther() {
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
        <button className={`btn btn-primary  font-weight-bold`}>
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
        </button>
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
              <tr>
                <td>Code2193812</td>
                <td>02/07/2024</td>
                <td>Lee DDucws Tuanas</td>
                <td>999.999</td>
                <td className="text-center">
                  <span className={`badge badge-success`}>Đã thanh toán</span>
                </td>
                <td className="text-center">
                  <button className="btn btn-link text-danger">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            </tbody>
          </>
        </table>
      </div>
    </div>
  );
}
