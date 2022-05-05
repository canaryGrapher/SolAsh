import { useState } from "react";
import styles from "@styles/pages/home/Home.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";

import Certificates from "@components/pages/home/Tokens";

import { Home_Banner } from "@resources/exports";
import { IPassedProps, NTTtype } from "@interfaces/pages/Home";

export default function Home({ certificateData, ticketData }: IPassedProps) {
  const [selectedTab, setSelectedTab] = useState<"certificate" | "ticket">(
    "certificate"
  );
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
                <h1 className={styles.content_title}>Issued to me</h1>
                <p className={styles.content_subtitle}>
                  All the tokens issued to your cryptographic wallet will be
                  <br />
                  visible here after you sign them.
                </p>
              </div>
            </div>
            <div className={styles.content_body_container}>
              <div className={styles.content_tabs}>
                <div className={styles.content_tab}>
                  <div
                    onClick={() => setSelectedTab("certificate")}
                    className={
                      selectedTab === "certificate"
                        ? styles.selected_content_tab_header
                        : styles.content_tab_header
                    }
                  >
                    <h2>Certificates</h2>
                  </div>
                </div>
                <div className={styles.content_tab}>
                  <div
                    onClick={() => setSelectedTab("ticket")}
                    className={
                      selectedTab === "ticket"
                        ? styles.selected_content_tab_header
                        : styles.content_tab_header
                    }
                  >
                    <h2>Tickets</h2>
                  </div>
                </div>
              </div>
              <div className={styles.actual_content}>
                {selectedTab === "certificate" &&
                  certificateData.map((certificate: NTTtype, index: number) => (
                    <Certificates {...certificate} key={index} />
                  ))}
                {selectedTab === "ticket" &&
                  ticketData.map((token: NTTtype, index: number) => (
                    <Certificates {...token} key={index} />
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
  const certificateData = [
    {
      associatedCommunity: "Community 1",
      title: "Certificate 1",
      description: "This is a certificate",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: null,
      signedOn: "2020-01-01",
    },
    {
      associatedCommunity: "Community 1",
      title: "Certificate 2",
      description: "This is a certificate",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      signedOn: "2020-01-01",
    },
  ];

  const ticketData = [
    {
      associatedCommunity: "Community 1",
      title: "Ticket 1",
      description: "This is a ticket",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      signedOn: "2020-01-01",
    },
    {
      associatedCommunity: "Community 1",
      title: "Ticket 2",
      description: "This is a ticket",
      image: "https://via.placeholder.com/150",
      link: "https://www.google.com",
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      signedOn: "2020-01-01",
    },
  ];
  return {
    props: {
      certificateData,
      ticketData,
    },
  };
}
