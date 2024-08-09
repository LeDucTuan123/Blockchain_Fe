import React, { useCallback, useEffect, useState } from "react";
import HttpRequest from "../../../service/axios/Axios";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../service/firebase";
import ListProduct from "./ListProduct";
import { Icon } from "@iconify/react/dist/iconify.js";

const formPainting = {
  paintingId: "",
  title: "",
  paintingDescription: "",
  price: "",
  artist: { id: "", username: "" },
  imageUrl: "",
};

export default function Form() {
  const [dataPainting, setDataPainting] = useState(formPainting);
  const [imageUpload, setImageUpload] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [fetchDataProduct, setFetchDataProduct] = useState([]);

  useEffect(() => {
    HttpRequest.get("painting/list").then((res) => {
      setFetchDataProduct(res.data);
    });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setImageUpload(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (!isShowEdit && dataPainting.imageUrl) {
      addPainting();
    }
    if (isShowEdit && isLoading) {
      uploadImage();
    }
  }, [dataPainting.imageUrl]);

  const addPainting = () => {
    try {
      const payload = {
        title: dataPainting.title,
        user: { id: 3 },
        price: dataPainting.price,
        paintingDescription: dataPainting.paintingDescription,
        imageUrl: String(dataPainting.imageUrl),
      };
      console.log("Payload: ", payload);

      setTimeout(() => {
        HttpRequest({
          method: "POST",
          url: "http://localhost:8000/painting/add",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(payload),
        })
          .then(() => {
            alert("Thêm sản phẩm thành công");
          })
          .catch((error) => {
            console.error("Error adding painting: ", error);
            alert("Thêm sản phẩm thất bại");
          });

        setDataPainting(formPainting); //reset form
      }, 2000);
    } catch (error) {
      alert("Thêm sản phẩm thất bại");
      console.error("Error: ", error);
    }
  };

  const uploadImage = () => {
    setTimeout(async () => {
      await fetch({
        method: "PUT",
        url: `http://localhost:8000/painting/update/${dataPainting.paintingId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          paintingDescription: dataPainting.paintingDescription,
          price: dataPainting.price,
          imageUrl: String(dataPainting.imageUrl),
          title: dataPainting.title,
        }),
      });

      setIsLoading(false);
      setIsShowEdit(false);
      alert("Update thành công");
      // return setfetchDataBook(fetdataUpdate);
      setFetchDataProduct((prev) =>
        prev.map((item) =>
          item.paintingId === dataPainting.paintingId
            ? {
                ...item,
                paintingDescription: dataPainting.paintingDescription,
                imageUrl: dataPainting.imageUrl,
                price: dataPainting.price,
                title: dataPainting.title,
              }
            : item
        )
      );
    }, 2000);
  };

  const handleAddPainting = async (e) => {
    e.preventDefault();

    if (imageUpload === null) return alert("vui lòng thêm ảnh");

    const id = Math.random() * 1000;
    const imageRef = ref(storage, `tranh/${imageUpload.name + id}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    console.log(imageRef);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("Upload error: ", error);
      },
      async () => {
        try {
          const img = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", img);
          setDataPainting((prev) => ({ ...prev, imageUrl: String(img) }));
          console.log("image: 21321----", dataPainting.imageUrl);
          // addPainting(); // Add painting after image upload is complete
        } catch (error) {
          console.error("Error getting download URL: ", error);
        }
      }
    );
  };

  const getDowloadUrlImage = async (uploadTask) => {
    try {
      const img = await getDownloadURL(uploadTask.snapshot.ref);
      setDataPainting({ ...dataPainting, imageUrl: String(img) });
      console.log("File available at", dataPainting.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPainting = (item) => {
    console.log("data:", item);
    setDataPainting((prev) => ({
      ...prev,
      paintingId: item.paintingId,
      title: item.title,
      artist: item.artist.id,
      imageUrl: item.imageUrl,
      paintingDescription: item.paintingDescription,
      price: item.price,
    }));
    setIsShowEdit(true);
  };

  const handleUpdatePainting = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const urlImage = ref(storage, dataPainting.imageUrl);
    const pathImage = ref(storage, urlImage.fullPath);
    const uploadTask = uploadBytesResumable(pathImage, imageUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Quan sát các sự kiện thay đổi trạng thái như tiến trình, tạm dừng và tiếp tục
        // Lấy tiến độ nhiệm vụ, bao gồm số byte đã tải lên và tổng số byte cần tải lên
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      async () => {
        await getDowloadUrlImage(uploadTask);
      }
    );
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Tên tranh</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              aria-label="name"
              value={dataPainting.title}
              onChange={(e) =>
                setDataPainting((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Giá</label>
            <input
              type="text"
              className="form-control"
              placeholder="$100"
              aria-label="price"
              value={dataPainting.price}
              onChange={(e) =>
                setDataPainting((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div className="col-md-6 pt-3">
            <label className="form-label">Mô tả</label>
            <input
              type="text"
              className="form-control"
              placeholder="..."
              aria-label="description"
              value={dataPainting.paintingDescription}
              onChange={(e) =>
                setDataPainting((prev) => ({
                  ...prev,
                  paintingDescription: e.target.value,
                }))
              }
            />
          </div>
          <div className="col-md-6 pt-3" {...getRootProps()}>
            <label className="form-label">Ảnh</label>
            <input
              type="file"
              className="form-control"
              aria-label="file"
              {...getInputProps()}
            />
          </div>
          <div className="col-span-2">
            {imageUpload || dataPainting.imageUrl ? (
              <img
                src={
                  imageUpload || dataPainting.imageUrl
                    ? dataPainting.imageUrl
                    : URL.createObjectURL(imageUpload)
                }
                alt="Selected"
                className="w-full h-[400px] object-cover rounded-2xl"
                style={{ height: "300px", width: "100%", objectFit: "contain" }}
              />
            ) : (
              <img
                src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                alt=""
                className="w-full object-cover"
                style={{ height: "300px", width: "100%", objectFit: "contain" }}
              />
            )}
          </div>
        </div>
        {isLoading}
        <div
          className="btn btn-success mt-5 mr-2"
          onClick={isShowEdit ? handleUpdatePainting : handleAddPainting}
        >
          {isLoading ? (
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : isShowEdit ? (
            "Sửa"
          ) : (
            "Tạo mới"
          )}
        </div>
        {/* <div
          className="btn btn-primary mt-5 mr-2"
          onClick={handleUpdatePainting}
        >
          Sửa
        </div> */}
        <div className="btn btn-danger mt-5 mr-2">Xóa</div>
      </div>
      <div className="pt-5">
        <ListProduct
          setFetchDataProduct={setFetchDataProduct}
          fetchDataProduct={fetchDataProduct}
          onHandleEditProduct={handleEditPainting}
        />
      </div>
    </>
  );
}
