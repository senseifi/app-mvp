import Notification from "@/components/Notification/Notification";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import LPList from "@/components/LPList/LPList";
import { PoolList } from "@/types/customTypes";

//need to restart server for changes to the const to take effect on ui
const poolList: PoolList[] = [
  {
    stake: "sei",
    earn1: "sei",
    earn2: "sen",
    apr: 12.5,
    distributionRatio: 0.5,
    tvl: 41413895,
    endTime: 1684953010,
    usrStake: 5000,
  },
  {
    stake: "sei",
    earn1: "sei",
    // earn2: "sen",
    apr: 25.5,
    tvl: 41413895,
    endTime: 1692678338,
    usrStake: 0,
  },
  {
    stake: "sei",
    earn1: "sen",
    earn2: "pepe",
    apr: 19.6,
    distributionRatio: 0.8,
    tvl: 41413895,
    endTime: 1698981938,
    usrStake: 12400,
  },
];

const Liquidity = () => {
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
          <Typography
            variant="h1"
            sx={{
              fontSize: isSmallScreen ? "4rem !important" : "",
              fontWeight: "medium",
            }}
          >
            Liquidity Pools
          </Typography>
        </main>
        <Box component="section">
          {poolList.map((pool, i) => (
            <LPList key={i} {...pool} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Liquidity;
