import styles from "@styles/components/modal/Login.module.scss";
import Image, { StaticImageData } from "next/image";

interface PropsTypes {
  name: string;
  logo: StaticImageData;
}

const LoginOptions = (props: PropsTypes) => {
  return (
    <div className={styles.login_options_container}>
      <Image src={props.logo} height={150} width={150} />
      <p>{props.name}</p>
    </div>
  );
};

export default LoginOptions;
