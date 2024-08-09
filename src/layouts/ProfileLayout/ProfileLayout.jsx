import React from "react";
import { Navbar } from "../../components";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function ProfileLayout() {
  return (
    <>
      <Navbar />

      <main className="bg-light py-5 h-100">
        <div className="container w-100 mx-auto d-flex">
          <div className="w-25 shadow-lg border border-light bg-white rounded-md">
            <h1 className="text-center text-xl font-bold text-uppercase text-danger py-3">
              Tài khoản
            </h1>
            <hr />
            <ul className="list-unstyled pb-3">
              <li className="d-flex justify-content-center align-items-center">
                <NavLink
                  to="/member/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "d-flex align-items-center px-3 py-2 text-primary font-weight-semibold w-100"
                      : "d-flex align-items-center px-3 py-2 text-dark hover-text-primary hover-bg-light w-100"
                  }
                >
                  <Icon icon="ri:user-settings-line" className="mr-2" />
                  Thông tin tài khoản
                </NavLink>
              </li>

              <li className="d-flex justify-content-center align-items-center">
                <NavLink
                  to="/member/Product"
                  className={({ isActive }) =>
                    isActive
                      ? "d-flex align-items-center px-3 py-2 text-primary font-weight-semibold w-100"
                      : "d-flex align-items-center px-3 py-2 text-dark hover-text-primary hover-bg-light w-100"
                  }
                >
                  <Icon icon="ri:user-settings-line" className="mr-2" />
                  Quản lý sản phẩm
                </NavLink>
              </li>
              {/* <li>
              <NavLink
                to="/member/address"
                className={({ isActive }) =>
                  isActive
                    ? 'd-flex align-items-center px-3 py-2 text-primary font-weight-semibold w-100'
                    : 'd-flex align-items-center px-3 py-2 text-dark hover-text-primary hover-bg-light w-100'
                }
              >
                <Icon icon="mdi:address-marker-outline" className="mr-2" />
                Sổ địa chỉ
              </NavLink>
            </li> */}
              <li>
                <NavLink
                  to="/member/order"
                  className={({ isActive }) =>
                    isActive
                      ? "d-flex align-items-center px-3 py-2 text-primary font-weight-semibold w-100"
                      : "d-flex align-items-center px-3 py-2 text-dark hover-text-primary hover-bg-light w-100"
                  }
                >
                  <Icon
                    icon="icon-park-outline:transaction-order"
                    className="mr-2"
                  />
                  Đơn hàng của tôi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/member/notification"
                  className={({ isActive }) =>
                    isActive
                      ? "d-flex align-items-center px-3 py-2 text-primary font-weight-semibold w-100"
                      : "d-flex align-items-center px-3 py-2 text-dark hover-text-primary hover-bg-light w-100"
                  }
                >
                  <Icon icon="solar:bell-outline" className="mr-2" />
                  Thông báo
                </NavLink>
              </li>
              {/* <li>
              <NavLink
                to="/member/myvoucher"
                className={({ isActive }) =>
                  isActive
                    ? 'd-flex align-items-center px-3 py-2 text-primary font-weight-semibold w-100 border-bottom'
                    : 'd-flex align-items-center px-3 py-2 text-dark hover-text-primary hover-bg-light w-100 border-bottom'
                }
              >
                <Icon icon="mdi:voucher-outline" className="mr-2" />
                Ví voucher
              </NavLink>
            </li> */}
            </ul>
          </div>
          <div className="w-100 ml-3 bg-white rounded-lg p-3">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
