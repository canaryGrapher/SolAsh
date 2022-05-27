import { useEffect, useState } from "react";
import styles from "@styles/pages/dashboard/Dashboard.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";

import CreatorCards from "@components/pages/dashboard/CreatorCards";
import IssueChooser from "@components/pages/dashboard/IssueChooser";

import { Home_Banner } from "@resources/exports";
import { IPassedProps, NTTtype } from "@interfaces/pages/Dashboard";
import { useQuery } from "@apollo/client";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

import {
  GET_EVENTS_IN_QUEUE,
  GET_EVENTS_ISSUED,
} from "../utils/subgraph/queries";

function inQueueEvents() {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const { loading, error, data } = useQuery(GET_EVENTS_IN_QUEUE(currentTime));
  if (loading) console.log("inQueue: Loading");
  if (error) console.log("inQueue: Error");

  if (data) {
    let formatted_data: NTTtype[] = data.nttcontracts.map((ntt: any) => {
      return {
        associatedCommunity: ntt.associatedCommunity,
        title: ntt.title,
        description: ntt.description,
        link: ntt.links,
        issueDate: ntt.timeStamp,
        image: ntt.imageHash,
        type: "Certificate",
        claimedStatus: [],
      };
    });
    return formatted_data;
  }
  return [];
}

function issuedEvents() {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const { loading, error, data } = useQuery(GET_EVENTS_ISSUED(currentTime));
  if (loading) console.log("issued: Loading");
  if (error) console.log("issued: Error");

  if (data) {
    let formatted_data: NTTtype[] = data.nttcontracts.map((ntt: any) => {
      return {
        associatedCommunity: ntt.associatedCommunity,
        title: ntt.title,
        description: ntt.description,
        link: ntt.links,
        issueDate: ntt.timeStamp,
        image: ntt.imageHash,
        type: "Certificate",
        claimedStatus: [],
      };
    });
    return formatted_data;
  }
  return [];
}

export default function Dashboard() {
  const { ethereum } = useMetaMask();
  const [selectedTab, setSelectedTab] = useState<"inQueue" | "issued">(
    "inQueue"
  );

  //Functions to update details
  // const addToWhitelist = async (nttContractAddress: string, list: []) => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(
  //     nttContractAddress,
  //     // NTTEvent.abi,
  //     signer
  //   );

  //   try {
  //     const transaction = await contract.addToWhitelist(list);
  //     const status = await transaction.wait();
  //     console.log("addToWhitelist: ", status);
  //   } catch (err) {
  //     alert("addToWhitelist: " + err);
  //   }
  // };

  // const removeFromWhitelist = async (nttContractAddress: string, list: []) => {
  //   const provider = new ethers.providers.Web3Provider(ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(
  //     nttContractAddress,
  //     NTTEvent.abi,
  //     signer
  //   );

  //   try {
  //     const transaction = await contract.removeFromWhitelist(list);
  //     const status = await transaction.wait();
  //     console.log("removeFromWhitelist: ", status);
  //   } catch (err) {
  //     alert("removeFromWhitelist: " + err);
  //   }
  // };

  const inQueue = inQueueEvents();
  const issued = issuedEvents();

  return (
    <RootLayout>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.banner_container}>
            <Image
              src={Home_Banner}
              alt="NTT homepage banner"
              layout="responsive"
            />
          </div>
          <div className={styles.content_container}>
            <div className={styles.content_header_container}>
              <div className={styles.content_header}>
                <h1 className={styles.content_title}>Dashboard</h1>
                <p className={styles.content_subtitle}>
                  Issue a NTT or make changes to the NTTs that are yet to be
                  minted.
                </p>
              </div>
            </div>
            <IssueChooser />
            <div className={styles.content_body_container}>
              <div className={styles.content_tabs}>
                <div className={styles.content_tab}>
                  <div
                    onClick={() => setSelectedTab("inQueue")}
                    className={
                      selectedTab === "inQueue"
                        ? styles.selected_content_tab_header
                        : styles.content_tab_header
                    }
                  >
                    <h2>NTTs in queue</h2>
                  </div>
                </div>
                <div className={styles.content_tab}>
                  <div
                    onClick={() => setSelectedTab("issued")}
                    className={
                      selectedTab === "issued"
                        ? styles.selected_content_tab_header
                        : styles.content_tab_header
                    }
                  >
                    <h2>Issued NTTs</h2>
                  </div>
                </div>
              </div>
              <div className={styles.actual_content}>
                {selectedTab === "inQueue" &&
                  inQueue.length > 0 &&
                  inQueue.map((certificate: NTTtype, index: number) => (
                    <CreatorCards {...certificate} type="inQueue" key={index} />
                  ))}
                {selectedTab === "inQueue" && inQueue.length === 0 ? (
                  <div className={styles.emptyBox}>
                    <p>Ooops! Nothing found here.</p>
                  </div>
                ) : null}
                {selectedTab === "issued" &&
                  issued.length > 0 &&
                  issued.map((token: NTTtype, index: number) => (
                    <CreatorCards {...token} type="issued" key={index} />
                  ))}
                {selectedTab === "issued" && issued.length === 0 ? (
                  <div className={styles.emptyBox}>
                    <p>Ooops! Nothing found here.</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
