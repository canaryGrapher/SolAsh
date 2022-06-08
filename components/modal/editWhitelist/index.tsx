import { useState } from "react";
import styles from "@styles/components/modal/whitelistModal.module.scss";
import { useMetaMask } from "metamask-react";

const WhitelistEditModal = (props: any) => {
  const issuerData = props.getIssuerStatus(props.contractAddress);
  const { ethereum } = useMetaMask();

  const [walletAddress, setWalletAddress] = useState<string>("");

  const removeWallet = async (wallet: string) => {
    console.log("Clicked remove");
    const data = await props.removeFromWhiteList(
      ethereum,
      props.contractAddress,
      [wallet]
    );
    console.log("Wallet removed: ", data);
  };
  const addWallet = async () => {
    const data = await props.addToWhiteList(
      props.contractAddress,
      [walletAddress],
      ethereum
    );
    console.log("Wallet added: ", data);
  };
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
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <button onClick={addWallet}>Add</button>
              </div>
              <div className={styles.address_boxes}>
                {issuerData?.map((address: any, index: number) => (
                  <div className={styles.address_box} key={index}>
                    <p>{address.userAddress}</p>
                    <div className={styles.action_area}>
                      <div
                        className={styles.action_area_button}
                        // onClick={props.closeModal}
                        onClick={() => removeWallet(address.userAddress)}
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
