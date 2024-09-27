import React, { useState } from "react";
import HttpRequest from "../../../service/axios/Axios";
import { toast } from "react-toastify";

export default function ChangePass({
  setDataUser,
  dataUser,
  user,
  handleisChangePass,
  handleUpdateProfile,
}) {
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();
  const [rePasswordNew, setRePasswordNew] = useState();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (!passwordOld || !passwordNew || !rePasswordNew) {
        return toast.warning("Vui lòng nhập đầy đủ");
      }
      if (passwordOld !== dataUser.password) {
        return toast.error("Mật khẩu cũ không chính xác");
      }
      if (passwordNew !== rePasswordNew) {
        return toast.error("Mật khẩu nhập lại không trùng khớp");
      }
      await HttpRequest({
        method: "PUT",
        url: `http://localhost:8000/user/update/${user.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...user,
          password: passwordNew,
        },
      })
        .then((res) => {
          toast.success("Cập nhật thành công");
          localStorage.setItem("user", JSON.stringify(res.data));
          setDataUser(res.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Cập nhật thất bại");
        });
    } catch (error) {}
  };

  return (
    <form className="mt-3">
      <div className="col-md-12 row">
        <div className="col-md-6 py-3">
          <label className="mr-3 w-25 font-medium">Mật khẩu cũ</label>
          <input
            className="form-control w-75 d-inline-block"
            onChange={(e) => setPasswordOld(e.target.value)}
            // value={user.firstname}
            type="password"
            placeholder="Mật khẩu cũ"
          />
        </div>

        <div className="col-md-6 py-3">
          <label className="mr-3 w-25 font-medium">Mật khẩu mới</label>
          <input
            className="form-control w-75 d-inline-block"
            type="password"
            onChange={(e) => setPasswordNew(e.target.value)}
            // value={user.lastname}
            placeholder="Mật khẩu mới"
          />
        </div>

        <div className="col-md-6 py-3">
          <label className="mr-3 w-100 font-medium">Nhập lại mật khẩu</label>
          <input
            className="form-control w-75 d-inline-block"
            // value={user.phone}
            onChange={(e) => setRePasswordNew(e.target.value)}
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
      </div>
      <div className="text-center mt-5 gap-3 d-flex">
        <button
          // Disable nút nếu không có sự thay đổi trong profile
          onClick={handleChangePassword}
          className="btn btn-primary py-2 px-5 font-bold disabled:bg-secondary"
        >
          Lưu thay đổi
        </button>
        <button
          // Disable nút nếu không có sự thay đổi trong profile
          onClick={() => handleisChangePass()}
          className="btn btn-danger py-2 px-5 font-bold disabled:bg-secondary"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
