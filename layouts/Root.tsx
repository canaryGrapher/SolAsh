import React, { useContext, useState } from "react";

// importing the components
import Navbar from "@components/root/Navbar";
import Footer from "@components/root/Footer";
import LoginModal from "@components/modal";

// importing context
import LoginContext from "@context/LoginContext";
import UserContext from "@context/UserContext";
import Router from "next/router";

// importing wallet connection components
import MetamaskConnect from "@layouts/MetamaskConnect";

//importing interfaces
import { WalletConnectStatus } from "@interfaces/layout/WalletConnect";

const RootLayout: React.FC = ({ children }) => {
  const authStates = useContext(LoginContext);
  const userStates = useContext(UserContext);

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
    Router.push("/dashboard");
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
