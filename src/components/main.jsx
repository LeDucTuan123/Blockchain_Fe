import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://i.seadn.io/s/primary-drops/0x7e50af303a0422ebec6bc198034a2430bbe0195c/32578588:about:media:fac757ed-80e3-47ba-b2ec-365eeb04f070.gif?auto=format&dpr=1&w=1920"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">
                New Season Arrivals
              </h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
