import { useState, useContext, useEffect } from "react";
import styles from "@styles/pages/home/Home.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";

import Certificates from "@components/pages/home/Tokens";

import { Home_Banner } from "@resources/exports";
import { IPassedProps, NTTtype } from "@interfaces/pages/Home";

import { useQuery } from "@apollo/client";
import {
  GET_ALL_EVENTS,
  GET_TOKENS_ISSUED,
  GET_EVENTS_BY_ADDRESS,
} from "../utils/subgraph/queries";
import UserContext from "@context/UserContext";

export default function Home({ certificateData, ticketData }: IPassedProps) {
  const [selectedTab, setSelectedTab] = useState<"certificate" | "ticket">(
    "certificate"
  );

  const userContext = useContext(UserContext);
  const { loading, error, data } = useQuery(
    GET_TOKENS_ISSUED(userContext.userName)
  );
  if (loading) console.log("QQ: Loading");
  if (error) console.log("QQ: Error");
  if (data) console.log("QQ: ", userContext.userName, data.tokens);

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
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis bibendum ligula et tincidunt. Nunc ultricies non enim pellentesque egestas. Nam at ullamcorper nulla, ut gravida libero. In auctor nisi eu nisi ornare, nec mattis ipsum pulvinar. Vivamus non nibh consectetur, cursus metus ac, suscipit tellus. Aenean congue, nisl sit amet auctor hendrerit, tortor orci hendrerit nisi, id vestibulum ante velit sit amet massa. Proin dapibus lectus purus, at viverra nisl porta ac. Aliquam dapibus nisi at fringilla imperdiet. Donec metus erat, bibendum quis facilisis eget, fermentum non tellus.",
      image:
        "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331",
      link: [
        "https://www.google.com",
        "https://www.yahoo.com",
        "https://www.bing.com",
      ],
      issueDate: "2020-01-01",
      expiryDate: null,
      signedOn: "2020-01-01",
    },
    {
      associatedCommunity: "Community 1",
      title: "Certificate 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis bibendum ligula et tincidunt. Nunc ultricies non enim pellentesque egestas. Nam at ullamcorper nulla, ut gravida libero. In auctor nisi eu nisi ornare, nec mattis ipsum pulvinar. Vivamus non nibh consectetur, cursus metus ac, suscipit tellus. Aenean congue, nisl sit amet auctor hendrerit, tortor orci hendrerit nisi, id vestibulum ante velit sit amet massa. Proin dapibus lectus purus, at viverra nisl porta ac. Aliquam dapibus nisi at fringilla imperdiet. Donec metus erat, bibendum quis facilisis eget, fermentum non tellus.",
      image:
        "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331",
      link: [
        "https://www.google.com",
        "https://www.yahoo.com",
        "https://www.bing.com",
      ],
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      signedOn: "2020-01-01",
    },
  ];

  const ticketData = [
    {
      associatedCommunity: "Community 1",
      title: "Ticket 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis bibendum ligula et tincidunt. Nunc ultricies non enim pellentesque egestas. Nam at ullamcorper nulla, ut gravida libero. In auctor nisi eu nisi ornare, nec mattis ipsum pulvinar. Vivamus non nibh consectetur, cursus metus ac, suscipit tellus. Aenean congue, nisl sit amet auctor hendrerit, tortor orci hendrerit nisi, id vestibulum ante velit sit amet massa. Proin dapibus lectus purus, at viverra nisl porta ac. Aliquam dapibus nisi at fringilla imperdiet. Donec metus erat, bibendum quis facilisis eget, fermentum non tellus.",
      image:
        "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331",
      link: [
        "https://www.google.com",
        "https://www.yahoo.com",
        "https://www.bing.com",
      ],
      issueDate: "2020-01-01",
      expiryDate: "2020-01-01",
      signedOn: "2020-01-01",
    },
    {
      associatedCommunity: "Community 1",
      title: "Ticket 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis bibendum ligula et tincidunt. Nunc ultricies non enim pellentesque egestas. Nam at ullamcorper nulla, ut gravida libero. In auctor nisi eu nisi ornare, nec mattis ipsum pulvinar. Vivamus non nibh consectetur, cursus metus ac, suscipit tellus. Aenean congue, nisl sit amet auctor hendrerit, tortor orci hendrerit nisi, id vestibulum ante velit sit amet massa. Proin dapibus lectus purus, at viverra nisl porta ac. Aliquam dapibus nisi at fringilla imperdiet. Donec metus erat, bibendum quis facilisis eget, fermentum non tellus.",
      image:
        "https://images.unsplash.com/photo-1527871369852-eb58cb2b54e2?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331",
      link: [
        "https://www.google.com",
        "https://www.yahoo.com",
        "https://www.bing.com",
      ],
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
