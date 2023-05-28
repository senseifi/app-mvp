import Notification from "@/components/Notification/Notification";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import LPList from "@/components/LPList/LPList";
import { PoolList } from "@/types/customTypes";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { chainName, rpcEndpoint } from "@/config/sei";
import { SenseifiStakingPoolQueryClient } from "@/contract_clients/SenseifiStakingPool.client";
import {
  seiStakingPoolContract,
  senStakingPoolContract,
} from "@/config/contracts";
import {
  GlobalState,
  Params,
} from "@/contract_clients/SenseifiStakingPool.types";
import { getPrettyDenom, nsToSecs } from "@/utils";
import StakingDepositModal from "@/components/Modals/StakingDepositModal";
import { useChain } from "@cosmos-kit/react";

const Liquidity = ({
  stakingPools,
}: {
  stakingPools: { address: String; params: Params; globalState: GlobalState }[];
}) => {
  const chain = useChain(chainName);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const showNotif = (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => {
    setNotifMsg(message);
    setNotifSev(severity);
    setOpenNotif(true);
  };

  const onClickDeposit = (index: number) => {
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }

    setActivePoolIndex(index);
    setDepositOpen(true);
  };

  const poolList: PoolList[] = stakingPools.map((v) => ({
    address: v.address.valueOf(),
    stake: v.params.stake_denom,
    stakePretty: getPrettyDenom(v.params.stake_denom),
    earn1: v.params.primary_reward_denom,
    earn1Pretty: getPrettyDenom(v.params.primary_reward_denom),
    earn2: v.params.secondary_reward_denom,
    earn2Pretty: getPrettyDenom(v.params.secondary_reward_denom),
    apr: 69,
    tvl: v.globalState.total_stake,
    endTime:
      nsToSecs(v.params.primary_finish_time) <
      nsToSecs(v.params.secondary_finish_time)
        ? nsToSecs(v.params.secondary_finish_time)
        : nsToSecs(v.params.primary_finish_time),
  }));

  //START- notification handlers
  const [openNotif, setOpenNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notifSev, setNotifSev] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const [depositOpen, setDepositOpen] = useState(false);
  const [activePoolIndex, setActivePoolIndex] = useState(0);

  const handleCloseNotif = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotif(false);
  };
  //END- notification handlers

  return (
    <>
      {depositOpen && (
        <StakingDepositModal
          open={depositOpen}
          setOpen={setDepositOpen}
          poolList={poolList[activePoolIndex]}
          showNotif={showNotif}
        />
      )}
      <Box>
        <Head>
          <title>Sensei Liquidity Pools</title>
          <meta name="description" content="Gamified Defi on Sei network" />
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
              fontSize: isSmallScreen ? "4rem !important" : "",
              fontWeight: "medium",
            }}
          >
            Liquidity Pools
          </Typography>
        </main>
        <Box component="section">
          {poolList.map((pool, i) => (
            <LPList
              key={i}
              index={i}
              poolList={pool}
              onClickDeposit={onClickDeposit}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const cosmWasmClient = await CosmWasmClient.connect(rpcEndpoint);

  const stakingContracts = [seiStakingPoolContract, senStakingPoolContract];
  const stakingPools: any[] = [];

  for (let i in stakingContracts) {
    const ctcAddr = stakingContracts[i];
    const contract = new SenseifiStakingPoolQueryClient(
      cosmWasmClient,
      ctcAddr
    );

    const [params, globalState] = await Promise.all([
      contract.getParams(),
      contract.getGlobalState(),
    ]);

    stakingPools.push({ address: ctcAddr, params, globalState });
  }

  return {
    props: {
      stakingPools: stakingPools,
    },
  };
};

export default Liquidity;
