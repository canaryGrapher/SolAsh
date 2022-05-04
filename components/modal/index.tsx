import React, { useState } from "react";
import styles from "@styles/components/modal/Login.module.scss";
import Link from "next/link";
import {
  MetaMask_Logo,
  WalletConnect_Logo,
  Binance_Logo,
} from "@resources/exports";

import LoginOptions from "./LoginOptions";

const LoginOptionsProps = [
  {
    name: "Metamask Wallet",
    logo: MetaMask_Logo,
  },
  {
    name: "Wallet Connect",
    logo: WalletConnect_Logo,
  },
  {
    name: "Binance Wallet",
    logo: Binance_Logo,
  },
];

interface PropsTypes {
  toggleFunction: () => void;
}

const LoginModal: React.FC<PropsTypes> = (props) => {
  return (
    <React.Fragment>
      <div className={styles.modal_wrapper}>
        <div className={styles.modal}>
          <div className={styles.modal_titlebar}>
            <div className={styles.close_button}>
              <button onClick={() => props.toggleFunction()}>X</button>
            </div>
          </div>
          <div className={styles.modal_content}>
            <div className={styles.modal_content_title}>
              <h2>View all your NTTs</h2>
              <p>Connect your cryptowallet</p>
            </div>
            <div className={styles.login_options}>
              {LoginOptionsProps.map((option, index) => (
                <LoginOptions
                  key={index}
                  name={option.name}
                  logo={option.logo}
                />
              ))}
            </div>
          </div>
          <div className={styles.modal_footer}>
            <Link href="/">
              <p>Need help?</p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginModal;
