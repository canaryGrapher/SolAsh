import { Fragment } from "react";

import Head from "next/head";
import { AppProps } from "next/app";
import "@styles/globals.css";

// importing context
import { LoginProvider } from "@context/LoginContext";

// importing wallet integration
import { MetaMaskProvider } from "metamask-react";

import useLoginProvider from "hooks/auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isUserLoggedIn = useLoginProvider();
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <meta name="theme-color" content="#317EFB" />
        <title>SolAsh</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>
      <LoginProvider>
        <MetaMaskProvider>
          <Component {...pageProps} />
        </MetaMaskProvider>
      </LoginProvider>
    </Fragment>
  );
};

export default MyApp;
