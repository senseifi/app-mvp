import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Notification from "@/components/Notification/Notification";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useChain } from "@cosmos-kit/react";
import { chainName, rpcEndpoint } from "@/config/sei";
import Avatar from "boring-avatars";
import "@fontsource/work-sans/300.css";
import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter";
import GridWithLabel from "@/components/GridWithLabel/GridWithLabel";
import senIcon from "@/assets/senIcon.png";
import Image from "next/image";
import { gameDurationSecs, seiStakingNLLContract } from "@/config/contracts";
import Timeline from "@/components/Timeline/";
import {
  GameState,
  GlobalState,
  Params,
} from "@/contract_clients/SenseifiStakingNll.types";
import { SenseifiStakingNllQueryClient } from "@/contract_clients/SenseifiStakingNll.client";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { roundToDP, toAU } from "@/utils";

const Portfolio = ({
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
  const showNotif = (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => {
    setNotifMsg(message);
    setNotifSev(severity);
    setOpenNotif(true);
  };
  const [userBalance, setUserBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [userHasParticipated, setUserHasParticipated] = useState(true);
  const [userInitWithdraw, setUserInitWithdraw] = useState(false);
  const [claimAvailable, setClaimAvailable] = useState(false);
  const [claimButtonText, setClaimButtonText] = useState("Claim Withdrawal");
  const [userHasClaimed, setUserHasClaimed] = useState(false);
  const [drawHasEnded, setDrawHasEnded] = useState(false);
  const [LPoolHasEnded, setLPoolHasEnded] = useState(false);

  useEffect(() => {
    (async function () {
      if (chain.address === undefined) return;

      try {
        setIsLoading(true);

        const client = await chain.getCosmWasmClient();

        const contract = new SenseifiStakingNllQueryClient(
          client,
          seiStakingNLLContract
        );

        const [balance, stake] = await Promise.all([
          client.getBalance(chain.address, params.denom),
          contract.getUserState({ user: chain.address }),
        ]);

        setUserBalance(balance.amount);
      } catch (e) {
        let errorMsg = "";
        if (typeof e === "string") {
          errorMsg = e.toUpperCase();
        } else if (e instanceof Error) {
          errorMsg = e.message;
        }

        showNotif(errorMsg, "error");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [chain.address, globalState.game_start_time, params.denom]);

  const drawCases = {
    case1: userHasParticipated && !drawHasEnded, //encourage more deposit
    case2: userHasParticipated && drawHasEnded, //deposit carryforward
  };

  const drawMilestones = [
    "Participated",
    ...(userInitWithdraw ? ["Withdraw Initiated", "Claimed"] : ["Result"]),
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (userHasParticipated) {
      setProgress(25); // Initial progress value

      // Set up the timer to update progress every 6 hours
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = 75 / ((7 * 24) / 6); // Increment value based on 7 days and 6-hour intervals
          const updatedProgress = prevProgress + increment;

          // Stop the timer and stops progress when 7 days have passed
          if (updatedProgress >= 75) {
            clearInterval(intervalId);
            return 100; // progress to 100
          }

          return updatedProgress;
        });
      }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
      if (drawHasEnded) {
        setProgress(100);
      }
    }

    if (userInitWithdraw) {
      setProgress(50);
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = 66.67 / ((3 * 24) / 6); // Increment value based on 3 days and 6-hour intervals
          const updatedProgress = prevProgress + increment;

          // Stop the timer and reset progress when 3 days have passed
          if (updatedProgress >= 66.67) {
            clearInterval(intervalId);
            return 66.67;
          }

          return updatedProgress;
        });
      }, 6 * 60 * 60 * 1000); // 6 hours in milliseconds
      if (userHasClaimed) {
        setProgress(100);
      }
    }

    return () => {
      // Clean up the timer when the component unmounts or userHasParticipated changes to false
      clearInterval(intervalId);
    };
  }, [userHasParticipated, userInitWithdraw, userHasClaimed, drawHasEnded]);

  const handleOnClaim = () => {
    setClaimButtonText("You've claimed your deposit");
  };

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
          Portfolio
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
          {!chain.isWalletConnected ? (
            <Typography
              onClick={chain.openView}
              sx={{
                fontSize: 24,
                fontWeight: 300,
                lineHeight: 1.2,
                m: "auto",
                cursor: "pointer",
              }}
            >
              Connect Wallet to view details
            </Typography>
          ) : (
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
                    {roundToDP(toAU(userBalance), 3)}
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
                    Address&nbsp;
                  </Typography>
                  <Typography sx={{ fontSize: 20 }}>{chain.address}</Typography>
                </Grid>
              </Grid>
              {isSmallScreen && (
                <Box
                  sx={{ border: "0.5px solid darkgray", width: "100%", mt: 2 }}
                />
              )}
              {/* <Grid
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
            </Grid> */}
            </Grid>
          )}
        </Grid>
      </main>
      <Box component="section">
        <Typography variant="h2">Your Savings</Typography>
        <div>
          <GridWithLabel container label="Lossless Lottery">
            {userHasParticipated ? (
              <>
                {isSmallScreen ? (
                  <></>
                ) : (
                  <Grid
                    container
                    justifyContent="space-between"
                    sx={{
                      borderBottom: 1,
                      borderBottomColor: "darkgray",
                      mb: 3,
                    }}
                  >
                    <Grid item md={1.5}>
                      <Typography variant="h6">Draw</Typography>
                    </Grid>
                    <Grid item md={4.5}>
                      <Typography variant="h6">Current status</Typography>
                    </Grid>
                    <Grid item md={2.5}>
                      <Typography variant="h6">Action</Typography>
                      <Grid item></Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  container
                  justifyContent={isSmallScreen ? "" : "space-between"}
                  sx={{ flexDirection: isSmallScreen ? "column" : "" }}
                >
                  <Grid item md={1.5}>
                    <Box display="flex" sx={{ mt: isSmallScreen ? 2 : "" }}>
                      <Image alt="sensei icon" src={senIcon} width={24} />
                      <Typography
                        sx={{
                          fontSize: isSmallScreen ? 20 : "",
                        }}
                      >
                        Round #0
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={4.5}
                    sx={{ textAlign: "center", my: isSmallScreen ? 2 : "" }}
                  >
                    <Timeline milestones={drawMilestones} progress={progress} />
                  </Grid>
                  <Grid item md={2.5}>
                    <Grid display="flex">
                      {!userInitWithdraw ? (
                        drawCases.case1 ? (
                          <Grid
                            container
                            gap={1}
                            sx={{
                              display: isSmallScreen ? "grid" : "",
                              width: "100%",
                            }}
                          >
                            <Button
                              variant="yellowBorder"
                              sx={{ fontSize: 12, p: 1 }}
                            >
                              Withdraw
                            </Button>
                            <Button
                              variant="yellowFill"
                              sx={{ fontSize: 12, p: 1 }}
                            >
                              Deposit More
                            </Button>
                          </Grid>
                        ) : (
                          <Typography sx={{ fontSize: 14, opacity: 0.75 }}>
                            Your deposit has been carried&#8209;forward to the
                            next round
                          </Typography>
                        )
                      ) : (
                        <>
                          {!claimAvailable ? (
                            <Typography sx={{ fontSize: 14, opacity: 0.75 }}>
                              You'll be able to claim the withdrawal in about
                              72hrs
                            </Typography>
                          ) : (
                            <Button onClick={handleOnClaim}>
                              {claimButtonText}
                            </Button>
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>

                  {/* <Grid item md={4.5}>
                    {drawCases.case2 ? (
                      <Typography>The winner has been declared</Typography>
                    ) : drawCases.case3 ? (
                      <Typography>Participate to start winning</Typography>
                    ) : (
                      <Typography>You did not participate</Typography>
                    )}
                  </Grid>
                  <Grid item md={2.5}>
                    {drawCases.case2 ? (
                      <Typography sx={{ fontSize: 14, opacity: 0.75 }}>
                        Your deposit has been carried&#8209;forward to the next
                        round
                      </Typography>
                    ) : drawCases.case3 ? (
                      <Typography>Deposit</Typography>
                    ) : (
                      <></>
                    )}
                  </Grid> */}
                </Grid>
              </>
            ) : (
              <Typography>
                You haven't participated in any lossless lotteries yet
              </Typography>
            )}
          </GridWithLabel>
          <GridWithLabel container label="Liquidity Pool">
            <Typography>
              You haven't participated in any liquidity pools yet
            </Typography>
          </GridWithLabel>
        </div>
      </Box>
    </Box>
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

export default Portfolio;
