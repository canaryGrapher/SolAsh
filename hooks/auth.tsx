import Router from "next/router";
import { useContext, useEffect } from "react";

//importing context
import LoginContext from "@context/LoginContext";

const useLoginProvider = () => {
  const loginStates = useContext(LoginContext);
  const isUserLoggedIn = loginStates.isLoggedIn;

  useEffect(() => {
    const { pathname } = Router;
    if (!isUserLoggedIn && pathname != "/") {
      Router.push("/");
    }
  }, [isUserLoggedIn]);
};

export default useLoginProvider;
