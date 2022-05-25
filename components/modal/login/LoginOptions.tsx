import styles from "@styles/components/modal/Login.module.scss";
import Image from "next/image";
import { OptionsPassedPropsTypes } from "@interfaces/components/LoginModal";

const LoginOptions = (props: OptionsPassedPropsTypes) => {
  return (
    <div
      className={styles.login_options_container}
      onClick={() => props.connectWallet(props.name)}
    >
      <Image src={props.logo} height={150} width={150} />
      <p>{props.name}</p>
    </div>
  );
};

export default LoginOptions;
