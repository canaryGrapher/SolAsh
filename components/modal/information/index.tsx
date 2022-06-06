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
              <img
                src={
                  props.imageHash
                    ? `https://ipfs.io/ipfs/${props.imageHash}`
                    : "https://images.unsplash.com/photo-1642388538891-38b2d14e750e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                }
                height={300}
                width={300}
              />
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
                <div className={styles.information}>
                  <p className={styles.label}>Claimed on: </p>
                  <p className={styles.value}>{props.timeStamp}</p>
                </div>
                <div className={styles.information}>
                  <p className={styles.label}>Token Id: </p>
                  <p className={styles.value}>{props.tokenId}</p>
                </div>
                <div className={styles.information}>
                  <p className={styles.label}>Creator Address: </p>
                  <p className={styles.value}>
                    <a
                      href={`https://mumbai.polygonscan.com/address/${props.creatorAddress}`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      {props.creatorAddress}
                    </a>
                  </p>
                </div>
                <div className={styles.information}>
                  <p className={styles.label}>Contract Address: </p>
                  <p className={styles.value}>
                    <a
                      href={`https://mumbai.polygonscan.com/address/${props.contractAddress}`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      {props.contractAddress}
                    </a>
                  </p>
                </div>
              </div>
              <div className={styles.information_websites}>
                <p>
                  Transaction:{" "}
                  <a
                    href={`https://mumbai.polygonscan.com/tx/${props.transactionHash}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    {`mumbai.polygonscan.com/tx/${
                      props.transactionHash.slice(0, 6) +
                      "...." +
                      props.transactionHash.slice(-4)
                    }`}
                  </a>
                </p>
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
