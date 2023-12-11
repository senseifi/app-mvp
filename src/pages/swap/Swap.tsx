import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import { Box, Theme, Typography, useMediaQuery, Link } from "@mui/material";
// import { SquidWidget } from "@0xsquid/widget";

const Swap = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <>
      <Box>
        <Head>
          <title>Savvio Portfolio page</title>
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
            Swap tokens
          </Typography>
        </main>
        <Box>
          {/* <SquidWidget
            config={{
              integratorId: "senseifi-swap-widget",
              companyName: "SenSeiFi",
              mainLogoUrl:
                "https://storage.googleapis.com/branding.senseifi.io/logo-light.png",
            }}
          /> */}
        </Box>
      </Box>
    </>
  );
};

export default Swap;
