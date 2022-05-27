import styles from "@styles/components/pages/CreatorCards.module.scss";
import { NTTtype } from "@interfaces/pages/Dashboard";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_ISSUER_STATUS } from "../../../utils/subgraph/queries";
import { Fragment, useState } from "react";
import IssuedNTTCardModal from "@components/modal/issuedNTT";
import Link from "next/link";


function getIssuerStatus(contractAddress: string) {
  const { loading, error, data } = useQuery(GET_ISSUER_STATUS(contractAddress));
  if (loading) console.log("issuerStatus: Loading");
  if (error) console.log("issuerStatus: Error");
  if (data) console.log("issuerStatus: ", data.whitelistItems);
}

const CreatorCards = (props: NTTtype) => {
  const [modal, openModal] = useState(false);

  const burnToken = async () => {
    const confirmation = confirm("Are you sure you want to revoke this token?");
  };

  const viewInformationModal = () => {
    if (!modal) openModal(true);
  };

  const closeModal = () => {
    openModal(false);
  };
  return (
    <Fragment>
      {modal ? (
        <IssuedNTTCardModal
          {...props}
          closeModal={closeModal}
          burnToken={burnToken}
        />
      ) : null}
      <div className={styles.certificate_container}>
        <div className={styles.certificate_image}>
          <Image
            src={
              "https://images.unsplash.com/photo-1642388538891-38b2d14e750e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
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
            </div>
            <div className={styles.action_area}>
              {props.type === "inQueue" ? (
                <Link href={`/createNTT?type=Certificate&id=${"HI"}`}>
                  <button>Edit</button>
                </Link>
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
