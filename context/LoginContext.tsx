import React, { createContext, useState } from "react";
import { IContextLogin } from "@interfaces/context/LoginContext";

const LoginContext = createContext<IContextLogin>({
  isLoggedIn: false,
  isLoginModalOpen: false,
  toggleLogin: () => {},
  toggleLoginModal: () => {},
});

export const LoginProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const toggleLogin = (state: boolean) => {
    setIsLoggedIn(state);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, isLoginModalOpen, toggleLogin, toggleLoginModal }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
