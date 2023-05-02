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

const Home = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  //   const theme: Theme = useTheme();
  return (
    <>
      <Head>
        <title>Sensei App Homepage</title>
        <meta name="description" content="Gamified Defi on Sei network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main}`}
        style={isSmallScreen ? { padding: "2rem" } : { padding: "6rem 2rem" }}
      >
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
            Test
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default Home;
