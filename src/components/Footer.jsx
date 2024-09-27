import React from "react";
import logo from "../image/logo.jpg";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 p-5 bg-black " style={{ height: "400px" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "30%" }}>
              <div className="col-md-4 ">
                {" "}
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    textAlign: "center",
                  }}
                />
                <p
                  style={{
                    fontSize: "40px",
                    fontWeight: "600",
                    color: "white",
                    paddingLeft: "35px",
                  }}
                >
                  Solana
                </p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <i
                    className="fa-brands fa-facebook"
                    style={{
                      fontSize: "40px",
                      fontWeight: "600",
                      color: "#5252b7",
                      paddingRight: "10px",
                    }}
                  ></i>
                  <i
                    className="fa-brands fa-twitch"
                    style={{
                      fontSize: "40px",
                      fontWeight: "600",
                      color: "#5252b7",
                      paddingRight: "10px",
                    }}
                  ></i>
                  <i
                    className="fa-brands fa-instagram"
                    style={{
                      fontSize: "40px",
                      fontWeight: "600",
                      color: "#5252b7",
                      paddingRight: "10px",
                    }}
                  ></i>
                  <i
                    className="fa-brands fa-discord"
                    style={{
                      fontSize: "40px",
                      fontWeight: "600",
                      color: "#5252b7",
                      paddingRight: "10px",
                    }}
                  ></i>
                  <i
                    className="fa-brands fa-tiktok"
                    style={{
                      fontSize: "40px",
                      fontWeight: "600",
                      color: "#5252b7",
                      paddingRight: "10px",
                    }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="row w-100 text-white" style={{ fontSize: "25px" }}>
              <div class="col-sm">Liên hệ</div>
              <div class="col-sm">Địa chỉ</div>
              <div class="col-sm">Nhà sản xuất</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
