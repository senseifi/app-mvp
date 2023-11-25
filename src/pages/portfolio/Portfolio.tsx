import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Notification from "@/components/Notification/Notification";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { chainName, rpcEndpoint } from "@/config/sei";
import Avatar from "boring-avatars";
import "@fontsource/work-sans/300.css";

import GridWithLabel from "@/components/GridWithLabel/GridWithLabel";
import senIcon from "@/assets/senIcon.png";
import Image from "next/image";
import useSelectWallet from "@/hooks/useSelectWallet";

import {
  GameState,
  GlobalState,
  Params,
} from "@/contract_clients/SenseifiStakingNll.types";

import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { getTokenImg, roundToDP, toAU } from "@/utils";
import { Draw, PoolList, PoolStats } from "@/types/customTypes";
import { fetchStats } from "../api/nllStats";

import { useRouter } from "next/router";
import { fetchStakingPools } from "../api/fetchStakingPools";
import { fetchUserStateForPool } from "../api/userStatePool";
import LPListForProfile from "@/components/LPList/LPListForProfile";

import { fetchNllState } from "../api/fetchNllState";

import {
  useCosmWasmClient,
  useWallet,
  useSigningCosmWasmClient,
} from "sei-js/packages/react/dist";

const Portfolio = ({
  params,
  stakingPools,
}: {
  params: Params;
  stakingPools: PoolList[];
}) => {
  const { cosmWasmClient: client } = useCosmWasmClient();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const wallet = useWallet();
  const { openModal } = useSelectWallet();

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    setIsWalletConnected(wallet.connectedWallet !== undefined);
  }, [wallet.connectedWallet]);

  const router = useRouter();

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

  const [showDetails, setShowDetails] = useState(false);

  const [stats, setStats] = useState<PoolStats>({
    totalDeposit: "",
    totalTickets: "",
    numDepositors: "",
    userDeposit: undefined,
    userTickets: undefined,
  });

  const handleFetchStats = () => {
    fetchStats(
      showNotif,
      setIsLoading,
      setStats,
      setShowDetails,
      client,
      wallet
    );
  };

  const [poolList, setPoolList] = useState<PoolList[]>([]);

  useEffect(() => {
    setPoolList(stakingPools);
  }, [stakingPools, wallet.accounts[0]?.address]);

  useEffect(() => {
    (async function () {
      if (client === undefined) return;
      if (wallet.accounts[0]?.address === undefined) return;
      try {
        setIsLoading(true);
        handleFetchStats();

        const userBalance = await client.getBalance(
          wallet.accounts[0]?.address,
          params.denom
        );
        setUserBalance(userBalance.amount);

        poolList.forEach((v, i) =>
          fetchUserStateForPool(
            i,
            poolList,
            setPoolList,
            showNotif,
            client,
            wallet
          )
        );
      } catch (e) {
        let errorMsg = "";
        if (typeof e === "string") {
          errorMsg = e.toUpperCase();
        } else if (e instanceof Error) {
          errorMsg = e.message;
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [wallet.accounts[0]?.address, params.denom, client]);

  //START- notification handlers
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
  //END- notification handlers

  return (
    <Box>
      <Head>
        <title>Savvio Portfolio page</title>
        <meta name="description" content="Your portfolio on Savvio" />
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
            sx={{
              "& svg": {
                borderRadius: 2,
                my: isSmallScreen ? 3 : 2,
                mx: "auto",
              },
            }}
          >
            <Avatar
              size={isSmallScreen ? "75%" : "120"}
              square
              name={
                !isWalletConnected
                  ? "sei1"
                  : wallet.accounts[0]?.address?.slice(4, 20)
              }
              variant="beam"
              colors={["#00255d", "#FFAB03", "#FFDB2C", "#FC3903", "#00A8C6"]}
            />
          </Grid>
          {!isWalletConnected ? (
            <Typography
              onClick={openModal}
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
                    Apt&nbsp;
                  </Typography>
                  {isLoading ? (
                    <Skeleton animation="wave" height="2rem" />
                  ) : (
                    <Typography sx={{ fontSize: 20 }}>
                      {roundToDP(toAU(userBalance), 3)}
                    </Typography>
                  )}
                </Grid>
                {!isSmallScreen && (
                  <Grid
                    item
                    sx={{
                      height: "130%",
                      border: "0.5px solid darkgray",
                      mx: 2,
                      alignSelf: "center",
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
                  <Typography sx={{ fontSize: 20 }}>
                    {wallet.accounts[0]?.address}
                  </Typography>
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
        <Typography variant="h2">Your Total Savings: </Typography>
        <div>
          <GridWithLabel container label="Lossless Lottery">
            {!isWalletConnected ? (
              <Typography sx={{ opacity: 0.6, py: 1 }}>
                wallet not connected
              </Typography>
            ) : userHasParticipated ? (
              <>
                {isSmallScreen ? null : (
                  <Grid
                    container
                    justifyContent="space-between"
                    sx={{
                      my: 1,
                    }}
                  >
                    <Grid item md={1.5}>
                      <Typography variant="h6">Tickets</Typography>
                    </Grid>
                    <Grid item md={5}>
                      <Typography variant="h6">Deposit Amount</Typography>
                    </Grid>
                    <Grid item md={2}></Grid>
                  </Grid>
                )}
                <Grid
                  container
                  sx={{
                    justifyContent: isSmallScreen ? "" : "space-between",
                    flexDirection: isSmallScreen ? "column" : "",
                    alignItems: "center",
                  }}
                >
                  <Grid item md={1.5}>
                    <Box display="flex" sx={{ mt: isSmallScreen ? 2 : "" }}>
                      <Image alt="Savvio icon" src={senIcon} width={24} />
                      {isLoading ? (
                        <Skeleton animation="wave" width="100%" />
                      ) : (
                        <Typography>
                          {stats.userTickets !== undefined
                            ? Intl.NumberFormat("en-US").format(
                                toAU(stats.userTickets)
                              )
                            : "-"}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item md={5} sx={{ my: isSmallScreen ? 2 : "" }}>
                    {isLoading ? (
                      <Skeleton animation="wave" width="100%" />
                    ) : (
                      <Typography>
                        {stats.userDeposit !== undefined
                          ? Intl.NumberFormat("en-US").format(
                              toAU(stats.userDeposit)
                            )
                          : "-"}{" "}
                        Apt
                      </Typography>
                    )}
                  </Grid>
                  <Grid item md={2}>
                    <Grid container gap={1}>
                      <Tooltip title="Go to Home page">
                        <Button
                          onClick={() => router.push("/home")}
                          variant="yellowBorder"
                          fullWidth
                          sx={{ fontSize: 12, p: 1 }}
                        >
                          Manage
                        </Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography>
                You haven&apos;t participated in any lossless lotteries yet
              </Typography>
            )}
          </GridWithLabel>
          <GridWithLabel container label="Liquidity Pools">
            {!isWalletConnected ? (
              <Typography sx={{ opacity: 0.6, py: 1 }}>
                wallet not connected
              </Typography>
            ) : userHasParticipated ? (
              <>
                {isSmallScreen ? null : (
                  <Grid
                    container
                    justifyContent="space-between"
                    sx={{
                      my: 1,
                    }}
                  >
                    <Grid item md={2.5}>
                      <Typography variant="h6">Pool</Typography>
                    </Grid>
                    <Grid item md={2.5}>
                      <Typography variant="h6">Deposit Amount</Typography>
                    </Grid>
                    <Grid item md={2.5}>
                      <Typography variant="h6">Rewards</Typography>
                    </Grid>
                    <Grid item md={2}></Grid>
                  </Grid>
                )}
                <Grid
                  container
                  sx={{
                    justifyContent: isSmallScreen ? "" : "space-between",
                    flexDirection: isSmallScreen ? "column" : "",
                    alignItems: "center",
                  }}
                >
                  {poolList.map((pool, i) =>
                    pool.userState !== undefined ? (
                      isLoading ? (
                        <Skeleton animation="wave" width="100%" height="3rem" />
                      ) : (
                        <LPListForProfile key={i} index={i} poolList={pool} />
                      )
                    ) : null
                  )}

                  <Grid item md={1.5}></Grid>
                </Grid>
              </>
            ) : (
              <Typography>
                You haven&apos;t participated in any liquidity pools yet
              </Typography>
            )}
          </GridWithLabel>
        </div>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async () => {
  const cosmWasmClient = await CosmWasmClient.connect(rpcEndpoint);

  const { params } = await fetchNllState(cosmWasmClient);

  const stakingPools = await fetchStakingPools(cosmWasmClient);

  return {
    props: {
      params,
      stakingPools: stakingPools,
    },
  };
};

export default Portfolio;

//TODO: loading states for data
