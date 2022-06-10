import styles from "@styles/components/modal/Waiting.module.scss";
import { useRouter } from "next/router";

const Success = (props: { message: string }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="https://images.unsplash.com/photo-1629721671030-a83edbb11211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>Your NTT was issued successfully.</h2>
            <p>You can share this link with wallets you have whitelisted:</p>
          </div>
          <div className={styles.subtitle}>
            <a href={props.message}>{props.message}</a>
          </div>
          <div className={styles.close}>
            <button
              className={styles.closeButton}
              onClick={() => {
                router.push("/dashboard?refreshAfterLoad=true&reloadCount=1");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
