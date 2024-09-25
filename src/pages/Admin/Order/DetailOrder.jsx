import React from "react";

export default function DetailOrder({ dataProductOrder, detailOrder }) {
  return (
    <>
      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Mã đơn hàng ({detailOrder && detailOrder.codeorder})
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  // src={`${dataProductOrder.imageUrl}`}
                  src={`${dataProductOrder && dataProductOrder.imageUrl}`}
                  alt="###"
                  style={{
                    width: "300px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div class="container pt-3">
                <div class="row align-items-start">
                  <div class="col">
                    <div>
                      <b>Tên:</b> {dataProductOrder && dataProductOrder.title}
                    </div>
                    <div>
                      <b>Người nhận:</b> {detailOrder && detailOrder.receiver}
                    </div>
                  </div>
                  <div class="col">
                    {" "}
                    <div>
                      <b>Tổng tiền:</b>{" "}
                      {dataProductOrder && dataProductOrder.price} (SOL)
                    </div>
                    <div>
                      <b>Ngày đặt:</b>{" "}
                      {new Date(
                        detailOrder && detailOrder.orderdate
                      ).getFullYear() +
                        "-" +
                        (
                          new Date(
                            detailOrder && detailOrder.orderdate
                          ).getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0") +
                        "-" +
                        new Date(detailOrder && detailOrder.orderdate)
                          .getDate()
                          .toString()
                          .padStart(2, "0")}
                    </div>
                  </div>
                </div>
                <div>
                  <b>Địa chỉ nhận hàng:</b> {detailOrder && detailOrder.address}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
