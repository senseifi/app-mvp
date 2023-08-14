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

import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as coin98Wallets } from "@cosmos-kit/coin98-extension";
import { wallets as compassWallets } from "@cosmos-kit/compass";
import { seiTestnet2AssetList, seiTestnet2Chain } from "@/config/sei";
import { WalletErrorView } from "@/components/WalletModalViews/WalletErrorView";
import { WalletConnectOptions } from "@cosmos-kit/core";
import { WalletNotExistView } from "@/components/WalletModalViews/WalletNotExistView";
import { wallets as finWallets } from "../FinWallet/index";
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

  const wc: WalletConnectOptions = {
    signClient: { projectId: "4afa5ea436cd7a7f5995d0508c2f6a3b" },
  };

  return (
    <ChainProvider
      chains={[...chains, seiTestnet2Chain]}
      assetLists={[...assets, seiTestnet2AssetList]}
      wallets={[
        keplrWallets[0],
        ...leapWallets,
        ...coin98Wallets,
        ...compassWallets,
        ...finWallets,
      ]}
      wrappedWithChakra={true}
      modalViews={{ Error: WalletErrorView, NotExist: WalletNotExistView }}
      includeAllWalletsOnMobile={true}
      walletConnectOptions={wc}
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
    </ChainProvider>
  );
}
