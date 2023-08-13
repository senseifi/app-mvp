import { Box, Typography } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";
import terms from "./tnc.json";
const tnc = () => {
  return (
    <Box>
      <Head>
        <title>Sensei Liquidity Pools</title>
        <meta name="description" content="Gamified Defi on Sei network" />
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
          Terms and Conditions
        </Typography>
      </main>
      <section id="tnc">
        <pre>
          {terms.map((term, termID) => (
            <div key={termID}>
              <Typography variant="h3" sx={{ fontSize: "2rem", my: 0.5 }}>
                {term.title}
              </Typography>
              {Array.isArray(term.content) ? (
                term.content.map((contentSection, sectionID) => (
                  <div key={sectionID}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "1.5rem",
                        fontStyle: "italic",
                        textDecoration: "underline",
                      }}
                    >
                      {contentSection.subtitle}
                    </Typography>
                    <Typography paragraph>
                      {contentSection.paragraph}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography paragraph>{term.content}</Typography>
              )}
            </div>
          ))}
        </pre>
        <Typography></Typography>
      </section>
    </Box>
  );
};

export default tnc;
