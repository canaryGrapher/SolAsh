import { useContext } from "react";
import styles from "@styles/pages/landing/Home.module.scss";
import RootLayout from "@layouts/Root";
import { LandingSpecsProps } from "@interfaces/pages/Landing";
import Specs from "@components/pages/landing/Specs";
import { LayoutValues } from "@utils/pages/landing";

import { useMetaMask } from "metamask-react";
import {
  Landing_image,
  Start_Now_Button,
  Register_Button,
  Register_Image,
} from "@resources/exports";
import Image from "next/image";
import Link from "next/link";

import LoginContext from "@context/LoginContext";

export default function Home() {
  const loginData = useContext(LoginContext);
  return (
    <RootLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.first_slide}>
            <div className={styles.left_container}>
              <div className={styles.image_container}>
                <Image
                  src={Landing_image}
                  alt="landing"
                  height={600}
                  width={550}
                />
              </div>
            </div>
            <div className={styles.right_container}>
              <div className={styles.right_container_content}>
                <h1>NTTs</h1>
                <p>
                  <span>Utility Tokens</span> for{" "}
                  <span>multiple use-cases</span>, with the{" "}
                  <span>simplicity</span> of any other tokens.
                </p>
                {loginData.isLoggedIn ? (
                  <Link href={"/dashboard"}>
                    <Image
                      src={Start_Now_Button}
                      alt="start now"
                      height={50}
                      width={150}
                    />
                  </Link>
                ) : (
                  <div onClick={loginData.toggleLoginModal}>
                    <Image
                      src={Start_Now_Button}
                      alt="start now"
                      height={50}
                      width={150}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.second_slide}>
            <div className={styles.introductory}>
              <h2>What are NTTs?</h2>
              <p>
                Non-Transferable Non-Fungible Tokens also known as NTTs are NFTs
                that cannot be transferred after creation. They are tied to an
                address for the entirety of its lifetime and are often referred
                to as ‘soulbound’ tokens.{" "}
              </p>
            </div>
            <div className={styles.app_specifications}>
              {LayoutValues.map((layout: LandingSpecsProps, index: number) => (
                <Specs
                  key={index}
                  alignment={index % 2 === 0 ? "row" : "row-reverse"}
                  image={layout.image}
                  heading={layout.heading}
                  description={layout.description}
                />
              ))}
            </div>
            <div className={styles.solution_explanation}>
              <h2>Certification and token solution</h2>
              <p>
                Whether you are a huge organization, or a small community,
                SolAsh makes it easier to issue certificates and tokens for
                various uses. Scheduling and minting an NTT takes less than 5
                minutes, even for hundreds of users.
              </p>
            </div>
            <div className={styles.onboarding_proposal}>
              <div className={styles.left}>
                <Image src={Register_Image} height={350} width={350} />
              </div>
              <div className={styles.right}>
                <h2>Register your organization</h2>
                <p>
                  Organizations and communities are already joining SolAsh. It
                  takes only a few minutes to verify your association with the
                  organization/community you are registering.
                </p>
                <Link href={"/register"}>
                  <Image
                    src={Register_Button}
                    alt="start now"
                    height={50}
                    width={200}
                  />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}
