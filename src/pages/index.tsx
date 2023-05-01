import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sensei App</title>
        <meta name="description" content="Gamified Defi on Sei network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles.description}></div>
      </main>
    </>
  );
}
