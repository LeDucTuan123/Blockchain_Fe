import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { faker } from "@faker-js/faker";
// import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  PublicKey,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import HttpRequest from "../service/axios/Axios";
import axios from "axios";
Buffer.from("anything", "base64");

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || Buffer;
}

const Checkout = () => {
  const productPay = JSON.parse(localStorage.getItem("productPay"));
  const navigate = useNavigate();
  console.log("productPay: ", productPay);

  var provider;
  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Không có sản phẩm nào</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    // JCujWVsP2XHR5uQ7LG2HiRbhNskUs1vbd7Tgxnhf9CnozkmEf3m7f5KgU9T2qgrkeTTRSVTngbv3nkNgHjPftjQ
    const [address, setAddress] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    const [listAddress, setListAddress] = useState([]);
    const [listDistrics, setListDistrics] = useState([]);
    const [listWards, setListWards] = useState([]);
    const [infomation, setInformation] = useState({
      address: "",
      city: "",
      district: "",
      ward: "",
    });

    useEffect(() => {
      // gọi api lấy địa chỉ
      axios
        .get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        )
        .then((res) => {
          setListAddress(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    // hàm sẽ chạy khi chọn tỉnh thành
    function handleChangeCity(e) {
      const c = listAddress.find((item) => {
        return item.Id === e.target.value;
      });
      if (c) {
        setListDistrics(c.Districts);
        setInformation((i) => {
          return { ...i, city: c.Name };
        });
      } else {
        setListDistrics([]);
        setInformation((i) => {
          return { ...i, city: "", district: "", ward: "" };
        });
      }
      setListWards([]);
    }

    // hàm sẽ chạy khi chọn phường
    function handleChangeDistric(e) {
      const d = listDistrics.find((item) => {
        return item.Id === e.target.value;
      });
      if (d) {
        setListWards(d.Wards);
        setInformation((i) => {
          return { ...i, district: d.Name };
        });
      } else {
        setListWards([]);
        setInformation((i) => {
          return { ...i, district: "", ward: "" };
        });
      }
    }
    // hàm sẽ chạy khi chọn xã
    function handleChangeWard(e) {
      const w = listWards.find((item) => {
        return item.Id === e.target.value;
      });
      if (w) {
        setInformation((i) => {
          return { ...i, ward: w.Name };
        });
      } else {
        setInformation((i) => {
          return { ...i, ward: "" };
        });
      }
    }

    async function handleSend(wallet, sols) {
      provider = getProvider();
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: Keypair.fromSecretKey(
            bs58.decode(
              "JCujWVsP2XHR5uQ7LG2HiRbhNskUs1vbd7Tgxnhf9CnozkmEf3m7f5KgU9T2qgrkeTTRSVTngbv3nkNgHjPftjQ"
            )
          ).publicKey,
          toPubkey: wallet,
          lamports: sols * LAMPORTS_PER_SOL,
        })
      );
      let blockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = Keypair.fromSecretKey(
        bs58.decode(
          "JCujWVsP2XHR5uQ7LG2HiRbhNskUs1vbd7Tgxnhf9CnozkmEf3m7f5KgU9T2qgrkeTTRSVTngbv3nkNgHjPftjQ"
        )
      ).publicKey;
      try {
        const { signature } = await provider.signAndSendTransaction(
          transaction
        );
        await connection.getSignatureStatus(signature);
        alert("Send sols successfully");
        return true;
      } catch (error) {
        alert("send sols failed");
        return false;
      }
    }
    console.log(`BLC${faker.string.uuid().slice(0, 7)}`);

    console.log("date: ", new Date());

    const handlePaymentSendSold = async (wallet, sols, id) => {
      if (address.length === 0) {
        alert("Vui long nhap dia chi nhan hang");
        return;
      }

      if (await handleSend(wallet, sols)) {
        HttpRequest({
          method: "POST",
          url: "http://localhost:8000/order/payment",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            orderdate: new Date(),
            codeorder: `Blc${faker.string.uuid().slice(0, 7)}`,
            totalamount: sols,
            receiver: `${user.firstname} ${user.lastname}`,
            user: { id: user.id },
            statuss: { id: 2 },
            address: address,
            orderdetails: [
              {
                quantity: 1,
                price: sols,
                painting: {
                  paintingId: id,
                },
              },
            ],
          },
        })
          .then(() => {
            alert("Thanh toan thanh cong");

            navigate("/payment/success");
          })
          .catch((error) => {
            console.error("Error adding painting: ", error);
            alert("Thanh toan that bai");
          });

        const response = await HttpRequest({
          method: "GET",
          url: `http://localhost:8000/painting/${id}`,
        });

        const currentPainting = response.data;

        await HttpRequest({
          method: "PUT",
          url: `http://localhost:8000/painting/update/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            ...currentPainting,
            status: true,
          },
        })
          .then()
          .catch((error) => console.log(`error: `, error));
      }
    };

    // const handleOnchange = (e) => {
    //   setAddress(infomation.address);
    // };

    function validation(i) {
      let error = { address: "", city: "", district: "", ward: "" };

      if (i.address.trim().length === 0) {
        error.address = "Thông tin này không được để trống";
      }

      if (i.city.trim().length === 0) {
        error.city = "Thông tin này không được để trống";
      }

      if (i.district.trim().length === 0) {
        error.district = "Thông tin này không được để trống";
      }

      if (i.ward.trim().length === 0) {
        error.ward = "Thông tin này không được để trống";
      }

      return error;
    }

    useEffect(() => {
      const valueAddress = () => {
        let newAddress = "";

        if (infomation.ward) newAddress = infomation.ward + ", ";
        if (infomation.district) newAddress += infomation.district + ", ";
        if (infomation.city) newAddress += infomation.city;

        setInformation((prev) => ({
          ...prev,
          address: newAddress, // Chỉ cập nhật trường 'address' mà không thay đổi các trường khác
        }));
        setAddress(infomation.address);
      };
      valueAddress();
    }, [
      infomation.address,
      infomation.city,
      infomation.district,
      infomation.ward,
    ]);

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Thanh toán</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Sản phẩm
                      <span>{productPay.title}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Free</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Tổng tiền</strong>
                      </div>
                      <span>
                        <strong>{productPay.price} (SOL)</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Nhập thông tin</h4>
                </div>
                <div className="card-body">
                  {/* 00------------------------------- */}

                  <div className="mt-4">
                    <label className="text-[15px] mr-3 w-[170px] inline-block">
                      Tỉnh/Thành Phố
                    </label>
                    <select
                      onChange={(e) => handleChangeCity(e)}
                      className="py-1 text-[14px] font-bold outline-1 outline-blue-300 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057]"
                    >
                      <option value="">-- Chọn tỉnh thành --</option>
                      {listAddress &&
                        listAddress.map((item) => {
                          return (
                            <option key={item.Id} value={item.Id}>
                              {item.Name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="text-[15px] mr-3 w-[170px] inline-block">
                      Quận/Huyện
                    </label>
                    <select
                      disabled={listDistrics && listDistrics.length === 0}
                      onChange={(e) => handleChangeDistric(e)}
                      className="py-1 text-[14px] font-bold outline-1 outline-blue-300 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057]"
                    >
                      <option value="">-- Chọn quận huyện --</option>
                      {listDistrics &&
                        listDistrics.map((item) => {
                          return (
                            <option key={item.Id} value={item.Id}>
                              {item.Name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="text-[15px] mr-3 w-[170px] inline-block">
                      Phường/Xã
                    </label>
                    <select
                      onChange={(e) => handleChangeWard(e)}
                      disabled={listWards && listWards.length === 0}
                      className="py-1 text-[14px] font-bold outline-1 outline-blue-300 border-[#ced4da] rounded-sm h-[30px] w-[446px] text-[#495057]"
                    >
                      <option value="">-- Chọn phường xã --</option>
                      {listWards &&
                        listWards.map((item) => {
                          return (
                            <option key={item.Id} value={item.Id}>
                              {item.Name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  {/* 00------------------------------- */}
                  <div className="row g-3 mt-4">
                    <div className="col-12 my-1">
                      <label for="address" className="form-label">
                        Địa chỉ nhận hàng
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                        value={infomation.address}
                        disabled
                      />
                      {/* <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div> */}
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h4 className="mb-3">Sản phẩm mua</h4>

                  <div className="d-flex flex-column">
                    <>
                      <div key={productPay.paintingId} className="d-flex">
                        <div className="col-md-4">
                          <img
                            src={`${productPay.imageUrl}`}
                            alt="img"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />{" "}
                        </div>
                        <div className="col-md-4">
                          {productPay.title.substring(0, 30)}
                        </div>
                        <div className="col-md-4">{productPay.price}</div>
                      </div>
                    </>
                  </div>

                  <hr className="my-4" />

                  <button
                    className="w-100 btn btn-primary "
                    onClick={() =>
                      handlePaymentSendSold(
                        productPay.user.wallet,
                        productPay.price,
                        productPay.paintingId
                      )
                    }
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {productPay ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
