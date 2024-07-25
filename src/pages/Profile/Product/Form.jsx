import React, { useCallback, useEffect, useState } from "react";
import HttpRequest from "../../../service/axios/Axios";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../service/firebase";

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

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      setImageUpload(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (dataPainting.imageUrl) {
      addPainting();
    }
  }, [dataPainting.imageUrl]);

  const addPainting = () => {
    try {
      const payload = {
        title: dataPainting.title,
        artist: { id: 3 },
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
                  dataPainting.imageUrl
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
        <div className="btn btn-success mt-5 mr-2" onClick={handleAddPainting}>
          Thêm
        </div>
        <div className="btn btn-primary mt-5 mr-2">Sửa</div>
        <div className="btn btn-danger mt-5 mr-2">Xóa</div>
      </div>
    </>
  );
}
