import "@/styles/blocks.css";
import "@/styles/globals.css";
import "@fontsource/work-sans/variable.css";
import "@fontsource/work-sans/400.css";

import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { ColorModeContext } from "@/components/DarkModeToggle";
import createAppTheme from "@/styles/theme";
import { PaletteMode, useMediaQuery } from "@mui/material";

import { SeiWalletProvider } from "sei-js/packages/react/dist";
import {
  AptosWalletAdapterProvider,
  NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import "../components/SeiWallet/WalletSelectModal/styles.css";
import NextNProgress from "nextjs-progressbar";
import PageLoadingAnim from "@/components/PageLoadingAnim";
import { Router } from "next/router";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { WelldoneWallet } from "@welldone-studio/aptos-wallet-adapter";
import { MSafeWalletAdapter } from "@msafe/aptos-wallet-adapter";
import { BloctoWallet } from "@blocto/aptos-wallet-adapter-plugin";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialMode =
        (localStorage.getItem("colorMode") as PaletteMode) || "dark";
      setMode(initialMode);
    }
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: toggleMode,
    }),
    []
  );

  const wallets = [
    // new BloctoWallet({
    //   network: NetworkName.Testnet,
    //   bloctoAppId: "6d85f56e-5f2e-46cd-b5f2-5cf9695b4d46",
    // }),
    new MartianWallet(),
    new MSafeWalletAdapter(),
    new PetraWallet(),
    new RiseWallet(),
    new TrustWallet(),
    new WelldoneWallet(),
  ];

  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <NextNProgress color="#70E4CB" />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AptosWalletAdapterProvider>
  );
}
