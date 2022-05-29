import React, { createContext, useState } from "react";
import { IContextUser } from "@interfaces/context/UserContext";

const UserContext = createContext<IContextUser>({
  userName: "",
  set_username: () => {},
  walletAddress: "",
  set_wallet_address: () => {},
  chainId: "",
  set_chain_id: () => {},
});

export const UserInformationProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");

  const set_username = (state: string) => {
    setUserName(state);
  };

  const set_wallet_address = (state: string) => {
    setWalletAddress(state);
  };

  const set_chain_id = (state: string) => {
    setChainId(state);
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        set_username,
        walletAddress,
        set_wallet_address,
        chainId,
        set_chain_id,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
