import { Fragment, useEffect, useState, useContext } from "react";
import { useMetaMask } from "metamask-react";
import styles from "@styles/layouts/MetamaskConnect.module.scss";

// importing context
import LoginContext from "@context/LoginContext";
import UserContext from "@context/UserContext";

import {
  WalletConnectProps,
  WalletConnectStatus,
} from "@interfaces/layout/WalletConnect";

const MetamaskConnect = (props: WalletConnectProps) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  useEffect(() => {
    connect();
  }, []);
  useEffect(() => {
    setWalletStatus(status);
  }, [status]);
  const [walletStatus, setWalletStatus] = useState(status);
  return (
    <Fragment>
      {walletStatus === "initializing" ? <WalletInitializing /> : null}
      {walletStatus === "unavailable" ? (
        <WalletUnavialable
          killComponent={() => props.killComponent("disabled")}
        />
      ) : null}
      {walletStatus === "connecting" ? <WalletConnecting /> : null}
      {walletStatus === "connected" ? (
        <WalletConnected
          account={account}
          chainId={chainId}
          killComponent={() => props.killComponent("disabled")}
          authenticate={props.authenticate}
        />
      ) : null}
      {walletStatus === "notConnected" ? (
        <WalletNotConnected
          killComponent={() => props.killComponent("disabled")}
        />
      ) : null}
      &nbsp;
    </Fragment>
  );
};

const WalletInitializing = () => (
  <div className={styles.notification}>
    <h2>Attempting to connect</h2>
    <p>Synchronisation with MetaMask ongoing...</p>
  </div>
);

const WalletUnavialable = ({ killComponent }: any) => (
  <div className={styles.notification}>
    <h2>Unavailable</h2>
    <p>MetaMask not available on this browser</p>
    <button onClick={killComponent}>Got It</button>
  </div>
);

const WalletConnecting = () => (
  <div className={styles.notification}>
    <h2>Connecting</h2>
    <p>MetaMask is connecting. Check your MetaMask extension for login.</p>
  </div>
);

const WalletNotConnected = ({ killComponent }: any) => (
  <div className={styles.notification}>
    <h2>Failed</h2>
    <p>Failed to connect application with MetaMask wallet. Try again!</p>
    <button onClick={killComponent}>Got It</button>
  </div>
);

const WalletConnected = ({
  account,
  chainId,
  killComponent,
  authenticate,
}: any) => {
  const authStates = useContext(LoginContext);
  const userStates = useContext(UserContext);
  userStates.set_wallet_address(account);
  userStates.set_username("Narendra Modi");
  authStates.toggleLogin(true);
  const ButtonClickAction = () => {
    killComponent();
    authenticate(account);
  };
  return (
    <div className={styles.notification}>
      <h2>Connected</h2>
      <p>{`Connected account ${account} on chain ID ${chainId}`}</p>
      <button onClick={ButtonClickAction}>Got It</button>
    </div>
  );
};

export default MetamaskConnect;
