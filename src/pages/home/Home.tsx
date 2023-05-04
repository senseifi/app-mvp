import Head from "next/head";

import styles from "@/styles/Home.module.css";
import React from "react";
import {
  Box,
  Button,
  Container,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CountdownDisplay from "@/components/CountdownDisplay/CountdownDisplay";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

import seiCoin from "../../../src/assets/sei-coin.gif";
import ShineButton from "@/components/ShineButton/ShineButton";
import CurrentDraws from "@/components/CurrentDraws/CurrentDraws";
import { Draw } from "@/types/customTypes";
import WinnerHistory from "@/components/WinnerHistory/WinnerHistory";

const currentDraws: Draw[] = [
  {
    active: true,
    prize: 200,
    totDeposit: 20000,
    totTix: 50000,
    usrDeposit: 2000,
    usrTix: 5000,
    timeRem: 1683146205, //unix timestamp
  },
];

const Home = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  //   const theme: Theme = useTheme();
  return (
    <Box>
      <Head>
        <title>Sensei App Homepage</title>
        <meta name="description" content="Gamified Defi on Sei network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <Grid container spacing={5}>
          <Grid xs={12} md={6}>
            <Typography variant="h1" sx={{ fontWeight: "medium" }}>
              No Loss DeFi
              <br />
              <Typography variant="yellowText">Prize Game</Typography>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontStyle: "italic", fontSize: "1.5rem" }}
            >
              Win or Not, you never lose your investment - everyones a winner
              when you play with SenSei&nbsp;Fi.
            </Typography>

            <Box>
              <Grid container spacing={2} marginTop={2}>
                <Grid xs={12} md={6}>
                  <Button variant="yellowBorder" size="large" fullWidth>
                    {isSmallScreen ? "Deposit" : "Deposit to Win"}
                  </Button>
                </Grid>
                <Grid xs={12} md={6}>
                  <Button variant="yellowFill" size="large" fullWidth>
                    Check Draw
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <CountdownDisplay />
          </Grid>
          <Grid xs={12} md={6} alignSelf="center">
            <Image
              alt="Spinning Sei coin"
              src={seiCoin}
              style={{
                display: "flex",
                margin: "auto",
                maxWidth: isSmallScreen ? "50%" : "300px",
                height: "auto",
              }}
            />
            <Box textAlign="center" marginTop={5}>
              <Box>
                <Typography fontSize={20}>Grand Prize:</Typography>
                <ShineButton>14,632 Sei</ShineButton>
              </Box>

              <Grid
                container
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <Typography fontSize={20}>Total Deposits:</Typography>
                <Typography fontSize={30}>5,490,368 Sei</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </main>
      <Box component="section">
        <Typography variant="h2" my={2}>
          CurrentDraws
        </Typography>
        <Grid container>
          {currentDraws.map((draw) => (
            <CurrentDraws />
          ))}
          {!isMediumScreen &&
            [...Array(Math.max(0, 3 - currentDraws.length))].map((_, index) => (
              <CurrentDraws notActive />
            ))}
        </Grid>
      </Box>
      <Box component="section">
        <WinnerHistory />
      </Box>
    </Box>
  );
};

export default Home;
