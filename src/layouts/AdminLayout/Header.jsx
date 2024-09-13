import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLogin, setUser } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";

export default function Header() {
  const dispatch = useAppDispatch();
  const [isShow, setIshow] = useState(false);

  // const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user && user.role && user.role === "ADMIN";

  useEffect(() => {
    if (!isAdmin) {
      <Navigate to={"/"} />;
    }
  });

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(setIsLogin(false));
    toast.success("Đăng xuất thành công");
    window.location.href = "/";
  };

  console.log(userLocal);

  return (
    <>
      <div className="bg-dark p-3 d-flex align-items-center text-light ">
        <div className="input-group me-auto w-25">
          <span className="input-group-text bg-white">
            <Icon icon={"ion:search"} fontSize={24} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm..."
          />
        </div>

        <div className="d-flex align-items-center ">
          <Icon
            icon={"tabler:message"}
            fontSize={24}
            className="me-4 cursor-pointer"
          />
          <Icon
            icon={"mdi:bell-outline"}
            fontSize={24}
            className="me-4 cursor-pointer"
          />

          <div
            onClick={() => setIshow(!isShow)}
            className="d-flex align-items-center cursor-pointer "
          >
            <div className="me-3 text-end">
              <div className="fw-bold">
                {userLocal && userLocal.firstname}{" "}
                {userLocal && userLocal.lastname}
              </div>
              {/* <div>{userLocal && userLocal.email}</div> */}
            </div>
            <div
              className="rounded-circle overflow-hidden"
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid",
                cursor: "pointer",
              }}
            >
              <Icon icon="mdi:user" width="38" height="38" />
              {/* <img src="" alt="account" className="w-100 h-100 object-cover" /> */}
            </div>
          </div>

          {isShow && (
            <div
              className="dropdown-menu show mt-2 position-absolute end-0 bg-light shadow position-absolute "
              style={{ width: "260px", top: "64px", left: "880px" }}
            >
              <div className="dropdown-item-text">
                <strong>
                  {userLocal && userLocal.firstname}{" "}
                  {userLocal && userLocal.lastname}
                </strong>
                <br />
                {userLocal && userLocal.email}
              </div>
              <div className="dropdown-divider"></div>
              <NavLink
                to={"/admin/dashboard"}
                className="dropdown-item d-flex align-items-center"
              >
                <Icon icon="lucide:layout-dashboard" className="me-2" />{" "}
                Dashboard
              </NavLink>
              <NavLink
                to={"/admin/setting"}
                className="dropdown-item d-flex align-items-center"
              >
                <Icon icon="ep:setting" className="me-2" /> Settings
              </NavLink>
              <div className="dropdown-divider"></div>
              <button
                onClick={logout}
                className="dropdown-item d-flex align-items-center"
              >
                <Icon icon="lets-icons:on-button" className="me-2" /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
