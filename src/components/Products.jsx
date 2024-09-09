import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import HttpRequest from "../service/axios/Axios";
import axios from "axios";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [countProduct, setCountProduct] = useState(9);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    // dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await HttpRequest.get("/painting/list");
      // console.log(response.data);
      if (componentMounted) {
        setData(await response.data);
        setFilter(await response.data);
        setLoading(false);
      }
      console.log(data);

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  console.log(countProduct);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    return (
      <>
        {/* <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div> */}

        {filter.slice(0, countProduct).map((product) => {
          return (
            <div
              id={product.paintingId}
              key={product.paintingId}
              className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.paintingId}>
                <Link to={`/product/${product.paintingId}`}>
                  <img
                    className="card-img-top p-3 "
                    src={product.imageUrl}
                    alt="Card"
                    height={300}
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.paintingDescription.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                {/* <div className="card-body">
                  <Link
                    to={"/product/" + product.paintingId}
                    className="btn btn-dark m-1"
                  >
                    Mua ngay
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div> */}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const isLogin = useSelector((state) => state.auth.login);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  // useEffect(() => {
  //   async function test() {
  //     if (isLogin && user.id) {
  //       // lấy dữ liệu db đổ lên cart
  //       const res = await HttpRequest.get(`/order/cart/${user.id}`);
  //       // console.log("card: ", res.data);
  //       // if (res.data) {
  //       //   let orderdetails = res.data.orderdetails;
  //       //   let products = orderdetails.map((od) => {
  //       //     let book = books.find((book) => {
  //       //       return book.orderdetails?.some((item: any) => {
  //       //         return item.id === od.id;
  //       //       });
  //       //     });
  //       //     if (book) {
  //       //       return { ...book, quantity: od.quantity, odid: od.id };
  //       //     }

  //       //   });
  //       //   setProduct(products);
  //       // }
  //     } else {
  //       // nếu không đăng nhập
  //       // if (cartProduct) {
  //       //   setProduct(JSON.parse(cartProduct));
  //       // }
  //     }
  //   }
  //   test();
  // }, [user.id]);

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Sản phẩm mới nhất</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              textDecoration: "underline",
            }}
          >
            <span
              className="btn"
              onClick={() => setCountProduct((state) => state + 9)}
            >
              Xem Thêm
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
