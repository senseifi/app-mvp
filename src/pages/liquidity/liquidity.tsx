import Notification from "@/components/Notification/Notification";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";
import LPList from "@/components/LPList/LPList";
import { PoolList } from "@/types/customTypes";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { chainName, rpcEndpoint } from "@/config/sei";

import StakingDepositModal from "@/components/Modals/StakingDepositModal";
import { useChain } from "@cosmos-kit/react";
import StakingWithdrawModal from "@/components/Modals/StakingWithdrawModal";
import ClaimRewardsModal from "@/components/Modals/ClaimRewardsModal";

import { fetchUserStateForPool } from "../api/userStatePool";
import { fetchPoolDataForPool } from "../api/poolData";
import { fetchStakingPools } from "../api/fetchStakingPools";

const Liquidity = ({ stakingPools }: { stakingPools: PoolList[] }) => {
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

  const onClickWithdraw = (index: number) => {
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }

    setActivePoolIndex(index);
    setWithdrawOpen(true);
  };

  const onClickClaim = (index: number) => {
    if (!chain.isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }

    setActivePoolIndex(index);
    setClaimOpen(true);
  };

  const [poolList, setPoolList] = useState<PoolList[]>([]);

  useEffect(() => {
    setPoolList(stakingPools);
  }, [stakingPools, chain.address]);

  useEffect(() => {
    poolList.forEach((v, i) =>
      fetchUserStateForPool(chain, i, poolList, setPoolList, showNotif)
    );
  }, [chain.address]);

  const updatePoolData = async (index: number) => {
    return Promise.all([
      fetchPoolDataForPool(chain, index, poolList, setPoolList, showNotif),
      fetchUserStateForPool(chain, index, poolList, setPoolList, showNotif),
    ]);
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
    <>
      {depositOpen && (
        <StakingDepositModal
          open={depositOpen}
          setOpen={setDepositOpen}
          poolList={poolList[activePoolIndex]}
          showNotif={showNotif}
          updatePoolData={() => updatePoolData(activePoolIndex)}
        />
      )}
      {withdrawOpen && (
        <StakingWithdrawModal
          open={withdrawOpen}
          setOpen={setWithdrawOpen}
          poolList={poolList[activePoolIndex]}
          showNotif={showNotif}
          updatePoolData={() => updatePoolData(activePoolIndex)}
        />
      )}
      {claimOpen && (
        <ClaimRewardsModal
          open={claimOpen}
          setOpen={setClaimOpen}
          poolList={poolList[activePoolIndex]}
          showNotif={showNotif}
          updatePoolData={() => updatePoolData(activePoolIndex)}
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
              onClickWithdraw={onClickWithdraw}
              onClickClaim={onClickClaim}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const cosmWasmClient = await CosmWasmClient.connect(rpcEndpoint);

  const stakingPools = await fetchStakingPools(cosmWasmClient);

  return {
    props: {
      stakingPools: stakingPools,
    },
  };
};

export default Liquidity;
