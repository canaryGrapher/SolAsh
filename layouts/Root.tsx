import React, { useContext, useState, useEffect } from "react";

// importing the components
import Navbar from "@components/root/Navbar";
import Footer from "@components/root/Footer";
import LoginModal from "@components/modal/login";

// importing context
import LoginContext from "@context/LoginContext";
import UserContext from "@context/UserContext";
import Router from "next/router";

// importing wallet connection components
import { useMetaMask } from "metamask-react";
import MetamaskConnect from "@layouts/MetamaskConnect";

//importing interfaces
import { WalletConnectStatus } from "@interfaces/layout/WalletConnect";

const RootLayout: React.FC = ({ children }) => {
  const authStates = useContext(LoginContext);
  const userStates = useContext(UserContext);
  const { status, account, ethereum, chainId } = useMetaMask();

  useEffect(() => {
    if (status === "connected") {
      authStates.toggleLogin(true);
      userStates.set_username(account);
      userStates.set_wallet_address(ethereum.selectedAddress);
      userStates.set_chain_id(chainId);
    } else if (status === "initializing") {
      console.log("Looking for wallet connection state");
    } else {
      authStates.toggleLogin(false);
      Router.push("/");
    }
  }, [status]);

  useEffect(() => {
    if (status === "connected" && parseInt(chainId, 16) != 80001) {
      alert(
        "Please switch to the Polygon testnet (chainId: 80001) to use the application. You are currently on chainId: " +
          parseInt(chainId, 16)
      );
      Router.push("/");
    }
  }, [chainId, status]);

  const [walletConnect, setWalletConnect] = useState<WalletConnectStatus>(
    WalletConnectStatus.Disabled
  );

  const toggleModal = () => {
    // loggedInValue.toggleLogin(true);
    authStates.toggleLoginModal();
  };
  const setUsername = (username: string) => {
    userStates.set_username(username);
  };

  const setWalletAddress = (walletAddress: string) => {
    userStates.set_wallet_address(walletAddress);
  };

  const ConnectWallet = async (name: string) => {
    if (name === "Metamask Wallet") {
      setWalletConnect(WalletConnectStatus.MetamaskWallet);
    }
    if (name === "disabled") {
      setWalletConnect(WalletConnectStatus.Disabled);
    }
  };

  const AuthenticateUser = () => {
    Router.push("/home");
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar
        toggleFunction={authStates.toggleLoginModal}
        loggedIn={authStates.isLoggedIn}
      />
      {authStates.isLoginModalOpen && !authStates.isLoggedIn && (
        <LoginModal
          toggleFunction={toggleModal}
          setWalletAddress={setWalletAddress}
          setusername={setUsername}
          connectWallet={ConnectWallet}
        />
      )}
      {walletConnect === WalletConnectStatus.MetamaskWallet ? (
        <MetamaskConnect
          killComponent={ConnectWallet}
          authenticate={AuthenticateUser}
        />
      ) : null}
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
