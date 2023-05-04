import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import { Theme, useMediaQuery } from "@mui/material";

const Portfolio = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <>
      <Head>
        <title>Sensei Portfolio page</title>
        <meta name="description" content="Gamified Defi on Sei network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main}`}
        style={isSmallScreen ? { padding: "2rem" } : { padding: "6rem 10rem" }}
      >
        <div>Portfolio</div>
      </main>
    </>
  );
};

export default Portfolio;
