import { InformationModalProps } from "@interfaces/components/InformationModal";
import styles from "@styles/components/modal/Information.module.scss";
import { Fragment } from "react";

const InformationModal: React.FC<InformationModalProps> = (props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.image_container}>
            <div className={styles.certificate_image}>
              <img src={props.imageHash} height={300} width={300} />
              <div className={styles.action_area}>
                <div
                  className={styles.action_area_button}
                  onClick={props.revokeToken}
                >
                  <p>Revoke</p>
                </div>
                <div
                  className={styles.action_area_button}
                  onClick={props.closeModal}
                >
                  <p>Close</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.information_container}>
            <h2>{props.title}</h2>
            <p className={styles.community_information}>
              Issued by: <span>{props.associatedCommunity}</span>
            </p>
            <p className={styles.ntt_description}>{props.description}</p>
            <div className={styles.information_area}>
              <div className={styles.information_about_dates}>
                {/* <div className={styles.information}>
                  <p className={styles.label}>Issued on: </p>
                  <p className={styles.value}>{props.issueDate}</p>
                </div> */}
                {/* <div className={styles.information}>
                  <p className={styles.label}>Expiry date: </p>
                  <p className={styles.value}>
                    {props.expiryDate ? props.expiryDate : "null"}
                  </p>
                </div> */}
                <div className={styles.information}>
                  <p className={styles.label}>Claimed on: </p>
                  <p className={styles.value}>{props.timeStamp}</p>
                </div>
              </div>
              <div className={styles.information_websites}>
                <p>Associated website(s):</p>
                {props.links?.map((item) => (
                  <Fragment>
                    <a href={item} target="_blank" referrerPolicy="no-referrer">
                      {item}
                    </a>
                    <br />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
