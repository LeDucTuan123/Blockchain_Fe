import React, { useEffect, useState } from "react";
import { setIsLogin } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const handleShowSidebar = () => setIsShowSidebar(!isShowSidebar);

  // const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const isAdmin = localStorage.getItem("authority");
    if (!isAdmin) {
      // navigate("/error");
    }
  }, [user]);

  return (
    <div className="container-fluid p-0 m-0 " style={{ height: "100vh" }}>
      <div className="d-flex">
        <div
          className={`${
            isShowSidebar ? "col-2" : "col-1"
          } bg-dark transition-all`}
          style={{ transitionDuration: "300ms", height: "100vh" }}
        >
          <Sidebar
            isShowSidebar={isShowSidebar}
            onHandleShowSidebar={handleShowSidebar}
          />
        </div>
        <div style={{ height: "100vh", width: "100%" }}>
          <div className=" position-relative">
            <Header />

            <div
              className="p-5 overflow-auto"
              style={{
                overflowY: "scroll",
                height: "100vh",
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
