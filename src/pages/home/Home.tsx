import Head from "next/head";

import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
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
import { useChain } from "@cosmos-kit/react";

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
  const chain = useChain(chainName);

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
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setTmType("withdraw");
    setTmOpen(true);
  };

  const onEnterNowClick = () => {
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setTmType("enter");
    setTmOpen(true);
  };

  const onCheckDrawClick = (gameID: string | undefined) => {
    if (gameID === undefined) return;
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setSelectedGameID(gameID);
    setCwOpen(true);
  };

  const onClaimWithdrawalClick = () => {
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }
    setcwithdrawOpen(true);
  };

  const showNotif = (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => {
    setNotifMsg(message);
    setNotifSev(severity);
    setOpenNotif(true);
  };

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
          <title>Sensei App Homepage</title>
          <meta name="description" content="Gamified Defi on Sei network" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:title" content="SenSei Fi" />
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
          />
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
                Win or Not, you never lose your investment - everyone&apos;s a
                winner when you play with SenSei&nbsp;Fi.
              </Typography>

              <Box>
                <Grid container spacing={2} marginTop={2}>
                  <Grid xs={12} md={6}>
                    <Button
                      variant="yellowFill"
                      size="large"
                      fullWidth
                      onClick={onEnterNowClick}
                    >
                      {isSmallScreen ? "Enter" : "Enter to Win"}
                    </Button>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Button
                      variant="yellowBorder"
                      size="large"
                      fullWidth
                      disabled={lastPastGameID === undefined}
                      onClick={() => onCheckDrawClick(lastPastGameID)}
                    >
                      Check Draw
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
                  <ShineButton>{toAU(grandPrize)} Sei</ShineButton>
                </Box>

                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Typography fontSize={20}>Total Deposits:</Typography>
                  <Typography fontSize={30}>
                    {toAU(globalState.total_stake)} Sei
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
          <WinnerHistory />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const cosmWasmClient = await CosmWasmClient.connect(rpcEndpoint);

  const contract = new SenseifiStakingNllQueryClient(
    cosmWasmClient,
    seiStakingNLLContract
  );

  const [params, globalState, totalRewards] = await Promise.all([
    contract.getParams(),
    contract.getGlobalState(),
    contract.getTotalRewards(),
  ]);

  const pastGamesStates: GameState[] = [];
  const numPastGames = BigInt(globalState.game_counter) - BigInt(1);

  for (let i = BigInt(0); i < numPastGames; i++) {
    pastGamesStates.push(await contract.getGameState({ gameId: i.toString() }));
  }

  return { props: { params, globalState, totalRewards, pastGamesStates } };
};

export default Home;
