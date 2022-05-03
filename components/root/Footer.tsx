import Link from "next/link";
import styles from "@styles/components/root/Footer.module.scss";

import Image from "next/image";
import { Logo } from "@resources/exports";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer_container}>
      <div className={styles.footer_logoContainer}>
        <Image
          src={Logo}
          className={styles.logo}
          alt="logo"
          height={50}
          width={50}
        />
        <h2>SolAsh</h2>
      </div>
      <div className={styles.link_container}>
        <div className={styles.footer_column}>
          <h3>Links</h3>
          <Link href="/">
            <p>Register Organization</p>
          </Link>
          <Link href="/">
            <p>Report an issue</p>
          </Link>
          <Link href="/">
            <p>Integration</p>
          </Link>
        </div>
        <div className={styles.footer_column}>
          <h3>About SolAsh</h3>
          <Link href="/">
            <p>Overview</p>
          </Link>
          <Link href="/">
            <p>Meet the team</p>
          </Link>
          <Link href="/">
            <p>Contact Us</p>
          </Link>
          <Link href="/">
            <p>Careers</p>
          </Link>
          <Link href="/">
            <p>Blogs</p>
          </Link>
        </div>
      </div>
    </div>
    <div className={styles.footer_copyright}>
      <p>Copyright © 2022 SolAsh. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
