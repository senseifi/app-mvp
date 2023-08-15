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
import "../components/SeiWallet/WalletSelectModal/styles.css";
import NextNProgress from "nextjs-progressbar";
import PageLoadingAnim from "@/components/PageLoadingAnim";
import { Router } from "next/router";

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
    <SeiWalletProvider
      chainConfiguration={{
        chainId: "atlantic-2",
        restUrl: "https://rest.atlantic-2.seinetwork.io/",
        rpcUrl: "https://rpc.atlantic-2.seinetwork.io",
      }}
      wallets={["leap", "keplr", "compass", "fin"]}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <NextNProgress color="#FFDB2C" />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SeiWalletProvider>
  );
}
