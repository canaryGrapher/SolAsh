import { useState } from "react";

import styles from "@styles/components/root/Navbar.module.scss";
import { Logo, UserIcon } from "@resources/exports";

import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const username = "Narendra Modi";
  const accountAddress = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
  return (
    <nav className={styles.navbar}>
      <div className={styles.links_container}>
        <Image
          src={Logo}
          alt="Logo"
          className={styles.logo}
          height={35}
          width={35}
        />
        <Link href="/">
          <a className={styles.nav_items}>Home</a>
        </Link>
        <Link href="/">
          <a className={styles.nav_items}>Organizations</a>
        </Link>
        <Link href="/">
          <a className={styles.nav_items}>News</a>
        </Link>
      </div>
      <div className={styles.account_information}>
        {isLoggedIn ? (
          <div className={styles.userInfo}>
            <div className={styles.user_avatar}>
              <Image
                src={UserIcon}
                alt="User Icon"
                className={styles.avatar}
                height={35}
                width={35}
              />
            </div>
            <div className={styles.user_information}>
              <p className={styles.username}>{username}</p>
              <p className={styles.wallet_address}>
                {accountAddress.slice(0, 4) +
                  "..." +
                  accountAddress.slice(accountAddress.length - 3)}
              </p>
            </div>
          </div>
        ) : (
          <button className={styles.login_button}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
