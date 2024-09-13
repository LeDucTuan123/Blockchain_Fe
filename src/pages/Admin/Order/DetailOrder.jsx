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
                Mã đơn hàng ({detailOrder.codeorder})
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
                  src={`data:image/jpeg;base64,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`}
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
                      {new Date(detailOrder.orderdate).getFullYear() +
                        "-" +
                        (new Date(detailOrder.orderdate).getMonth() + 1)
                          .toString()
                          .padStart(2, "0") +
                        "-" +
                        new Date(detailOrder.orderdate)
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
