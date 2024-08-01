import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { storage } from "../../../service/firebase";
import HttpRequest from "../../../service/axios/Axios";

export default function ListProduct({
  fetchDataProduct,
  setFetchDataProduct,
  onHandleEditProduct,
}) {
  console.log(fetchDataProduct);

  const onHandleDeleteProduct = async (item) => {
    try {
      if (item.imageUrl) {
        const urlImage = ref(storage, item.imageUrl);
        const desertRef = ref(storage, urlImage.fullPath);

        // Delete the file
        await deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            return alert("Xóa thất bại, vui lòng thử lại");
          });
      }
      await HttpRequest.delete(`painting/delete/${item.paintingId}`);

      const filteredPosts = fetchDataProduct.filter(
        (b) => b.paintingId !== item.paintingId
      );

      // toast.success('Xóa thành công');
      alert("Xóa thành công");
      return setFetchDataProduct(filteredPosts);
    } catch (error) {
      alert("Xóa thất bại");
    }
  };

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Tên tranh</th>
            <th scope="col">Giá</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Ảnh</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          {fetchDataProduct.map((item) => (
            <tr key={item.paintingId}>
              <th scope="row">{item.paintingId}</th>
              <td>{item.title.substring(0, 12)}...</td>
              <td>${item.price}</td>
              <td>{item.paintingDescription.substring(0, 90)}...</td>
              <td>
                <img
                  className="card-img-top p-3 "
                  src={`${item.imageUrl}`}
                  alt="Card"
                  style={{ height: "200px" }}
                />
              </td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => onHandleDeleteProduct(item)}
                >
                  Xóa
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => onHandleEditProduct(item)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
