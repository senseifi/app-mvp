import { Box, Typography } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";

const help = () => {
  return (
    <Box>
      <Head>
        <title>Savvio Fi Liquidity Pools</title>
        <meta name="description" content="Gamified Defi" />
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
          Help and FAQ
        </Typography>
      </main>
      <section id="help">
        <FAQAccordion />
      </section>
    </Box>
  );
};

export default help;
