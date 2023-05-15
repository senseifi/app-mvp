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
import TicketsModal from "@/components/Modals/TicketsModal";
import CheckWinnerModal from "@/components/Modals/CheckWinnerModal";
import { SenseifiStakingNllQueryClient } from "@/contract_clients/SenseifiStakingNll.client";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { rpcEndpoint } from "@/config/sei";
import { gameDurationSecs, seiStakingNLLContract } from "@/config/contracts";
import {
  Params,
  GlobalState,
  GameState,
} from "@/contract_clients/SenseifiStakingNll.types";
import { nsToSecs, toAU, bigIntMax } from "@/utils";

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
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  //   const theme: Theme = useTheme();

  const [tmOpen, setTmOpen] = useState(false);
  const [cwOpen, setCwOpen] = useState(false);

  const [selectedGameID, setSelectedGameID] = useState<string | undefined>();
  const [tmType, setTmType] = useState<"enter" | "withdraw">("enter"); // Tickets Modal Type

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
    prize: totalRewards,
    endTime: nsToSecs(globalState.game_start_time) + gameDurationSecs,
    totDeposit: globalState.total_stake,
  });

  currentDraws.sort((a, b) => (BigInt(a.id) < BigInt(b.id) ? 1 : -1));

  const lastPastGameID = bigIntMax(
    pastGamesStates.map((v) => BigInt(v.game_id))
  ).toString();

  const onWithdrawClick = () => {
    setTmType("withdraw");
    setTmOpen(true);
  };

  const onEnterNowClick = () => {
    setTmType("enter");
    setTmOpen(true);
  };

  const onCheckDrawClick = (gameID: string | undefined) => {
    if (gameID === undefined) return;
    setSelectedGameID(gameID);
    setCwOpen(true);
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
        />
      )}
      {selectedGameID !== undefined && (
        <CheckWinnerModal
          open={cwOpen}
          setOpen={setCwOpen}
          gameID={selectedGameID}
        />
      )}
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
                  <ShineButton>{toAU(totalRewards)} Sei</ShineButton>
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

  const numPastGames = BigInt(globalState.game_counter) - BigInt(1);
  const pastGamesPrmArr = [];
  for (let i = BigInt(0); i < numPastGames; i++) {
    pastGamesPrmArr.push(contract.getGameState({ gameId: i.toString() }));
  }
  const pastGamesStates = await Promise.all(pastGamesPrmArr);

  return { props: { params, globalState, totalRewards, pastGamesStates } };
};

export default Home;
