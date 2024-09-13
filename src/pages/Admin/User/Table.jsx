import React from "react";

export default function Table({ filteredUser }) {
  const filterClassNameRole = (role) => {
    if (role === "ADMIN") {
      return "text-success";
    }
    if (role === "ARTIST") {
      return "text-primary";
    }
    if (role === "CUSTOMER") {
      return "text-secondary";
    }
  };

  return (
    <>
      <table className="table table-hover w-100">
        <thead>
          <th>STT</th>
          <th>Họ</th>
          <th>Tên</th>
          <th>email</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Quyền</th>
          <th>Địa chỉ ví</th>
        </thead>
        <tbody>
          {filteredUser &&
            filteredUser.map((item, index) => (
              <tr key={item.paintingId}>
                <td>{index + 1}</td>

                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td className={`${filterClassNameRole(item.role)}`}>
                  {item.role}
                </td>
                <td>{item.wallet}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
