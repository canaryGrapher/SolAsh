import styles from "@styles/components/pages/Tokens.module.scss";
import { NTTtype } from "@interfaces/pages/Home";
import Image from "next/image";

const Certificates = (props: NTTtype) => {
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
            <button>Revoke</button>
          </div>
        </div>
        <div className={styles.certificate_basic_info_grid}>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Issue date</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.issueDate}</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Issued by</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.associatedCommunity}</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>NTT Type</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>Certificate</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Expiry date</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.expiryDate ? props.expiryDate : "null"}</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Signed on</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.signedOn}</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Website</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>
                <a href={props.link}>{props.link}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
