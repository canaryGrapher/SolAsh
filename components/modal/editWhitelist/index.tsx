import { Fragment } from "react";
import styles from "@styles/components/modal/whitelistModal.module.scss";

const WhitelistEditModal = (props: any) => {
  const addresses = ["0x1", "0x2", "0x3"];
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
            <div className={styles.whitelist_action_area}>
              <div className={styles.input_area}>
                <input
                  type="text"
                  placeholder="Enter a new whitelist address"
                />
                <button>Add</button>
              </div>
              <div className={styles.address_boxes}>
                {addresses.map((address: string) => (
                  <div className={styles.address_box}>
                    <p>{address}</p>
                    <div className={styles.action_area}>
                      <div
                        className={styles.action_area_button}
                        // onClick={props.closeModal}
                      >
                        <p>Remove</p>
                      </div>
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

export default WhitelistEditModal;
