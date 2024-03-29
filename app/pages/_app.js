import React from "react";
import App from "next/app";
import Head from "next/head";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import merge from 'lodash.merge';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import {
  CHAIN,
  ALCHEMY_API_KEY,
  RPC_URL,
} from '../config/vars';

import '../styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const theme = merge(darkTheme(), {
  colors: {
    accentColor: 'rgb(51 65 85)',
    connectButtonBackground: 'rgb(51 65 85)',
    downloadBottomCardBackground: 'rgb(51 65 85)',
    modalBackground: 'rgb(51 65 85)',

  },
});

const { chains, provider } = configureChains(
  [
    CHAIN,
  ],
  [
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: RPC_URL
      }),
    }),
    publicProvider(),
  ]
);
console.log("arbitrum wagmi chain", CHAIN, "chains", chains);

const { connectors } = getDefaultWallets({
  appName: "ARBItraitors",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function reportWebVitals(metric) {
  console.log(metric);
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>ARBItraitors: The Infernal Gallery - Open Mint</title>
        </Head>
        <Layout>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider theme={theme} chains={chains}>
              <Component {...pageProps} />              
            </RainbowKitProvider>
          </WagmiConfig>          
        </Layout>
      </React.Fragment>
    );
  }
}
