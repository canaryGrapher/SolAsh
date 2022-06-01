import { useState, Fragment, useEffect } from "react";
import RootLayout from "@layouts/Root";
import styles from "@styles/pages/claim/Claims.module.scss";
import NTTEvent from "@contracts/NTTEvent.sol/NTTEvent.json";
import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import { useQuery } from "@apollo/client";
import {
  GET_USER_STATUS,
  GET_EVENT_DETAILS,
} from "../../utils/subgraph/queries";
import { useRouter } from "next/router";

const Months = [
  "Januray",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/*
1. The link to this page shall be: localhost:port/claim/[contractAddress]
2. Prompt the user to login if not, and redirect to this page on successful login
3. After login, query the graph data to get the status of the current account:
    3.1 if the account status is notClaimed then show the user the mint page
        3.1.1 The mint page should show the details of the token and a mint button
    3.2 if the account status is claimed, then inform the user that the token as already been minted, redirect to the home page
    3.3 if the account status is revoked, then display a message showing not eligible to mint the token
4. After the mint is successful, show success message and redirect to home page

Status{
    Revoked,     0
    Claimed,     1 
    NotClaimed   2
}
*/
//   |
//   |
//  \ /
//   v
const getUserStatus = (contractAddress: string, username: string) => {
  console.log("Usercontet: ", username);
  const { loading, error, data } = useQuery(
    GET_USER_STATUS(contractAddress, username)
  );

  if (loading) console.log("getUserStatus: Loading");
  if (error) console.log("getUserStatus: Error");

  if (data) {
    console.log("getUserStatus: ", data.whitelistItems[0].stat);
    return data.whitelistItems[0].status;
  }

  return 0;
};

const getDate = (dateItem: number) => {
  const date = dateItem ? new Date(dateItem) : new Date();
  return `${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()}`;
};

const getEventDetails = (contractAddress: string) => {
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS(contractAddress));
  if (loading) console.log("getEventDetails: Loading");

  if (error) console.log("getEventDetails: Error");

  if (data) {
    console.log("getEventDetails: ", data.nttcontracts);
    return data.nttcontracts[0];
  }
};

//Move this function inside the component
const mintToken = async (contractAddress: string) => {
  const { ethereum } = useMetaMask();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, NTTEvent.abi, signer);

  try {
    const transaction = await contract.mint();
    const status = await transaction.wait();
    console.log("MINT STATUS: ", status);
  } catch (err: any) {
    console.log("Mint token: ", err.data.message);
  }
};

export default function Claim() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdOnDate, setCreatedOnDate] = useState("");
  const { account } = useMetaMask();
  const router = useRouter();
  //   const userContext = useContext(UserContext);
  const parsedUrl: string = router.asPath.split("/")[2];
  // @ts-ignore
  const status = getUserStatus(parsedUrl, account);
  const getEventData = getEventDetails(parsedUrl);
  useEffect(() => {
    let TempcreatedOnDate = getDate(Number(getEventData?.timeStamp)) || "";
    let TempendDate = getDate(Number(getEventData?.endDate)) || "";
    let TempstartDate = getDate(Number(getEventData?.startDate)) || "";

    setCreatedOnDate(TempcreatedOnDate);
    setEndDate(TempendDate);
    setStartDate(TempstartDate);
  }, [getEventData]);

  return (
    <RootLayout>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={getEventData?.imageHash} />
          </div>
          <div className={styles.informationContainer}>
            <div className={styles.information_container}>
              <h2>{getEventData?.title}</h2>
              <p className={styles.community_information}>
                Issued by: <span>{getEventData?.associatedCommunity}</span>
              </p>
              <p className={styles.ntt_description}>
                {getEventData?.description}
              </p>
              <div className={styles.information_area}>
                <div className={styles.information_about_dates}>
                  <div className={styles.information}>
                    <p className={styles.label}>Issue started on: </p>
                    <p className={styles.value}>{startDate}</p>
                  </div>
                  <div className={styles.information}>
                    <p className={styles.label}>Claim before: </p>
                    <p className={styles.value}>{endDate}</p>
                  </div>
                  <div className={styles.information}>
                    <p className={styles.label}>Created on: </p>
                    <p className={styles.value}>{createdOnDate}</p>
                  </div>
                  <div className={styles.information}>
                    <p className={styles.label}>Created by: </p>
                    <p className={styles.value}>
                      {getEventData?.creatorAddress}
                    </p>
                  </div>
                  <div className={styles.information}>
                    <p className={styles.label}>Contract address: </p>
                    <p className={styles.value}>
                      {getEventData?.contractAddress}
                    </p>
                  </div>
                  <div className={styles.information}>
                    <p className={styles.label}>NTT ID: </p>
                    <p className={styles.value}>{getEventData?.id}</p>
                  </div>
                </div>
                <div className={styles.information_websites}>
                  <p>Associated website(s):</p>
                  {getEventData?.links?.map((item: string) => (
                    <Fragment>
                      <a
                        href={item}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        {item}
                      </a>
                      <br />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

// export async function getStaticgetEventData(context: any) {
//   const contractAddress = context.params.claim;
//   const status = getUserStatus(contractAddress);
//   return {
//     getEventData: {
//       contractAddress,
//       status,
//     },
//   };
// }
