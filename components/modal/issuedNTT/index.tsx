import { InformationModalProps } from "@interfaces/components/InformationModal";
import Image from "next/image";
import styles from "@styles/components/modal/IssuedNTTModal.module.scss";
import { Fragment } from "react";

import { ModalProps } from "@interfaces/components/creatorModal";

const IssuedNTTCardModal: React.FC<ModalProps> = (props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.image_container}>
            <div className={styles.certificate_image}>
              <Image src={props.image} height={300} width={300} />
              <div className={styles.action_area}>
                <div
                  className={styles.action_area_button}
                  onClick={props.burnToken}
                >
                  <p>Burn</p>
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
                  <p className={styles.label}>Created on: </p>
                  <p className={styles.value}>{props.creationDate}</p>
                </div>
                <div className={styles.information}>
                  <p className={styles.label}>Issued on: </p>
                  <p className={styles.value}>{props.issueDate}</p>
                </div>
                <div className={styles.information}>
                  <p className={styles.label}>Expiry date: </p>
                  <p className={styles.value}>
                    {props.expiryDate ? props.expiryDate : "null"}
                  </p>
                </div>
              </div>
              <div className={styles.information_websites}>
                <p>Associated website(s):</p>
                {props.link?.map((item: any) => (
                  <Fragment>
                    <a href={item} target="_blank" referrerPolicy="no-referrer">
                      {item}
                    </a>
                    <br />
                  </Fragment>
                ))}
              </div>
            </div>
            <div className={styles.claimsStatus}>
              <h2 className={styles.claimsHeading}>Claims</h2>
              <div className={styles.claims_search}></div>
              <div className={styles.claims_list}>
                <div className={styles.claims_list_item}>
                  <p>Wallet Address</p>
                  <p>Claimed?</p>
                  <p>Claim date</p>
                </div>
                {props.claimedStatus?.map((claim) => (
                  <div className={styles.claims_list_item}>
                    <p>{claim.walletAddress}</p>
                    <p>{claim.claimed ? "Claimed" : "Not claimed"}</p>
                    <p>{claim.claimedOn ? claim.claimedOn : "-"}</p>
                    <div
                      className={styles.burn_button}
                      onClick={props.burnToken}
                    >
                      <p>Burn</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuedNTTCardModal;
