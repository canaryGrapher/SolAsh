import { useState, Fragment, useEffect } from "react";
import RootLayout from "@layouts/Root";
import styles from "@styles/pages/claim/Claims.module.scss";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { getUserStatus, getEventDetails, mintToken } from "@graphAPI/claim";

const getDate = (dateItemInSeconds: number) => {
  let date = new Date(1970, 0, 1);
  date.setSeconds(dateItemInSeconds);
  console.log("Date: ", date);
  return date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" });
};

export default function Claim() {
  const { ethereum } = useMetaMask();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdOnDate, setCreatedOnDate] = useState("");
  const [status, setStatus] = useState("");
  const { account } = useMetaMask();
  const router = useRouter();
  const parsedUrl: string = router.asPath.split("/")[2];

  // @ts-ignore
  const _status = getUserStatus(parsedUrl, account);
  const getEventData = getEventDetails(parsedUrl);

  useEffect(() => {
    const TempcreatedOnDate = getDate(Number(getEventData?.timeStamp)) || "";

    const TempstartDate = getDate(Number(getEventData?.startDate)) || "";

    const TempendDate =
      getEventData?.endDate != "0"
        ? getDate(Number(getEventData?.endDate))
        : "Eternity";

    const currentDate = new Date();

    if (
      TempendDate != "Ethernity" &&
      Math.floor(currentDate.getTime() / 1000) > Number(getEventData?.endDate)
    ) {
      setStatus("Expired");
    } else {
      setStatus(_status);
    }
    setCreatedOnDate(TempcreatedOnDate);
    setEndDate(TempendDate);
    setStartDate(TempstartDate);
  }, [getEventData, _status]);

  return (
    <RootLayout>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={getEventData?.imageHash} />
            {status === "2" ? (
              <button onClick={() => mintToken(parsedUrl, ethereum)}>
                Claim
              </button>
            ) : status === "1" ? (
              <p className={styles.notice}>You already claimed this token</p>
            ) : status === "0" ? (
              <p className={styles.notice}>This Token is not claimable</p>
            ) : (
              <p className={styles.notice}>Claimable status has expired</p>
            )}
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
