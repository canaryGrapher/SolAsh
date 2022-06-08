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
import {} from "@graphAPI/dashboard";

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
/*
whitelistItems schema:
    id: ID!                         //contractAddress_userAddress
    contractAddress: Bytes!
    userAddress: Bytes!
    status: BigInt!
*/

const CreatorCards = (props: NTTtype) => {
  const [informationModal, openInformationModal] = useState(false);
  const [editWhiteListModal, openEditWhiteListModal] = useState(false);

  const burnToken = async () => {
    const confirmation = confirm("Are you sure you want to revoke this token?");
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
          getIssuerStatus={getIssuerStatus}
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
                : "https://images.unsplash.com/photo-1642388538891-38b2d14e750e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
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
              <p>
                Magic Link:{" "}
                <a
                  href={`http://localhost:3000/claim/${props.contractAddress}`}
                >{`http://localhost:3000/claim/${props.contractAddress}`}</a>
              </p>
              <p>{`Start date: ${new Date(parseInt(props.startDate) * 1000)
                .toString()
                .slice(0, -30)}`}</p>
              <p>{`End date: ${
                props.endDate === "0"
                  ? "nil"
                  : new Date(parseInt(props.endDate) * 1000)
                      .toString()
                      .slice(0, -30)
              }`}</p>
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
