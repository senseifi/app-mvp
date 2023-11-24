import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import {
  PaletteMode,
  Box,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import WormholeBridge, {
  Theme as WTheme,
  dark,
  light,
  WormholeConnectConfig,
} from "@wormhole-foundation/wormhole-connect";

//customizedTheme.button.action = theme.palette.tertiary.main;
//customizedTheme.button.actionText = "#000000";

const Wormhole = () => {
  //also derives styles from globals.css
  const theme: Theme = useTheme();
  const customizedTheme: WTheme = light;
  // customizedTheme.text.primary = "#FFF";
  // customizedTheme.text.secondary = "#FFF";
  customizedTheme.font.header = "Work Sans, sans-serif";
  customizedTheme.font.primary = "Work Sans, sans-serif";
  customizedTheme.background.default = "transparent";
  //customizedTheme.modal.background = "#071428";

  customizedTheme.card.elevation = "sm";

  const config: WormholeConnectConfig = {
    mode: "light",
    customTheme: customizedTheme,
  };
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  console.log(theme.palette.mode);
  return (
    <>
      <Box>
        <Head>
          <title>Savvio - Wormhole bridge</title>
          <meta name="description" content="Your portfolio on Savvio" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main}`}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "medium",
            }}
          >
            Wormhole
          </Typography>
        </main>
        <Box>
          <WormholeBridge config={config} />
        </Box>
      </Box>
    </>
  );
};

export default Wormhole;
