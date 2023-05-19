import Notification from "@/components/Notification/Notification";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

const liquidity = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  //START- notification handlers
  const [openNotif, setOpenNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notifSev, setNotifSev] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const handleCloseNotif = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotif(false);
  };
  //END- notification handlers

  return (
    <>
      <Box>
        <Head>
          <title>Sensei Liquidity Pools</title>
          <meta name="description" content="Gamified Defi on Sei network" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main}`}>
          <Notification
            open={openNotif}
            message={notifMsg}
            onClose={handleCloseNotif}
            severity={notifSev}
          />
          <Box component="section">
            <Typography variant="h1" sx={{ fontWeight: "medium" }}>
              Liquidity Pools
            </Typography>
          </Box>
        </main>
      </Box>
    </>
  );
};

export default liquidity;
