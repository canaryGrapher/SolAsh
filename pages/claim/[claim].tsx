import { useState, Fragment, useEffect } from "react";
import RootLayout from "@layouts/Root";
import styles from "@styles/pages/claim/Claims.module.scss";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { getUserStatus, getEventDetails, mintToken } from "@graphAPI/claim";
import { stockImageUrl } from "config";

import Waiting from "@components/modal/misc/Waiting";

const getDate = (dateItemInSeconds: number) => {
  let date = new Date(1970, 0, 1);
  date.setSeconds(dateItemInSeconds);
  console.log("Date: ", date);
  return date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" });
};

const showButtonForClaiming = (
  status: string,
  startDate: string,
  endDate: string,
  parsedUrl: string,
  setMessage: (msg: string) => void,
  setLoading: (state: boolean) => void,
  router: any,
  ethereum?: any
) => {
  const currentDate = Math.floor(new Date().getTime() / 1000);
  const _endDate = Number(endDate);
  const _startDate = Number(startDate);
  console.log(
    "currentDate: " +
      currentDate +
      " startDate: " +
      startDate +
      " endDate: " +
      _endDate
  );

  if (_startDate > currentDate) {
    return <p className={styles.notice}>Claiming period is yet to begin</p>;
  }
  if (_endDate < currentDate && _endDate != 0) {
    return <p className={styles.notice}>Claiming period is over</p>;
  }
  if (status === "0") {
    return <p className={styles.notice}>This Token is revoked</p>;
  }
  if (status === "1") {
    // const data = confirm("You already claimed this Token. Go to home page?");
    return <p className={styles.notice}>You already claimed this token</p>;
  }
  if (status === "2") {
    return (
      <button
        onClick={() =>
          mintFunction(parsedUrl, ethereum, setMessage, setLoading, router)
        }
      >
        Claim
      </button>
    );
  }
  return <p className={styles.notice}>You shouldn't be here</p>;
};

const mintFunction = (
  parsedUrl: string,
  ethereum: any,
  setMessage: (msg: string) => void,
  setLoading: (state: boolean) => void,
  router: any
) => {
  setMessage("Minting Token...");
  setLoading(true);
  mintToken(parsedUrl, ethereum)
    .then((res) => {
      setMessage("Token minted successfully");
    })
    .catch((err) => {
      setMessage("Error while minting token");
    })
    .finally(() => {
      setLoading(false);
      router.reload();
    });
};

export default function Claim() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
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
      TempendDate != "Eternity" &&
      Math.floor(currentDate.getTime() / 1000) > Number(getEventData?.endDate)
    ) {
      setStatus("Expired");
    } else {
      setStatus(_status);
    }
    setCreatedOnDate(TempcreatedOnDate);
    setEndDate(TempendDate);
    setStartDate(TempstartDate);
    console.log("SSSS2: ", status);
  }, [getEventData, _status]);

  return (
    <Fragment>
      {loading ? <Waiting message={message} /> : null}
      <RootLayout>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <img
                src={
                  getEventData?.imageHash
                    ? `https://ipfs.io/ipfs/${getEventData?.imageHash}`
                    : stockImageUrl
                }
                height={400}
                width={400}
              />
              {showButtonForClaiming(
                status,
                getEventData?.startDate,
                getEventData?.endDate,
                parsedUrl,
                setMessage,
                setLoading,
                router,
                ethereum
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
                      <p className={styles.value}>
                        {" "}
                        {new Date(parseInt(getEventData?.startDate) * 1000)
                          .toString()
                          .slice(0, -30)}
                      </p>
                    </div>
                    <div className={styles.information}>
                      <p className={styles.label}>Claim before: </p>
                      <p className={styles.value}>
                        {" "}
                        {getEventData?.endDate === "0"
                          ? "Eternity"
                          : new Date(parseInt(getEventData?.endDate) * 1000)
                              .toString()
                              .slice(0, -30)}
                      </p>
                    </div>
                    <div className={styles.information}>
                      <p className={styles.label}>Created on: </p>
                      <p className={styles.value}>
                        {new Date(parseInt(getEventData?.timeStamp) * 1000)
                          .toString()
                          .slice(0, -30)}
                      </p>
                    </div>
                    <div className={styles.information}>
                      <p className={styles.label}>Created by: </p>
                      <p className={styles.value}>
                        <a
                          href={`https://mumbai.polygonscan.com/address/${getEventData?.creatorAddress}`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className={styles.polygonscan_link}
                        >
                          {getEventData?.creatorAddress}
                        </a>
                      </p>
                    </div>
                    <div className={styles.information}>
                      <p className={styles.label}>Contract address: </p>
                      <p className={styles.value}>
                        <a
                          href={`https://mumbai.polygonscan.com/address/${getEventData?.contractAddress}`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className={styles.polygonscan_link}
                        >
                          {getEventData?.contractAddress}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={styles.information_websites}>
                    <p>Associated website(s):</p>
                    {getEventData?.links?.map((item: string, index: number) => (
                      <Fragment key={index}>
                        <a
                          href={`https://${item}`}
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
    </Fragment>
  );
}
