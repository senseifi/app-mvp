import "@/styles/blocks.css";
import "@/styles/globals.css";
import "@/styles/tokenOption.css";

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

import "../components/SeiWallet/WalletSelectModal/styles.css";
import NextNProgress from "nextjs-progressbar";
import PageLoadingAnim from "@/components/PageLoadingAnim";
import { Router } from "next/router";
import { WagmiConfig, createConfig } from "wagmi";
import { skaleEuropaTestnet } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    appName: "Skale Savvio demo app",
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    //alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [skaleEuropaTestnet],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <WagmiConfig config={config}>
          <ConnectKitProvider debugMode mode={mode}>
            <CssBaseline />
            <Layout>
              <NextNProgress color="#70E4CB" />
              <Component {...pageProps} />
            </Layout>
          </ConnectKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
