// utils/fetchStakingPools.ts

import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { stakingContracts } from "@/config/contracts";
import { PoolList } from "@/types/customTypes";
import { getPrettyDenom, nsToSecs } from "@/utils";
import { SenseifiSingleRewardStakingPoolQueryClient } from "@/contract_clients/SenseifiSingleRewardStakingPool.client";
import { SenseifiStakingPoolQueryClient } from "@/contract_clients/SenseifiStakingPool.client";

export const fetchStakingPools = async (
  cosmWasmClient: CosmWasmClient
): Promise<PoolList[]> => {
  const stakingPools: PoolList[] = [];

  if (stakingContracts.length === 0) return stakingPools;

  for (let i in stakingContracts) {
    const ctcAddr = stakingContracts[i].address;
    const multiReward = stakingContracts[i].multiReward;
    let poolList: PoolList;

    if (!multiReward) {
      const contract = new SenseifiSingleRewardStakingPoolQueryClient(
        cosmWasmClient,
        ctcAddr
      );

      const [params, globalState] = await Promise.all([
        contract.getParams(),
        contract.getGlobalState(),
      ]);

      poolList = {
        address: ctcAddr,
        multiReward: false,
        stake: params.stake_denom,
        stakePretty: getPrettyDenom(params.stake_denom),
        earn1: params.reward_denom,
        earn1Pretty: getPrettyDenom(params.reward_denom),
        tvl: globalState.total_stake,
        endTime: nsToSecs(params.finish_time),
        primaryEndTime: nsToSecs(params.finish_time),
        primaryRewardRate: parseInt(params.reward_rate),
      };
    } else {
      const contract = new SenseifiStakingPoolQueryClient(
        cosmWasmClient,
        ctcAddr
      );

      const [params, globalState] = await Promise.all([
        contract.getParams(),
        contract.getGlobalState(),
      ]);

      poolList = {
        address: ctcAddr,
        multiReward: true,
        stake: params.stake_denom,
        stakePretty: getPrettyDenom(params.stake_denom),
        earn1: params.primary_reward_denom,
        earn1Pretty: getPrettyDenom(params.primary_reward_denom),
        earn2: params.secondary_reward_denom,
        earn2Pretty: getPrettyDenom(params.secondary_reward_denom),
        tvl: globalState.total_stake,
        endTime:
          nsToSecs(params.primary_finish_time) <
          nsToSecs(params.secondary_finish_time)
            ? nsToSecs(params.secondary_finish_time)
            : nsToSecs(params.primary_finish_time),
        primaryEndTime: nsToSecs(params.primary_finish_time),
        secondaryEndTime: nsToSecs(params.secondary_finish_time),
        primaryRewardRate: parseInt(params.primary_reward_rate),
        secondaryRewardRate: parseInt(params.secondary_reward_rate),
      };
    }

    stakingPools.push(poolList);
  }

  return stakingPools;
};
