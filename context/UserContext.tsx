import React, { createContext, useState } from "react";
import { IContextUser } from "@interfaces/context/UserContext";

const UserContext = createContext<IContextUser>({
  userName: "",
  set_username: () => {},
  walletAddress: "",
  set_wallet_address: () => {},
});

export const UserInformationProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const set_username = (state: string) => {
    setUserName(state);
  };

  const set_wallet_address = (state: string) => {
    setWalletAddress(state);
  };

  return (
    <UserContext.Provider
      value={{ userName, set_username, walletAddress, set_wallet_address }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
