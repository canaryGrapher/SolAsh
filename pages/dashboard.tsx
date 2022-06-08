import { useState, useContext } from "react";
import styles from "@styles/pages/dashboard/Dashboard.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";
import CreatorCards from "@components/pages/dashboard/CreatorCards";
import IssueChooser from "@components/pages/dashboard/IssueChooser";
import { Home_Banner } from "@resources/exports";
import { NTTtype } from "@interfaces/pages/Dashboard";
import UserContext from "@context/UserContext";
import { inQueueEvents, issuedEvents } from "@graphAPI/dashboard";
import Waiting from "@components/modal/misc/Waiting";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState<"inQueue" | "issued">(
    "inQueue"
  );
  const userContext = useContext(UserContext);
  const inQueue = inQueueEvents(userContext.userName);
  const issued = issuedEvents(userContext.userName);
  console.log(inQueue);
  console.log(issued);
  return loading ? (
    <Waiting message={message} />
  ) : (
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
                    <CreatorCards
                      {...certificate}
                      type="inQueue"
                      key={index}
                      setLoading={setLoading}
                      setMessage={setMessage}
                    />
                  ))}
                {selectedTab === "inQueue" && inQueue.length === 0 ? (
                  <div className={styles.emptyBox}>
                    <p>Ooops! Nothing found here.</p>
                  </div>
                ) : null}
                {selectedTab === "issued" &&
                  issued.length > 0 &&
                  issued.map((token: NTTtype, index: number) => (
                    <CreatorCards
                      {...token}
                      type="issued"
                      key={index}
                      contractAddress={token.contractAddress}
                    />
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
