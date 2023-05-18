import "@/styles/globals.css";
import "@fontsource/work-sans/variable.css";
import "@fontsource/work-sans/400.css";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { ColorModeContext } from "@/components/DarkModeToggle";
import createAppTheme from "@/styles/theme";
import { PaletteMode } from "@mui/material";

import { ChainProvider } from "@cosmos-kit/react";
import { WalletViewProps } from "@cosmos-kit/core";
import {
  ConnectWalletButton,
  LogoStatus,
  SimpleDisplayModalContent,
  SimpleModalHead,
  SimpleModalView,
} from "@cosmology-ui/react";
import { Box } from "@chakra-ui/react";
import { chains, assets } from "chain-registry";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { wallets as coin98Wallets } from "@cosmos-kit/coin98-extension";
import { seiTestnet2AssetList, seiTestnet2Chain } from "@/config/sei";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("light");
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

  const modalOnError = ({ onClose, onReturn, wallet }: WalletViewProps) => {
    const mobileError =
      "This wallet is not supported on mobile, please use desktop browsers.";

    const {
      walletInfo: { prettyName, logo },
      message,
    } = wallet;
    const modalHead = React.createElement(SimpleModalHead, {
      title: prettyName,
      backButton: true,
      onClose: onClose,
      onBack: onReturn,
    });

    const customLogoStatus =
      message === mobileError ? LogoStatus.Warning : LogoStatus.Error;

    const customContentHeader =
      message === mobileError ? "Just one more step..." : message;

    const customContentDesc =
      message === mobileError
        ? `This wallet is not supported on mobile web, please use the dApp browser in ${prettyName} mobile app or a desktop browser.`
        : message;

    const modalContent = React.createElement(SimpleDisplayModalContent, {
      status: customLogoStatus,
      logo: logo,
      contentHeader: customContentHeader,
      contentDesc: customContentDesc,
      bottomButton: React.createElement(
        Box,
        {
          px: 6,
        },
        React.createElement(ConnectWalletButton, {
          buttonText: "Change Wallet",
          onClick: onReturn,
        })
      ),
    });
    return React.createElement(SimpleModalView, {
      modalHead: modalHead,
      modalContent: modalContent,
    });
  };

  return (
    <ChainProvider
      chains={[...chains, seiTestnet2Chain]}
      assetLists={[...assets, seiTestnet2AssetList]}
      wallets={[keplrWallets[0], ...leapWallets, ...coin98Wallets]}
      wrappedWithChakra={true}
      modalViews={{ Error: modalOnError }}
      includeAllWalletsOnMobile={true}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ChainProvider>
  );
}
