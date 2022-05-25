import styles from "@styles/components/pages/CreatorCards.module.scss";
import { NTTtype } from "@interfaces/pages/Dashboard";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import IssuedNTTCardModal from "@components/modal/issuedNTT";

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
          <Image src={props.image} height={200} width={200} />
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
