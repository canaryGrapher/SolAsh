import styles from "@styles/components/pages/Tokens.module.scss";
import { NTTtype, TokenDetailType } from "@interfaces/pages/Home";
import InformationModal from "@components/modal/information";
import Image from "next/image";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import NTTEvent from "../../../artifacts/contracts/NTTEvent.sol/NTTEvent.json";
import { Fragment, useState } from "react";

const Certificates = (props: TokenDetailType) => {
  const { ethereum } = useMetaMask();
  const [modal, openModal] = useState(false);

  const revokeToken = async () => {
    const confirmation = confirm("Are you sure you want to revoke this token?");
    if (confirmation) {
      const burnTokenEvent = async (
        contractAddress: string,
        tokenId: BigInt
      ) => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          NTTEvent.abi,
          signer
        );
        try {
          const transaction = await contract.burnTokenEvent(tokenId);
          const status = await transaction.wait();
          console.log("STATUS: ", status);
        } catch (err: any) {
          console.log("burnTokenEvent: ", err.data.message);
        }
      };
    }
  };

  const viewInformationModal = () => {
    if (!modal) openModal(true);
  };

  const closeModal = () => {
    openModal(false);
  };

  // burnTokenEvent("0xcdf2edc9cf96e277913566d3b04e6b63bfe5e7c0", BigInt(3));

  return (
    <Fragment>
      {modal ? (
        <InformationModal
          {...props}
          closeModal={closeModal}
          revokeToken={revokeToken}
        />
      ) : null}
      <div className={styles.certificate_container}>
        <div className={styles.certificate_image}>
          <Image src={props.imageHash} height={200} width={200} />
        </div>
        <div className={styles.certificate_information_container}>
          <div className={styles.certificate_information}>
            <div className={styles.basic_information}>
              <h2>{props.title}</h2>
              <p className={styles.ntt_description}>{props.description}</p>
              <p className={styles.ntt_community}>
                <span>Issued by: </span>
                {props.associatedCommunity}
              </p>
            </div>
            <div className={styles.action_area}>
              <button onClick={viewInformationModal}>View</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Certificates;
