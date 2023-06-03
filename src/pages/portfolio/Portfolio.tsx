import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Notification from "@/components/Notification/Notification";
import React, { useState } from "react";
import { Box, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { useChain } from "@cosmos-kit/react";
import { chainName, rpcEndpoint } from "@/config/sei";
import Avatar from "boring-avatars";
import "@fontsource/work-sans/300.css";
import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter";
const Portfolio = () => {
  const chain = useChain(chainName);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  //START- notification handlers
  const [openNotif, setOpenNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notifSev, setNotifSev] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [claimOpen, setClaimOpen] = useState(false);
  const [activePoolIndex, setActivePoolIndex] = useState(0);

  const handleCloseNotif = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotif(false);
  };
  //END- notification handlers

  return (
    <Box>
      <Head>
        <title>Sensei Portfolio page</title>
        <meta name="description" content="Your portfolio on SenSei Fi" />
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
            fontWeight: "medium",
          }}
        >
          Your Portfolio
        </Typography>
        <Grid
          container
          sx={{
            my: 5,
            width: "100%",
            border: 1,
            borderRadius: 3,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={2}
            sx={{ "& svg": { my: isSmallScreen ? 3 : 2, mx: "auto" } }}
          >
            <Avatar
              size={isSmallScreen ? "75%" : "120"}
              square
              name="sei it with me"
              variant="beam"
              colors={["#071428", "#FFAB03", "#FFDB2C", "#FC3903", "#00A8C6"]}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{
              mx: 3,
              width: "inherit",
              display: "flex",
              flexWrap: isSmallScreen ? "wrap" : "",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              sx={{
                display: "flex",
                flexWrap: isSmallScreen ? "wrap" : "",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: isSmallScreen ? "flex" : "",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: 24, fontWeight: 300, lineHeight: 1.2 }}
                >
                  Sei&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 20 }}>
                  {Intl.NumberFormat("en-US").format(24673234)}
                </Typography>
              </Grid>
              {!isSmallScreen && (
                <Grid
                  item
                  sx={{
                    border: "0.5px solid darkgray",
                    mx: 2,
                    alignSelf: "stretch",
                  }}
                />
              )}
              <Grid
                item
                xs={12}
                sx={{
                  display: isSmallScreen ? "flex" : "",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: 24, fontWeight: 300, lineHeight: 1.2 }}
                >
                  Sen&nbsp;
                </Typography>
                <Typography sx={{ fontSize: 20 }}>
                  {Intl.NumberFormat("en-US").format(24673234)}
                </Typography>
              </Grid>
            </Grid>
            {isSmallScreen && (
              <Box
                sx={{ border: "0.5px solid darkgray", width: "100%", mt: 2 }}
              />
            )}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: isSmallScreen ? "center" : "end",
              }}
            >
              <Typography
                sx={{
                  mx: 2,
                  my: isSmallScreen ? 2 : 0,
                  fontSize: 24,
                  fontWeight: 300,
                }}
              >
                Portfolio Value
                <CurrencyConverter value={200} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </main>
      <Box component="section">
        <Typography variant="h2">Your Savings</Typography>
      </Box>
    </Box>
  );
};

export default Portfolio;
