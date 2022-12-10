import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import merge from 'lodash.merge';
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrumGoerli, arbitrum, mainnet } from '@wagmi/core/chains'
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import {
  OPENSEA_URL,
  NETWORK_NAME,
  ERC721_ADDRESS,
  ALCHEMY_API_KEY,
  INFURA_API_KEY,
  POCKET_API_KEY,
  ETHERSCAN_API_KEY,
} from '../config';

import PageChange from "../components/PageChange/PageChange.js";

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
    arbitrum,
  ],
  [
    alchemyProvider({ apiKey: "44wMYVLkygXznIGHzFN8fF8JoPVx1ykc" }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://arb-mainnet.g.alchemy.com/v2/44wMYVLkygXznIGHzFN8fF8JoPVx1ykc`
      }),
    }),
    publicProvider(),
  ]
);
console.log("arbitrum wagmi chain", arbitrum, "chains", chains);

const { connectors } = getDefaultWallets({
  appName: "ArbTraitoors",
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
          <title>ArbTraitoors: The Infernal Gallery - Open Mint</title>
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
