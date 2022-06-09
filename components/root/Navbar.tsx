import styles from "@styles/components/root/Navbar.module.scss";
import { Logo, UserIcon } from "@resources/exports";

import { NavbarPropsTypes } from "@interfaces/components/Navbar";

import { useMetaMask } from "metamask-react";

import Image from "next/image";
import Link from "next/link";

import {
  LoggedInOptions,
  LoggedOutOptions,
} from "@utils/components/NavbarOptions";

const Navbar: React.FC<NavbarPropsTypes> = (props) => {
  const { account } = useMetaMask();
  const username = "Narendra Modi";
  const accountAddress =
    account || "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
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
        {(props.loggedIn ? LoggedInOptions : LoggedOutOptions).map(
          (linkItem: any, index: number) => (
            <Link key={index} href={linkItem.href}>
              <a className={styles.nav_items}>{linkItem.title}</a>
            </Link>
          )
        )}
      </div>
      <div className={styles.account_information}>
        {props.loggedIn ? (
          <div className={styles.user_information_container}>
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
                {accountAddress.slice(0, 5) +
                  "....." +
                  accountAddress.slice(accountAddress.length - 5)}
              </p>
            </div>
          </div>
        ) : (
          <button
            className={styles.login_button}
            onClick={() => props.toggleFunction()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
