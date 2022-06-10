import { InformationModalProps } from "@interfaces/components/InformationModal";
import styles from "@styles/components/modal/IssuedNTTModal.module.scss";
import { Fragment } from "react";
import { stockImageUrl } from "config";
import { ModalProps } from "@interfaces/components/creatorModal";
import axios from "axios";
const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/jatin17solanki/solash-subgraph";

const IssuedNTTCardModal: React.FC<ModalProps> = (props) => {
  const issuerData = props.getIssuerStatus(props.contractAddress);
  console.log("Props: ", props);
  console.log("IssuerData: ", issuerData);

  const getTokenData = async (contractAddress: string, userAddress: string) => {
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
        throw new Error(
          `getTokenData, Error making subgraph query ${response.data.errors}`
        );
      }

      if (response.data.data.tokens.length != 0) {
        console.log("getTokenData: ", response.data.data.tokens[0]);
        return response.data.data.tokens[0];
      }
      return {};
    } catch (error: any) {
      console.error(error);
      throw new Error(
        `getTokenData, Could not query the subgraph ${error.message}`
      );
    }
  };

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
            <div className={styles.information_area}>
              <div className={styles.information_about_dates}>
                <div className={styles.information}>
                  <p className={styles.label}>Issued on: </p>
                  <p className={styles.value}>
                    {new Date(Number(props.issueDate) * 1000).toLocaleString(
                      undefined
                    )}
                  </p>
                </div>
              </div>
              <div className={styles.information_websites}>
                <p>Associated website(s):</p>
                {props.link?.map((item: any, index: number) => (
                  <Fragment key={index}>
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
                  <p>Action</p>
                </div>
                {issuerData?.map((claim: any, index: number) => (
                  <div className={styles.claims_list_item} key={index}>
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
                    {claim.status === "1" ? (
                      <div
                        className={styles.burn_button}
                        // pass token id and contract address to burn token
                        onClick={async () => {
                          const tokenData = await getTokenData(
                            props.contractAddress,
                            claim.userAddress
                          );
                          props.burnToken(
                            props.contractAddress,
                            tokenData.tokenId
                          );
                        }}
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
