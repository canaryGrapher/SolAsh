import { useState } from "react";
import styles from "@styles/components/modal/whitelistModal.module.scss";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { WhiteLitEditModalTypes } from "@interfaces/pages/Dashboard";
import { stockImageUrl } from "config";

const WhitelistEditModal = (props: WhiteLitEditModalTypes) => {
  const router = useRouter();
  const issuerData = props.getIssuerStatus(props.contractAddress);
  const { ethereum } = useMetaMask();

  const [walletAddress, setWalletAddress] = useState<string>("");

  const removeWallet = async (wallet: string) => {
    props.setLoading(true);
    props.setMessage("Removing address from whitelist...");
    const data = props
      .removeFromWhiteList(ethereum, props.contractAddress, [wallet])
      .then((res: any) => {
        console.log(res);
        props.setMessage(
          "Please check your metamask extension for further instructions."
        );
      })
      .finally(() => {
        props.setMessage("Added address to whitelist.");
        props.setLoading(false);
        router.reload();
      });
    console.log("Wallet removed: ", data);
  };
  const addWallet = async () => {
    props.setLoading(true);
    props.setMessage("Adding address to whitelist...");
    const wallet: string[] = [walletAddress];
    const data = props
      .addToWhiteList(props.contractAddress, wallet, ethereum)
      .then((res: any) => {
        console.log(res);
        props.setMessage(
          "Please check your metamask extension for further instructions."
        );
      })
      .finally(() => {
        props.setMessage("Added address to whitelist.");
        props.setLoading(false);
        router.reload();
      });
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
                    : stockImageUrl
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
                {/* @ts-ignore */}
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
