import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

const List_Item_Sidebar = [
  {
    id: 1,
    title: "Dashboard",
    icon: "lucide:layout-dashboard",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Sản phẩm",
    icon: "iconoir:book",
    path: "/admin/products",
  },
  {
    id: 3,
    title: "Người dùng",
    icon: "lucide:user-round",
    path: "/admin/user",
  },
  // {
  //   id: 4,
  //   title: "Đơn hàng",
  //   icon: "ph:package",
  //   path: "/admin/bill",
  // },
  // {
  //   id: 5,
  //   title: "Voucher",
  //   icon: "streamline:tickets",
  //   path: "/admin/voucher",
  // },
  // {
  //   id: 6,
  //   title: "Thể loại",
  //   icon: "uil:create-dashboard",
  //   path: "/admin/category",
  // },
  // {
  //   id: 7,
  //   title: "Thông báo",
  //   icon: "heroicons-outline:bell",
  //   path: "/admin/notification",
  // },
  {
    id: 8,
    title: "Đơn hàng",
    icon: "fluent:person-support-24-regular",
    path: "/admin/order",
  },
  {
    id: 9,
    title: "Khác",
    icon: "fluent:more-circle-16-regular",
    path: "/admin/orther",
  },
];

export default function Sidebar({ isShowSidebar, onHandleShowSidebar }) {
  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="d-flex align-items-center mb-3 border-bottom border-secondary pb-2">
        {isShowSidebar ? (
          <>
            <div className="d-flex align-items-center gap-5">
              <Link to="/">
                <img
                  className="rounded-circle"
                  width={80}
                  height={80}
                  src={
                    "https://i.seadn.io/s/primary-drops/0x7e50af303a0422ebec6bc198034a2430bbe0195c/32578588:about:media:fac757ed-80e3-47ba-b2ec-365eeb04f070.gif?auto=format&dpr=1&w=1920"
                  }
                  alt="Logo"
                />
              </Link>
              <Icon
                icon="line-md:close-to-menu-transition"
                fontSize={40}
                className="text-light cursor-pointer"
                onClick={() => onHandleShowSidebar()}
              />
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <Icon
              icon="line-md:menu-to-close-transition"
              fontSize={40}
              className="text-light cursor-pointer"
              onClick={() => onHandleShowSidebar()}
            />
          </div>
        )}
      </div>

      <div className="d-flex flex-column justify-between h-100">
        <div className="flex-grow-1">
          {List_Item_Sidebar.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive
                  ? "text-light bg-primary rounded py-2 px-3 d-block"
                  : "text-light py-2 px-3 d-block "
              }
            >
              <div
                className={`d-flex align-items-center ${
                  isShowSidebar ? "gap-3" : "justify-center"
                }`}
              >
                <Icon icon={item.icon} fontSize={32} />
                {isShowSidebar && <span>{item.title}</span>}
              </div>
            </NavLink>
          ))}
        </div>

        <div className="text-light pt-3">
          <hr />
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center">
              <div
                className={`d-flex align-items-center ${
                  isShowSidebar ? "gap-3" : "justify-center"
                } w-100 py-2`}
              >
                <Icon icon="line-md:cog-loop" fontSize={32} />
                {isShowSidebar && <span>Setting</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
