import styles from "@styles/components/pages/CreatorCards.module.scss";
import { NTTtype } from "@interfaces/pages/Dashboard";
import { useQuery } from "@apollo/client";
import {
  GET_ISSUER_STATUS,
  GET_NOTCLAIMED_USERS,
} from "../../../utils/subgraph/queries";
import { Fragment, useState } from "react";
import IssuedNTTCardModal from "@components/modal/issuedNTT";
import WhitelistEditModal from "@components/modal/editWhitelist";
import Link from "next/link";
import { addToWhitelist, removeFromWhitelist } from "@graphAPI/createNTT";
import { stockImageUrl } from "config";
import { ethers } from "ethers";
import NTTEvent from "../../../artifacts/contracts/NTTEvent.sol/NTTEvent.json";
import { useRouter } from "next/router";
import { useMetaMask } from "metamask-react";

function getIssuerStatus(contractAddress: string) {
  const { loading, error, data } = useQuery(
    GET_NOTCLAIMED_USERS(contractAddress)
  );
  if (loading) console.log("issuerStatus: Loading");
  if (error) console.log("issuerStatus: Error");
  if (data) {
    return data.whitelistItems;
  }
}

function getClaimedStatus(contractAddress: string) {
  const { loading, error, data } = useQuery(GET_ISSUER_STATUS(contractAddress));
  if (loading) console.log("issuerStatus: Loading");
  if (error) console.log("issuerStatus: Error");
  if (data) {
    return data.whitelistItems;
  }
}

const CreatorCards = (props: NTTtype) => {
  const router = useRouter();
  const { ethereum } = useMetaMask();
  const [informationModal, openInformationModal] = useState(false);
  const [editWhiteListModal, openEditWhiteListModal] = useState(false);
  console.log("Creator Cards: ", props);
  const burnToken = async (contractAddress: string, tokenId: string) => {
    const confirmation = confirm("Are you sure you want to revoke this token?");
    props.setLoading(true);
    if (confirmation) {
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
        props.setLoading(false);
        router.reload();
      } catch (err: any) {
        props.setLoading(false);
      }
    }
  };

  const viewInformationModal = () => {
    if (!informationModal) openInformationModal(true);
  };

  const viewwhitelistModal = () => {
    if (!editWhiteListModal) openEditWhiteListModal(true);
  };

  const closeModal = () => {
    openInformationModal(false);
  };

  const closeWhitelistModal = () => {
    openEditWhiteListModal(false);
  };

  return (
    <Fragment>
      {informationModal ? (
        <IssuedNTTCardModal
          {...props}
          closeModal={closeModal}
          burnToken={burnToken}
          getIssuerStatus={getClaimedStatus}
          contractAddress={props.contractAddress}
        />
      ) : null}
      {editWhiteListModal ? (
        <WhitelistEditModal
          {...props}
          closeModal={closeWhitelistModal}
          contractAddress={props.contractAddress}
          getIssuerStatus={getIssuerStatus}
          removeFromWhiteList={removeFromWhitelist}
          addToWhiteList={addToWhitelist}
        />
      ) : null}
      <div className={styles.certificate_container}>
        <div className={styles.certificate_image}>
          <img
            src={
              props.image
                ? `https://ipfs.io/ipfs/${props.image}`
                : stockImageUrl
            }
            height={200}
            width={200}
          />
        </div>
        <div className={styles.certificate_information_container}>
          <div className={styles.certificate_information}>
            <div className={styles.basic_information}>
              <h2>{props.title}</h2>
              <p>{props.description}</p>
              <div className={styles.information_bar}>
                <div className={styles.information_bar_item}>
                  <p>Magic Link:</p>
                  <p>
                    <a
                      href={`http://localhost:3000/claim/${props.contractAddress}`}
                    >{`http://localhost:3000/claim/${props.contractAddress}`}</a>
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `http://localhost:3000/claim/${props.contractAddress}`
                        );
                      }}
                    >
                      Copy
                    </span>
                  </p>
                </div>
                <div className={styles.information_bar_item}>
                  <p>Start date:</p>
                  <p>{`${new Date(parseInt(props.startDate) * 1000)
                    .toString()
                    .slice(0, -30)}`}</p>
                </div>
                <div className={styles.information_bar_item}>
                  <p>End date:</p>
                  <p>{`${
                    props.endDate === "0"
                      ? "Eternity"
                      : new Date(parseInt(props.endDate) * 1000)
                          .toString()
                          .slice(0, -30)
                  }`}</p>
                </div>
              </div>
            </div>
            <div className={styles.action_area}>
              {props.type === "inQueue" ? (
                <Fragment>
                  <Link
                    href={`/createNTT?type=Certificate&address=${props.contractAddress}&mode=edit`}
                  >
                    <button>Edit details</button>
                  </Link>
                  <button onClick={viewwhitelistModal}>Edit whitelist</button>
                </Fragment>
              ) : (
                <button onClick={viewInformationModal}>View</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatorCards;
