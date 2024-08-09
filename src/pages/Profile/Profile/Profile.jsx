import React from "react";

export default function Profile() {
  return (
    <div className="w-100 rounded-lg">
      <h1 className="text-uppercase text-lg font-bold">Thông tin tài khoản</h1>
      <form className="mt-3">
        <div className="col-md-12 row">
          <div className="col-md-6 py-3">
            <label className="mr-3 w-25 font-medium">Họ:</label>
            <input
              className="form-control w-75 d-inline-block"
              type="text"
              placeholder="Nhập họ"
            />
          </div>

          <div className="col-md-6 py-3">
            <label className="mr-3 w-25 font-medium">Tên:</label>
            <input
              className="form-control w-75 d-inline-block"
              type="text"
              placeholder="Nhập tên"
            />
          </div>

          <div className="col-md-6 py-3">
            <label className="mr-3 w-100 font-medium">Số điện thoại:</label>
            <input
              disabled
              className="form-control w-75 d-inline-block"
              type="text"
              placeholder="Chưa có số điện thoại"
            />
          </div>
          <div className="col-md-6 py-3 ">
            <label className="mr-3 w-25 font-medium">Email:</label>
            <div className="relative w-75">
              <input
                disabled
                className="form-control w-100 d-inline-block"
                type="email"
                placeholder="Chưa có email"
              />
              {/* <span
                className="position-absolute cursor-pointer text-primary font-bold"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                Thay đổi
              </span> */}
            </div>
          </div>

          <div className="col-md-6 py-3">
            <label className="mr-3 w-25 font-medium">Ngày sinh:</label>
            <input className="form-control w-75 d-inline-block" type="date" />
          </div>
          <div className="col-md-6 py-3">
            <label className="mr-3 w-25 font-medium">Giới tính:</label>
            <br />
            <label className="mr-3">
              <input type="radio" name="gender" value="male" /> Nam
            </label>
            <label>
              <input type="radio" name="gender" value="female" /> Nữ
            </label>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary py-1 px-4">Đổi mật khẩu</button>
          </div>
        </div>
        <div className="text-center mt-5">
          <button
            // Disable nút nếu không có sự thay đổi trong profile

            className="btn btn-primary py-2 px-5 font-bold disabled:bg-secondary"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
