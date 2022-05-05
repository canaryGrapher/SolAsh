import styles from "@styles/components/pages/CreatorCards.module.scss";
import { NTTtype } from "@interfaces/pages/Dashboard";
import Image from "next/image";

const CreatorCards = (props: NTTtype) => {
  return (
    <div className={styles.certificate_container}>
      <div className={styles.certificate_image}>
        <Image src={props.image} height={200} width={200} />
      </div>
      <div className={styles.certificate_information_container}>
        <div className={styles.certificate_information}>
          <div className={styles.basic_information}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
          <div className={styles.action_area}>
            <button>Edit</button>
          </div>
        </div>
        <div className={styles.certificate_basic_info_grid}>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Creation date:</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.creationDate}</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Issue date:</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.issueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCards;
