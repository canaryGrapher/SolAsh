import React from "react";
import {
  LoginPropsTypes,
  OptionsPropsTypes,
} from "@interfaces/components/LoginModal";
import styles from "@styles/components/modal/Login.module.scss";
import Link from "next/link";
import { LoginOptionsData } from "@utils/components/LoginOptions";

import LoginOptions from "./LoginOptions";

const LoginModal: React.FC<LoginPropsTypes> = (props) => {
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
              {LoginOptionsData.map(
                (option: OptionsPropsTypes, index: number) => (
                  <LoginOptions
                    key={index}
                    name={option.name}
                    logo={option.logo}
                    connectWallet={props.connectWallet}
                  />
                )
              )}
            </div>
          </div>
          <div className={styles.modal_footer}>
            <Link href="/">
              <p onClick={() => props.toggleFunction()}>Need help?</p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginModal;
