import Head from "next/head";

import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";
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
import { Draw, ModalDetails } from "@/types/customTypes";
import WinnerHistory from "@/components/WinnerHistory/WinnerHistory";
import TicketsModal from "@/components/Modals/NllTicketsModal";
import CheckWinnerModal from "@/components/Modals/CheckWinnerModal";
import ClaimWithdrawalModal from "@/components/Modals/ClaimWithdrawalModal";
import { SenseifiStakingNllQueryClient } from "@/contract_clients/SenseifiStakingNll.client";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { chainName, rpcEndpoint } from "@/config/sei";
import { gameDurationSecs, seiStakingNLLContract } from "@/config/contracts";
import {
  Params,
  GlobalState,
  GameState,
} from "@/contract_clients/SenseifiStakingNll.types";
import { nsToSecs, toAU, bigIntMax } from "@/utils";

import Notification from "@/components/Notification/Notification";
import { intlFormatStyle } from "@/constants/modals";
import { fetchNllState } from "../api/fetchNllState";

import { useWallet } from "sei-js/packages/react/dist";
import HeroImage from "@/components/HeroImage";

const Home = ({
  params,
  globalState,
  totalRewards,
  pastGamesStates,
}: {
  params: Params;
  globalState: GlobalState;
  totalRewards: string;
  pastGamesStates: GameState[];
}) => {
  const wallet = useWallet();

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    setIsWalletConnected(wallet.connectedWallet !== undefined);
  }, [wallet.connectedWallet]);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  //   const theme: Theme = useTheme();

  const [tmOpen, setTmOpen] = useState(false);
  const [cwOpen, setCwOpen] = useState(false);
  const [cwithdrawOpen, setcwithdrawOpen] = useState(false);

  const [selectedGameID, setSelectedGameID] = useState<string | undefined>();
  const [tmType, setTmType] = useState<"enter" | "withdraw">("enter"); // Tickets Modal Type

  const grandPrize = (
    (BigInt(totalRewards) * BigInt(7)) /
    BigInt(10)
  ).toString();

  const currentDraws = pastGamesStates.map((v) => {
    let draw: Draw = {
      id: v.game_id,
      active: false,
      prize: v.total_prize,
      winner: v.winner,
      prizeClaimed: v.prize_claimed,
    };

    return draw;
  });

  currentDraws.push({
    id: (BigInt(globalState.game_counter) - BigInt(1)).toString(),
    active: true,
    prize: grandPrize,
    endTime: nsToSecs(globalState.game_start_time) + gameDurationSecs,
    totDeposit: globalState.total_stake,
  });

  currentDraws.sort((a, b) => (BigInt(a.id) < BigInt(b.id) ? 1 : -1));

  const lastPastGameID: string | undefined =
    pastGamesStates.length != 0
      ? bigIntMax(pastGamesStates.map((v) => BigInt(v.game_id))).toString()
      : undefined;

  const onWithdrawClick = () => {
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setTmType("withdraw");
    setTmOpen(true);
  };

  const onEnterNowClick = () => {
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setTmType("enter");
    setTmOpen(true);
  };

  const onCheckDrawClick = (gameID: string | undefined) => {
    if (gameID === undefined) return;
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setSelectedGameID(gameID);
    setCwOpen(true);
  };

  const onClaimWithdrawalClick = () => {
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setcwithdrawOpen(true);
  };

  const showNotif = (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    txnHash?: string
  ) => {
    setNotifMsg(message);
    setNotifSev(severity);
    if (txnHash) setTxnHash(txnHash);
    setOpenNotif(true);
  };

  const [openNotif, setOpenNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notifSev, setNotifSev] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const [txnHash, setTxnHash] = useState<undefined | string>();

  const handleCloseNotif = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotif(false);
  };

  return (
    <>
      {tmOpen && (
        <TicketsModal
          open={tmOpen}
          setOpen={setTmOpen}
          tmType={tmType}
          params={params}
          globalState={globalState}
          showNotif={showNotif}
        />
      )}
      {cwOpen && selectedGameID !== undefined && (
        <CheckWinnerModal
          open={cwOpen}
          setOpen={setCwOpen}
          gameID={selectedGameID}
          params={params}
          showNotif={showNotif}
        />
      )}
      {cwithdrawOpen && (
        <ClaimWithdrawalModal
          open={cwithdrawOpen}
          setOpen={setcwithdrawOpen}
          params={params}
          showNotif={showNotif}
        />
      )}
      <Box>
        <Head>
          <title>Savvio App Homepage</title>
          <meta name="description" content="Gamified Defi on Sei network" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:title" content="Savvio" />
          <meta
            property="og:description"
            content="Gamified Defi on Sei network"
          />
          <meta property="og:image" content="/logo192.png" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
          <meta property="og:type" content="website" />

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main}`}>
          <Notification
            open={openNotif}
            message={notifMsg}
            onClose={handleCloseNotif}
            severity={notifSev}
            txnHash={txnHash}
          />
          <Grid container spacing={5}>
            <Grid xs={12} md={6}>
              <Typography variant="h1" sx={{ fontWeight: "medium" }}>
                No Loss DeFi
                <br />
                <Typography variant="gradientText">Prize Game</Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontStyle: "italic", fontSize: "1.5rem" }}
              >
                Win or Not, you never lose your investment - everyone&apos;s a
                winner when you play with Savvio.
              </Typography>

              <Box>
                <Grid container spacing={2} marginTop={2}>
                  <Grid xs={12} md={6}>
                    <Button
                      variant="gradientFill"
                      size="large"
                      fullWidth
                      onClick={onEnterNowClick}
                    >
                      {isSmallScreen ? "Enter" : "Enter to Win"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <CountdownDisplay
                startTime={nsToSecs(globalState.game_start_time)}
                endTime={
                  nsToSecs(globalState.game_start_time) + gameDurationSecs
                }
              />
            </Grid>
            <Grid xs={12} md={6} alignSelf="center">
              <HeroImage />

              <Box textAlign="center" marginTop={5}>
                <Box>
                  <Typography fontSize={20}>Grand Prize:</Typography>
                  <ShineButton>
                    {Intl.NumberFormat("en-US", intlFormatStyle).format(
                      toAU(grandPrize)
                    )}{" "}
                    Sei
                  </ShineButton>
                </Box>

                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Typography fontSize={20}>Total Deposits:</Typography>
                  <Typography fontSize={30}>
                    {Intl.NumberFormat("en-US", intlFormatStyle).format(
                      toAU(globalState.total_stake)
                    )}{" "}
                    Sei
                  </Typography>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </main>
        <Box component="section">
          <Typography variant="h2" my={2}>
            Current Draws
          </Typography>
          <Grid container>
            {currentDraws.map((draw) => (
              <CurrentDraws
                key={draw.id}
                draw={draw}
                // open={tmOpen}
                // setOpen={setTmOpen}
                onEnterNowClick={onEnterNowClick}
                onWithdrawClick={onWithdrawClick}
                onCheckDrawClick={onCheckDrawClick}
                onClaimWithdrawalClick={onClaimWithdrawalClick}
                showNotif={showNotif}
              />
            ))}
            {!isMediumScreen &&
              [...Array(Math.max(0, 3 - currentDraws.length))].map(
                (_, index) => (
                  <CurrentDraws
                    key={index}
                    notActive
                    // open={tmOpen}
                    // setOpen={setTmOpen}
                    onEnterNowClick={onEnterNowClick}
                    onWithdrawClick={onWithdrawClick}
                    onCheckDrawClick={onCheckDrawClick}
                    onClaimWithdrawalClick={onClaimWithdrawalClick}
                    showNotif={showNotif}
                  />
                )
              )}
          </Grid>
        </Box>
        <Box component="section" mb={10}>
          <WinnerHistory drawList={currentDraws} />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const cosmWasmClient = await CosmWasmClient.connect(rpcEndpoint);
  const nllGameState = await fetchNllState(cosmWasmClient);

  return { props: nllGameState };
};

export default Home;
