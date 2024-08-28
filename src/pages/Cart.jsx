import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HttpRequest from "../service/axios/Axios";
import { useAppDispatch } from "../redux/store";
import { setCountCart } from "../redux/slices/commonSlice";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  // const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">
              Không có sản phẩm nào trong giỏ hàng
            </h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = ({ dataCart, setDataCart }) => {
    console.log("showw: ", dataCart);
    //   let subtotal = 0;
    //   let shipping = 30.0;
    //   let totalItems = 0;
    //   state.map((item) => {
    //     return (subtotal += item.price * item.qty);
    //   });

    //   state.map((item) => {
    //     return (totalItems += item.qty);
    //   });
    const [productPay, setProductPay] = useState();
    const [checkAll, setCheckAll] = useState(false);

    // check để thêm sản phẩm vào mảng thanh toán
    function handleCheckToPay(e, id, title) {
      console.log(
        "e: ",
        e.target.checked + "---id: ",
        id + "---title: ",
        title
      );
      // setCheckAll(!checkAll);
      let checked = e.target.checked;
      if (checked) {
        let p = dataCart?.find((item) => {
          return item.paintingId === id && item.title === title;
        });
        console.log("p: ", p);
        console.log("Checked:", checked);
        console.log("Product found (p):", p);

        if (checked) {
          setProductPay(p);
        } else {
          setProductPay((prev) =>
            prev.filter(
              (item) => item.paintingId !== id || item.title !== title
            )
          );
        }
      }
      // else {
      //   setProductPay((prev) => {
      //     return prev?.filter((item) => {
      //       return item.title !== title;
      //     });
      //   });
      // }
    }

    function handleCheckAll(e) {
      let checked = e.target.checked;
      if (checked) {
        setCheckAll(checked);
        setProductPay(dataCart);
      } else {
        setCheckAll(checked);
        setProductPay([]);
      }
    }

    console.log("product pay: ", productPay);
    // localStorage.removeItem("productPay");
    localStorage.setItem("productPay", JSON.stringify(productPay));

    // const handleDeleteCart = (id) => {
    //   try {
    //     HttpRequest.delete(`/orderitem/deletee/${id}`).then((res) => {
    //       setDataCart((prev) => prev.filter((item) => item.paintingId !== id));
    //     });
    //   } catch (error) {
    //     console.log("error: ", error);
    //   }

    //   // return res.data;
    // };

    const handleDeleteCart = async (orderitems) => {
      try {
        // Lấy danh sách order item từ API
        let res = await HttpRequest.get("orderitem/list");
        let orderits = res.data;

        // Tìm kiếm và trả về ID đầu tiên khớp với điều kiện
        let foundOrder = orderitems.find((or) => {
          return orderits.some((item) =>
            dataCart.some(
              (dataid) =>
                item.id === or.id && dataid.paintingId === or.paintingid
            )
          );
        });

        if (foundOrder) {
          HttpRequest.delete(`/orderitem/delete/${foundOrder.id}`).then((res) =>
            setDataCart((prev) =>
              prev.filter((item) => item.paintingId !== foundOrder.id)
            )
          );
        }
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Danh sách sản phẩm</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex  align-items-center  mb-5">
                      <input
                        className="h-5 w-5 mr-2"
                        type="checkbox"
                        checked={checkAll}
                        onChange={(e) => handleCheckAll(e)}
                      />
                      <div className="col-span-5">
                        Chọn tất cả ({dataCart && dataCart.length} sản phẩm)
                      </div>
                    </div>
                    {dataCart &&
                      dataCart.map((item) => {
                        return (
                          <div
                            className="d-flex justify-content-between"
                            key={item.paintingId}
                          >
                            <div className="col-md-12 row d-flex align-items-center">
                              <div className="col-lg-3 ">
                                <div
                                  className="bg-image d-flex d-flex align-items-center rounded"
                                  data-mdb-ripple-color="light"
                                >
                                  <div className="d-flex  align-items-center mr-2 mb-5">
                                    <input
                                      className="h-5 w-5"
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleCheckToPay(
                                          e,
                                          item.paintingId,
                                          item.title
                                        )
                                      }
                                      disabled={checkAll}
                                      // checked={
                                      //   productPay &&
                                      //   // productPay.some((i) => {
                                      //   //   return (
                                      //   //     item.paintingId === i.paintingId &&
                                      //   //     item.title === i.title
                                      //   //   );

                                      //   // })
                                      //   true
                                      // }
                                    />
                                  </div>
                                  <img
                                    src={item.imageUrl}
                                    // className="w-100"
                                    alt={item.title}
                                    width={100}
                                    height={75}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-4 col-md-6">
                                <p>
                                  <strong>{item.title}</strong>
                                </p>
                                {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                              </div>

                              {/* <div className="col-lg-3 col-md-6">
                                <div
                                  className="d-flex mb-4"
                                  style={{ maxWidth: "300px" }}
                                >
                                  <button
                                    className="btn px-3"
                                    onClick={() => {
                                      removeItem(item);
                                    }}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>

                                  <p className="mx-5">{item.quantity}</p>

                                  <button
                                    className="btn px-3"
                                    onClick={() => {
                                      addItem(item);
                                    }}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div> */}
                              <div className="col-lg-2">
                                <p className="text-start text-md-center">
                                  <strong>
                                    <span className="text-muted">
                                      {item.price}
                                    </span>{" "}
                                    {/* x ${item.price} */}
                                  </strong>
                                </p>
                              </div>
                              <div className="col-lg-2 ">
                                <p className="text-start text-md-center">
                                  <button
                                    onClick={() =>
                                      handleDeleteCart(item.orderdetails)
                                    }
                                    className="btn btn-danger"
                                    disabled={checkAll && true}
                                  >
                                    Xóa
                                  </button>
                                </p>
                              </div>
                            </div>

                            {/* <hr className="my-4" /> */}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Đơn hàng</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Sản phẩm
                        <span>$</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Tiền vận chuyển
                        <span>$</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Tổng tiền</strong>
                        </div>
                        <div>
                          <strong>
                            {productPay &&
                              productPay.length > 0 &&
                              productPay.reduce((total, item) => {
                                return total + Number(item.price);
                              }, 0)}
                          </strong>
                        </div>
                        <span>
                          <strong>$</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Thanh toán
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  const dispatch = useAppDispatch();

  const [dataCart, setDataCart] = useState([]);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetch = () => {
      HttpRequest.get("/painting/list").then((res) => {
        setPaintings(res.data);
      });
    };
    fetch();
  }, []);
  console.log(paintings);

  useEffect(() => {
    const fetchDataCart = async () => {
      if (!paintings.length || !user) return; // Check if paintings and user have data

      try {
        const res = await HttpRequest.get(`/order/cart/${user.id}`);
        console.log("API Response: ", res.data); // Check the response data

        if (res.data) {
          let orderdetails =
            res.data.flatMap((item) => item.orderdetails) || []; // Ensure orderdetails is an array
          console.log("orderdetails: ", orderdetails);

          let products = orderdetails
            .map((od) => {
              let painting = paintings.find(
                (p) => p.paintingId === od.paintingid
              ); // Match paintingId with paintingid in orderdetails
              console.log("Painting found: ", painting);

              if (painting) {
                return {
                  ...painting,
                  quantity: od.quantity,
                  odid: od.id,
                  odpt: od.paintingid,
                };
              }
              return null;
            })
            .filter((item) => item !== null); // Filter out null values

          // console.log("Products: ", products);
          setDataCart(products);
          dispatch(setCountCart(dataCart.length));
        }
      } catch (error) {
        console.error("Failed to fetch data cart:", error);
      }
    };

    fetchDataCart();
  }, [dataCart.length, dispatch, paintings, user.id]); // Ensure fetchDataCart only runs when paintings and user have data

  console.log("data cart: ", dataCart);
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Giỏ hàng</h1>
        <hr />
        {dataCart.length > 0 ? (
          <ShowCart dataCart={dataCart} setDataCart={setDataCart} />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
