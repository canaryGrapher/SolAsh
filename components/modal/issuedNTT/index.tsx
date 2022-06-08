import { InformationModalProps } from "@interfaces/components/InformationModal";
import styles from "@styles/components/modal/IssuedNTTModal.module.scss";
import { Fragment } from "react";

import { ModalProps } from "@interfaces/components/creatorModal";
import axios from "axios";
const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/jatin17solanki/solash-subgraph";

const IssuedNTTCardModal: React.FC<ModalProps> = (props) => {
  const issuerData = props.getIssuerStatus(props.contractAddress);
  console.log("Props: ", props);
  console.log("IssuerData: ", issuerData);

  const getTokenData = async (contractAddress : string, userAddress : string) => {
    const query = `query {
      tokens(
        where: {
          receiverAddress: "${userAddress}",
          contractAddress: "${contractAddress}",
          isValid: true
        },
        orderBy: timeStamp
      ) {
        contractAddress
        tokenId
      }
    }`;

    try {
        const response = await axios.post(SUBGRAPH_URL, {
            query,
        });
        if (response.data.errors) {
            console.error(response.data.errors);
            throw new Error(`getTokenData, Error making subgraph query ${response.data.errors}`);
        }
        console.log("getTokenData: ", response.data.data.tokens[0]);
        return response.data.data.tokens[0];
    } catch (error: any) {
        console.error(error);
        throw new Error(`getTokenData, Could not query the subgraph ${error.message}`);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.image_container}>
            <div className={styles.certificate_image}>
              <img
                src={
                  props.image
                    ? `https://ipfs.io/ipfs/${props.image}`
                    : "https://images.unsplash.com/photo-1642388538891-38b2d14e750e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                }
                height={300}
                width={300}
              />
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
                {/* <div className={styles.information}>
                  <p className={styles.label}>Created on: </p>
                  <p className={styles.value}>{props.creationDate}</p>
                </div> */}
                <div className={styles.information}>
                  <p className={styles.label}>Issued on: </p>
                  <p className={styles.value}>{props.issueDate}</p>
                </div>
                {/* <div className={styles.information}>
                  <p className={styles.label}>Expiry date: </p>
                  <p className={styles.value}>
                    {props.expiryDate ? props.expiryDate : "null"}
                  </p>
                </div> */}
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
                </div>
                {issuerData?.map((claim: any) => (
                  <div className={styles.claims_list_item}>
                    <p>{claim.userAddress}</p>
                    <p>
                      {claim.status == "0"
                        ? "Revoked"
                        : claim.status == "1"
                        ? "Claimed"
                        : claim.status == "2"
                        ? "Not claimed"
                        : "Error"}
                    </p>
                    {/* <p>{claim.claimedOn ? claim.claimedOn : "-"}</p> */}
                    {claim.claimed ? (
                      <div
                        className={styles.burn_button}
                        // pass token id and contract address to burn token
                        onClick={props.burnToken}
                      >
                        <p>Burn</p>
                      </div>
                    ) : null}
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
