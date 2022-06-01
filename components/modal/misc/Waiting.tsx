import styles from "@styles/components/modal/Waiting.module.scss";
import { printIntrospectionSchema } from "graphql";

const Waiting = (props: { message: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="https://images.unsplash.com/photo-1578923931302-7fd9b3495be7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>Waiting for your transaction to be completed</h2>
          </div>
          <div className={styles.subtitle}>
            <p>{props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
