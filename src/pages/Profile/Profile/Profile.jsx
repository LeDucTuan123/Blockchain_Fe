import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChangePass from "./ChangePass";
import HttpRequest from "../../../service/axios/Axios";
import { toast } from "react-toastify";

// const formUser = {
//   firstname: "",
//   lastname: "",
//   phone: "",
//   address: "",
//   wallet: "",
//   email: "",
//   password: "",
// };

export default function Profile() {
  const [isChangePass, setIsChangePass] = useState(false);
  // const user = useSelector((state) => state.auth?.user);
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataUser, setDataUser] = useState(user);
  console.log(user);
  // console.log("email: ", dataUser.email);
  const handleisChangePass = () => {
    setIsChangePass(!isChangePass);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await HttpRequest({
      method: "PUT",
      url: `http://localhost:8000/user/update/${user.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...user,
        firstname: dataUser.firstname,
        lastname: dataUser.lastname,
        phone: dataUser.phone,
        address: dataUser.address,
        password: dataUser.password,
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
  };

  return (
    <div className="w-100 rounded-lg">
      <h1 className="text-uppercase text-lg font-bold">
        {isChangePass ? "Đổi mật khẩu" : "Thông tin tài khoản"}
      </h1>
      {!isChangePass ? (
        <form className="mt-3">
          <div className="col-md-12 row">
            <div className="col-md-6 py-3">
              <label className="mr-3 w-25 font-medium">Họ:</label>
              <input
                className="form-control w-75 d-inline-block"
                value={dataUser && dataUser.firstname}
                onChange={(e) =>
                  setDataUser((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }))
                }
                type="text"
                placeholder="Nhập họ"
              />
            </div>

            <div className="col-md-6 py-3">
              <label className="mr-3 w-25 font-medium">Tên:</label>
              <input
                className="form-control w-75 d-inline-block"
                type="text"
                onChange={(e) =>
                  setDataUser((prev) => ({ ...prev, lastname: e.target.value }))
                }
                value={dataUser && dataUser.lastname}
                placeholder="Nhập tên"
              />
            </div>

            <div className="col-md-6 py-3">
              <label className="mr-3 w-100 font-medium">Số điện thoại:</label>
              <input
                className="form-control w-75 d-inline-block"
                onChange={(e) =>
                  setDataUser((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={dataUser && dataUser.phone}
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
                  value={dataUser && dataUser.email}
                  onChange={(e) =>
                    setDataUser((prev) => ({ ...prev, email: e.target.value }))
                  }
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
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Địa chỉ
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) =>
                  setDataUser((prev) => ({ ...prev, address: e.target.value }))
                }
                value={dataUser && dataUser.address}
              ></textarea>
            </div>

            {/* <div className="col-md-6 py-3">
            <label className="mr-3 w-25 font-medium">Ngày sinh:</label>
            <input className="form-control w-75 d-inline-block" type="date" />
          </div> */}
            {/* <div className="col-md-6 py-3">
            <label className="mr-3 w-25 font-medium">Giới tính:</label>
            <br />
            <label className="mr-3">
              <input type="radio" name="gender" value="male" /> Nam
            </label>
            <label>
              <input type="radio" name="gender" value="female" /> Nữ
            </label>
          </div> */}
            <div className="mt-4">
              <button
                className="btn btn-light py-1 px-4"
                onClick={handleisChangePass}
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
          <div className="text-center mt-5">
            <button
              // Disable nút nếu không có sự thay đổi trong profile
              onClick={handleUpdateProfile}
              className="btn btn-primary py-2 px-5 font-bold disabled:bg-secondary"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      ) : (
        <ChangePass
          user={user}
          handleisChangePass={handleisChangePass}
          setDataUser={setDataUser}
          dataUser={dataUser}
          handleUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}
