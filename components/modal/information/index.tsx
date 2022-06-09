import { InformationModalProps } from "@interfaces/components/InformationModal";
import styles from "@styles/components/modal/Information.module.scss";
import { Fragment } from "react";
import { stockImageUrl } from "config";

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
                    : stockImageUrl
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
                  <p className={styles.value}>{`${
                    props.timeStamp === "0"
                      ? "nil"
                      : new Date(parseInt(props.timeStamp) * 1000)
                          .toString()
                          .slice(0, -30)
                  }`}</p>
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
                <div className={styles.information}>
                  <p className={styles.label}>Transaction: </p>
                  <p className={styles.value}>
                    <a
                      href={`https://mumbai.polygonscan.com/tx/${props.transactionHash}`}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      mumbai.polygonscan.com
                    </a>
                  </p>
                </div>
              </div>
              <div className={styles.information_websites}>
                <p>Associated website(s):</p>
                {props.links?.map((item, index) => (
                  <Fragment key={index}>
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
