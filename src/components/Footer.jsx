import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 p-5 bg-black " style={{ height: "400px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img
                src="https://i.seadn.io/s/primary-drops/0x7e50af303a0422ebec6bc198034a2430bbe0195c/32578588:about:media:fac757ed-80e3-47ba-b2ec-365eeb04f070.gif?auto=format&dpr=1&w=1920"
                alt="Solana"
                style={{ width: "200px", height: "200px" }}
                className="rounded-circle"
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
              <div style={{}}>
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
        </div>
      </footer>
    </>
  );
};

export default Footer;
