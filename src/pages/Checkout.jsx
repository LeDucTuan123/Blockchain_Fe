import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  PublicKey,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
  SYSTEM_INSTRUCTION_LAYOUTS,
  Message,
} from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
Buffer.from("anything", "base64");

if (typeof window !== "undefined") {
  window.Buffer = window.Buffer || Buffer;
}

const Checkout = () => {
  const [address, setAddress] = useState("");
  const productPay = JSON.parse(localStorage.getItem("productPay"));

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

  // const newAccount = Keypair.generate();

  // // Lấy khóa bí mật (private key) của tài khoản và mã hóa nó bằng base58
  // const secretKey = bs58.encode(newAccount.secretKey);
  // console.log("Base58 Encoded Secret Key:", secretKey);
  const ShowCheckout = () => {
    // async function handleSend(wallet) {
    //   const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    //   const newKeypair = Keypair.generate();
    //   // console.log("newKeypair: ", bs58.encode(newKeypair.secretKey));
    //   console.log(newKeypair.publicKey);
    //   try {
    //     provider = getProvider();
    //     if (!provider) {
    //       alert("Phantom wallet is not connected.");
    //       return;
    //     }

    //     // eslint-disable-next-line no-undef
    //     // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    //     const fromKeypair = Keypair.fromSecretKey(
    //       bs58.decode(
    //         "28kshbRRqMSQgz59fHWv8RFMkyc1KWSEsnUWnbUX2C5vSf6iZSp2VVUr7a1qWuxUxHrczsG69qErU42nNRLQj331"
    //       )
    //     );
    //     console.log("wallet: ", wallet);
    //     const toKeypair = new PublicKey(wallet);
    //     console.log("toKeypair: ", toKeypair.toString());

    //     const lamportsToSend = 1000000000000;

    //     // const connection = new Connection(
    //     //   "https://api.devnet.solana.com",
    //     //   "confirmed"
    //     // );

    //     ////
    //     const transferTransaction = new Transaction().add(
    //       SystemProgram.transfer({
    //         fromPubkey: fromKeypair.publicKey,
    //         toPubkey: newKeypair.publicKey,
    //         lamports: lamportsToSend,
    //       })
    //     );

    //     let blockhash = (await connection.getLatestBlockhash("confirmed"))
    //       .blockhash;
    //     transferTransaction.recentBlockhash = blockhash;
    //     transferTransaction.feePayer = fromKeypair.publicKey;

    //     const signedTransaction = await provider.signTransaction(
    //       transferTransaction
    //     );
    //     const signature = await connection.sendRawTransaction(
    //       signedTransaction.serialize()
    //     );
    //     const status = await connection.getSignatureStatus(signature);

    //     if (status.err) {
    //       console.error("Transaction failed:", status.err);
    //       alert("Transaction failed: " + status.err);
    //     } else {
    //       alert("Transaction successful!");
    //     }

    //     ///

    //     // const transferTransaction = new Transaction().add(
    //     //   SystemProgram.transfer({
    //     //     fromPubkey: fromKeypair.publicKey,
    //     //     toPubkey: "Hs3z7zNBqqmxF8gnVqLYa2Z3x4h1DSCVAacCGLYKfVnu",
    //     //     lamports: lamportsToSend,
    //     //   })
    //     // );

    //     // console.log("first");
    //     // let blockhash = (await connection.getLatestBlockhash("finalized"))
    //     //   .blockhash;
    //     // transferTransaction.recentBlockhash = blockhash;
    //     // transferTransaction.feePayer = fromKeypair.publicKey;
    //     // const signedTransaction = await provider.signTransaction(
    //     //   transferTransaction
    //     // );
    //     // const signature = await connection.sendRawTransaction(
    //     //   signedTransaction.serialize()
    //     // );
    //     // // await connection.confirmTransaction(signature);
    //     // const status = await connection.getSignatureStatus(signature);
    //     // if (status.err) {
    //     //   console.error("Transaction failed:", status.err);
    //     //   alert("Transaction failed: " + status.err);
    //     // } else {
    //     //   alert("Transaction successful!");
    //     // }
    //     console.log("last");
    //     // const signedTransaction = await provider.signTransaction(
    //     //   transferTransaction
    //     // );
    //     // const signature = await connection.sendRawTransaction(
    //     //   signedTransaction.serialize()
    //     // );
    //     // await connection.confirmTransaction(signature);
    //     // alert("Giao dịch đã thành công!");
    //     alert("Send sols successfully");
    //     return true;
    //   } catch (error) {
    //     console.log("chi tiet loi: ", error);
    //     alert("Send SOLs failed: " + error.message);
    //     alert("send sols failed");
    //     return false;
    //   }
    // }
    const [status, setStatus] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    async function handleSend(wallet) {
      provider = getProvider();
      const fromkeypair = Keypair.fromSecretKey(
        bs58.decode(
          "28kshbRRqMSQgz59fHWv8RFMkyc1KWSEsnUWnbUX2C5vSf6iZSp2VVUr7a1qWuxUxHrczsG69qErU42nNRLQj331"
        )
      );
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromkeypair.publicKey,
          toPubkey: wallet,
          lamports: 10000,
        })
      );
      let blockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromkeypair.publicKey;
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
    console.log("LAMPORTS_PER_SOL: ", status);

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
                        <strong>{productPay.price}$</strong>
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
                  {/* <form className="needs-validation"> */}
                  <div className="row g-3">
                    <div className="col-12 my-1">
                      <label for="address" className="form-label">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                        onChange={(e) => setAddress(e.target.value)}
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
                            style={{ width: "20px", objectFit: "cover" }}
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
                    onClick={() => handleSend(productPay.user.wallet)}
                  >
                    Thanh toán
                  </button>
                  {/* </form> */}
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
