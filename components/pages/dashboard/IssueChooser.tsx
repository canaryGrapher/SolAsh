import styles from "@styles/components/pages/IssueChooser.module.scss";
import Link from "next/link";
import Image from "next/image";

import { Create_Certificate, Create_Token } from "@resources/exports";

const IssueChooser = () => (
  <div className={styles.issue_chooser}>
    <div className={styles.issue_chooser_header}>
      <h2>Issue NTT</h2>
      <p>Choose a type</p>
    </div>
    <div className={styles.issue_chooser_options}>
      <div className={styles.options_main}>
        <Link href="/createNTT?type=Certificate">
          <div className={styles.option_container}>
            <Image
              src={Create_Certificate}
              alt="Create Certificate"
              height={80}
              width={100}
            />
            <p>Certificate</p>
          </div>
        </Link>
      </div>
      <div className={styles.options_or}>
        <p>or</p>
      </div>
      <div className={styles.options_main}>
        <Link href="/createNTT?type=Token">
          <div className={styles.option_container}>
            <Image
              src={Create_Token}
              alt="Create Certificate"
              height={80}
              width={80}
            />
            <p>Token</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default IssueChooser;
