import { useState, useContext } from "react";
import styles from "@styles/pages/home/Home.module.scss";
import RootLayout from "@layouts/Root";
import Image from "next/image";
import Certificates from "@components/pages/home/Tokens";
import { Home_Banner } from "@resources/exports";
import { TokenDetailType } from "@interfaces/pages/Home";
import UserContext from "@context/UserContext";
import { getHomeData } from "@graphAPI/home";
import Waiting from "@components/modal/misc/Waiting";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"certificate" | "ticket">(
    "certificate"
  );

  const userContext = useContext(UserContext);

  const tokensData: TokenDetailType[] = getHomeData(userContext.userName);
  const ticketsData: TokenDetailType[] = [];

  return loading ? (
    <Waiting message="Your Transaction is in progrees" />
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
                  tokensData.length > 0 &&
                  tokensData?.map(
                    (certificate: TokenDetailType, index: number) => (
                      <Certificates
                        {...certificate}
                        key={index}
                        loaderState={setLoading}
                      />
                    )
                  )}
                {selectedTab === "certificate" && tokensData.length === 0 && (
                  <div className={styles.emptyBox}>
                    <p>Ooops! Nothing found here.</p>
                  </div>
                )}
                {selectedTab === "ticket" &&
                  ticketsData.length > 0 &&
                  ticketsData.map((token: TokenDetailType, index: number) => (
                    <Certificates
                      {...token}
                      key={index}
                      loaderState={setLoading}
                    />
                  ))}
                {selectedTab === "ticket" && ticketsData.length === 0 && (
                  <div className={styles.emptyBox}>
                    <p>Ooops! Nothing found here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
