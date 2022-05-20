import { useEffect, useState } from "react";
import styles from "@styles/pages/dashboard/Dashboard.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";
import { useRouter } from "next/router";

import CreatorCards from "@components/pages/dashboard/CreatorCards";
import IssueChooser from "@components/pages/dashboard/IssueChooser";

import { Home_Banner } from "@resources/exports";
import { IPassedProps, NTTtype } from "@interfaces/pages/Dashboard";
import { useMetaMask } from "metamask-react";
import { ethers } from 'ethers';
import  NTTEvent  from "../artifacts/contracts/NTTEvent.sol/NTTEvent.json";

export default function Dashboard({ inQueue, issued }: IPassedProps) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [selectedTab, setSelectedTab] = useState<"inQueue" | "issued">(
    "inQueue"
  );

  //Functions to update details
  const addToWhitelist = async (nttContractAddress : string, list : []) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nttContractAddress, NTTEvent.abi, signer);

    try {
      const transaction = await contract.addToWhitelist(list);
      const status = await transaction.wait();
      console.log("addToWhitelist: ", status); 
    } catch(err) {
        alert("addToWhitelist: " +  err);
    }
  }  

  const removeFromWhitelist = async (nttContractAddress : string, list : []) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nttContractAddress, NTTEvent.abi, signer);

    try {
      const transaction = await contract.removeFromWhitelist(list);
      const status = await transaction.wait();
      console.log("removeFromWhitelist: ", status); 
    } catch(err) {
        alert("removeFromWhitelist: " +  err);
    }
  }

  //TODO: default values must be the value of the existing eventdetail
  const updateDetails = async (
    nttContractAddress : string,
    title : string = "", 
    description : string = "", 
    links : [] = [], 
    imageHash : string = "", 
    associatedCommunity : string = "",
  ) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nttContractAddress, NTTEvent.abi, signer);

    try {
      const transaction = await contract.updateDetails(title, description, links, imageHash, associatedCommunity);
      const status = await transaction.wait();
      console.log("updateDetails: ", status); 
    } catch(err) {
        alert("updateDetails: " +  err);
    }
  }


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
                  inQueue.map((certificate: NTTtype, index: number) => (
                    <CreatorCards {...certificate} type="inQueue" key={index} />
                  ))}
                {selectedTab === "issued" &&
                  issued.map((token: NTTtype, index: number) => (
                    <CreatorCards {...token} type="issued" key={index} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  );
}

export async function getServerSideProps() {
  const inQueue = [
    {
      associatedCommunity: "Community 1",
      title: "Certificate 1",
      description: "This is a certificate",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: null,
      creationDate: "2020-01-01",
    },
    {
      associatedCommunity: "Community 1",
      title: "Certificate 2",
      description: "This is a certificate",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      creationDate: "2020-01-01",
    },
  ];

  const issued = [
    {
      associatedCommunity: "Community 1",
      title: "Ticket 1",
      description: "This is a ticket",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      creationDate: "2020-01-01",
    },
    {
      associatedCommunity: "Community 1",
      title: "Ticket 2",
      description: "This is a ticket",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      creationDate: "2020-01-01",
    },
  ];
  return {
    props: {
      inQueue,
      issued,
    },
  };
}
