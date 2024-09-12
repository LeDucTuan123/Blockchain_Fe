import React, { useEffect, useState } from "react";
// import Context from "./Context";
// import Content from "./Content";
import HttpRequest from "../../../service/axios/Axios";
import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { setIsLogin, setUser } from "../../../redux/slices/authSlice";

export default function Wallet() {
  const [isConnect, setIsConnect] = useState(false);
  const dispatch = useAppDispatch();
  // const [place, setPlace] = useState("");
  // const [listPlace, setListPlace] = useState([]);

  const [wallet, setWallet] = useState(0);
  const [balance, setBalance] = useState(0);
  const walletName = localStorage.getItem("walletName");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const islogin = useSelector((state) => state.auth?.isLogin);
  var provider = null;

  const isPhantomInstalled = window.phantom?.solana?.isPhantom;
  console.log("user:", user);

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Địa chỉ ví (public key) mà bạn muốn kiểm tra số dư

  useEffect(() => {
    async function getBalance() {
      try {
        if (user.wallet && user.wallet.length > 0) {
          // Lấy số dư của ví
          const publicKey = new PublicKey(user.wallet);
          const balance = await connection.getBalance(publicKey);
          setBalance(balance / 1e9); // Chia cho 1e9 để chuyển từ lamports sang SOL
          setWallet(publicKey.toBase58()); // lay dia chi vi
          console.log("wallet:", wallet);
        }
      } catch (error) {
        console.error("Lỗi khi lấy số dư:", error);
      }
    }
    if (user?.wallet) {
      getBalance();
    }
  }, [connection, user.wallet, wallet]);

  if (user) {
    if (!isPhantomInstalled) {
      alert("Hãy cài ví Phantom để có trải nghiệm tốt nhất");
      window.open("https://phantom.app/", "_blank");
    }
  }

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }
  };

  function handleDownloadPhantom() {
    window.open("https://phantom.app/", "_blank");
  }

  async function handleConnect() {
    provider = getProvider();
    try {
      const resp = await provider.request({ method: "connect" });
      setIsConnect(provider.isConnected);
      console.log("ví: ", resp.publicKey.toString());
      // const connection = new Connection(clusterApiUrl("mainnet-beta"));
      // const balance = await connection.getBalance(resp.publicKey.toString());
      // setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
      console.log("resp.publicKey.toString(): ", provider.publicKey);
      HttpRequest.patch(`/api/v1/auth/wallet/${user.id}`, {
        wallet: provider.publicKey,
      });
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  }

  async function handleDisconnect() {
    provider = getProvider();

    if (provider && provider.request) {
      try {
        await provider.request({ method: "disconnect" });

        // Cập nhật trạng thái kết nối
        setIsConnect(false);

        // Nếu cần, làm mới trang hoặc thực hiện hành động khác để phản ánh trạng thái mới
        console.log("Disconnected successfully");
      } catch (error) {
        console.error("Error disconnecting:", error);
      }
    } else {
      console.warn("Provider does not support disconnect method");
    }
  }

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    dispatch(setUser(null));
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* <Context>
        <Content />
      </Context> */}
      {user && Object.keys(user).length > 0 && !isPhantomInstalled ? (
        <button className={"btn btn-warning"} onClick={handleDownloadPhantom}>
          Download Phantom
        </button>
      ) : (
        <></>
      )}
      {user && Object.keys(user).length > 0 && isPhantomInstalled ? (
        <>
          {isConnect ? (
            <>
              <div className="d-flex flex-column h-100 justify-content-between">
                <div>
                  <p>Ví: {walletName}</p>
                  <p>Tên: {user.lastname}</p>
                  <p>Số dư: {balance} (SOL)</p>
                  <p>Địa chỉ ví: {wallet}</p>
                </div>
                {(user.wallet && user.wallet.length === 0) ||
                  (user.wallet === null && (
                    <div className="d-flex gap-2">
                      <button
                        className={"btn btn-warning"}
                        style={{ width: "150px" }}
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </button>
                      <span>
                        (Vui lòng đăng xuất để hệ thống cập nhật ví cho bạn!!!)
                      </span>
                    </div>
                  ))}
                <button
                  className={"btn btn-danger"}
                  style={{ width: "150px" }}
                  onClick={handleDisconnect}
                >
                  Ngắt kết nối ví
                </button>
                {/* <button variant="primary" className={'btn'} onClick={handleShow}>
                                        Post
                                        </button> */}
                {/* <span className={{['number-sol']}>0 Sol</span> */}
              </div>
            </>
          ) : (
            <button className={"btn btn-success"} onClick={handleConnect}>
              Kết nối tới ví Phantom
            </button>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
