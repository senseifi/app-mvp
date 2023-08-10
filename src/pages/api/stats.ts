import { useState } from "react";
import { PoolStats, showNotiFunction } from "@/types/customTypes";
import { calculateTickets, nsToSecs, toAU } from "@/utils";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import { SenseifiStakingNllQueryClient } from "@/contract_clients/SenseifiStakingNll.client";
import { gameDurationSecs, seiStakingNLLContract } from "@/config/contracts";
import { ChainContext } from "@cosmos-kit/core";

export async function fetchStats(
  showNotif: showNotiFunction,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setStats: React.Dispatch<React.SetStateAction<PoolStats>>,
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>,
  chain: ChainContext
) {
  try {
    setIsLoading(true);

    const client = await chain.getCosmWasmClient();

    const contract = new SenseifiStakingNllQueryClient(
      client,
      seiStakingNLLContract
    );

    const [params, globalState] = await Promise.all([
      contract.getParams(),
      contract.getGlobalState(),
    ]);

    const totalTickets = BigInt(globalState.total_tickets);
    const totalStake = BigInt(globalState.total_stake);
    const numDepositors = globalState.num_stakers;
    const lastUpdateTime = BigInt(nsToSecs(globalState.last_update_time));
    const gameStartTime = BigInt(nsToSecs(globalState.game_start_time));
    const currentTime = BigInt(Math.floor(Date.now() / 1000));

    const newTotalTickets = calculateTickets(
      totalTickets,
      totalStake,
      lastUpdateTime,
      gameStartTime,
      gameStartTime + BigInt(gameDurationSecs)
    );

    let newUserTickets: BigInt | undefined = undefined;
    let userStake: BigInt | undefined = undefined;

    if (chain.address) {
      const userState = await contract.getUserState({ user: chain.address });

      const totalTickets = BigInt(userState.total_tickets);
      const totalStake = BigInt(userState.total_stake);
      const lastUpdateTime = BigInt(nsToSecs(userState.last_update_time));

      userStake = totalStake;
      newUserTickets = calculateTickets(
        totalTickets,
        totalStake,
        lastUpdateTime,
        gameStartTime,
        gameStartTime + BigInt(gameDurationSecs)
      );
    }

    setStats({
      totalDeposit: totalStake.toString(),
      totalTickets: newTotalTickets.toString(),
      numDepositors: numDepositors,
      userDeposit: userStake?.toString(),
      userTickets: newUserTickets?.toString(),
    });

    setShowDetails(true);
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
}
