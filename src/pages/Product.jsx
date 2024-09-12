import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";

import { Footer, Navbar } from "../components";
import HttpRequest from "../service/axios/Axios";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    // dispatch(addCart(product));
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await HttpRequest.get("/painting/list");
      setData(res.data);
      console.log("data: ", res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      const response = await HttpRequest.get(
        `http://localhost:8000/painting/${id}`
      );
      const data = await response.data;
      setProduct(data);
      setLoading(false);
      const response2 = await HttpRequest.get(
        `http://localhost:8000/painting/list`
      );
      const data2 = await response2.data;
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id]);
  console.log(product);

  async function addProductToDB() {
    try {
      let data = { ...product };
      console.log("data: ", data);
      //them vao localstore
      // Lấy sản phẩm từ localStorage trước (nếu có)
      let storedProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];

      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const productExists = storedProducts.find(
        (item) =>
          item.paintingId === data.paintingId && item.title === data.title
      );

      if (productExists) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng hoặc xử lý logic khác
        toast.warning("Sản phẩm này đã tồn tại trong giỏ hàng!");
        return;
      } else {
        // Thêm sản phẩm mới vào mảng
        const newProduct = {
          ...product,
        };
        // Nếu sản phẩm chưa tồn tại, thêm vào mảng
        storedProducts.push(newProduct);
        // Cập nhật localStorage với mảng sản phẩm mới
        localStorage.setItem("cartProducts", JSON.stringify(storedProducts));
      }

      const response = await HttpRequest.post("/order/create", {
        orderdate: new Date(),
        totalamount: null,
        user: { id: user.id },
        statuss: { id: 1 },
        orderdetails: [
          {
            price: product.price,
            quantity: 1,
            painting: { paintingId: id },
          },
        ],
      });

      console.log("API Response:", response.data); // Kiểm tra phản hồi từ API

      if (response.status === 200) {
        console.log("Product added successfully");
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <img
                className="img-fluid"
                src={product.imageUrl}
                alt={product.title}
                width="350px"
                height="350px"
              />
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h1 className="display-5">{product.title}</h1>
              <p className="d-flex " style={{ fontSize: "20px" }}>
                Miêu tả:
                <h4 className="text-uppercase text-muted pl-2">
                  {product.paintingDescription}
                </h4>
              </p>
              <p className="lead">
                <b>Người bán</b>: @
                {product.user && product.user.firstname + product.user.lastname}{" "}
                {/* <i className="fa fa-star"></i> */}
              </p>
              <h3 className="display-6  my-4">Giá: ${product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={addProductToDB}
                disabled={
                  product && product.user && product.user.id === user.id
                    ? true
                    : false
                }
              >
                Thêm vào giỏ hàng
              </button>
              <Link to="/cart" className="btn btn-dark  mx-3">
                Đến giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.paintingId} className="card mx-4 text-center">
                  <Link
                    to={`/product/${item.paintingId}`}
                    style={{ color: "#333", textDecoration: "none" }}
                  >
                    <img
                      className="card-img-top p-3"
                      src={item.image}
                      alt="Card"
                      height={300}
                      width={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.title.substring(0, 15)}...
                      </h5>
                    </div>
                  </Link>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.paintingId}
                      className="btn btn-dark m-1"
                    >
                      Mua ngay
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">Sản phẩm bán chạy</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
