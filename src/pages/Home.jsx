import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  return (
    <>
      <div style={{ background: "#fff" }}>
        <Navbar />
        <Main />
        <Product />
      </div>
      <Footer />
    </>
  );
}

export default Home;
