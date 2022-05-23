import styles from "@styles/components/pages/CreatorCards.module.scss";
import { NTTtype } from "@interfaces/pages/Dashboard";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_ISSUER_STATUS } from "../../../utils/subgraph/queries";

function getIssuerStatus(contractAddress : string) {
  const { loading, error, data } = useQuery(GET_ISSUER_STATUS(contractAddress));
  if (loading) console.log("issuerStatus: Loading");
  if (error) console.log("issuerStatus: Error");
  if (data) console.log("issuerStatus: ", data.whitelistItems);
}


const CreatorCards = (props: NTTtype) => {
  return (
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
            <button>{props.type === "inQueue" ? "Edit" : "Burn"}</button>
          </div>
        </div>
        <div className={styles.certificate_basic_info_grid}>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Creation date:</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.creationDate}</p>
            </div>
          </div>
          <div className={styles.certificate_basic_info}>
            <div className={styles.basic_info_type}>
              <p>Issue date:</p>
            </div>
            <div className={styles.basic_info_value}>
              <p>{props.issueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCards;
