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
import StakingWithdrawModal from "@/components/Modals/StakingWithdrawModal";
import ClaimRewardsModal from "@/components/Modals/ClaimRewardsModal";

import { fetchUserStateForPool } from "../api/userStatePool";
import { fetchPoolDataForPool } from "../api/poolData";
import { fetchStakingPools } from "../api/fetchStakingPools";
import {
  useCosmWasmClient,
  useWallet,
  useSigningCosmWasmClient,
} from "sei-js/packages/react/dist";

const Liquidity = ({ stakingPools }: { stakingPools: PoolList[] }) => {
  const { cosmWasmClient: client } = useCosmWasmClient();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
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

  const showNotif = (
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) => {
    setNotifMsg(message);
    setNotifSev(severity);
    setOpenNotif(true);
  };

  const onClickDeposit = (index: number) => {
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }

    setActivePoolIndex(index);
    setDepositOpen(true);
  };

  const onClickWithdraw = (index: number) => {
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }

    setActivePoolIndex(index);
    setWithdrawOpen(true);
  };

  const onClickClaim = (index: number) => {
    if (!isWalletConnected) {
      showNotif("Please connect your wallet first :)", "info");
      return;
    }

    setActivePoolIndex(index);
    setClaimOpen(true);
  };

  const [poolList, setPoolList] = useState<PoolList[]>([]);

  useEffect(() => {
    setPoolList(stakingPools);
  }, [stakingPools, wallet.accounts[0]?.address]);

  useEffect(() => {
    poolList.forEach((v, i) =>
      fetchUserStateForPool(i, poolList, setPoolList, showNotif, client, wallet)
    );
  }, [wallet.accounts[0]?.address]);

  const updatePoolData = async (index: number) => {
    return Promise.all([
      fetchPoolDataForPool(index, poolList, setPoolList, showNotif, client),
      fetchUserStateForPool(
        index,
        poolList,
        setPoolList,
        showNotif,
        client,
        wallet
      ),
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
          <title>Savvio Liquidity Pools</title>
          <meta name="description" content="Gamified Defi" />
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
