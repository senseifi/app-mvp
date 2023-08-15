import { SenseifiSingleRewardStakingPoolQueryClient } from "@/contract_clients/SenseifiSingleRewardStakingPool.client";
import { SenseifiStakingPoolQueryClient } from "@/contract_clients/SenseifiStakingPool.client";
import { PoolList, showNotiFunction } from "@/types/customTypes";
import { getPrettyDenom, nsToSecs } from "@/utils";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const fetchPoolDataForPool = async (
  index: number,
  poolList: PoolList[],
  setPoolList: React.Dispatch<React.SetStateAction<PoolList[]>>,
  showNotif: showNotiFunction,
  client: CosmWasmClient | undefined
) => {
  if (client === undefined) return;

  try {
    let latestPool: PoolList;
    if (!poolList[index].multiReward) {
      const contract = new SenseifiSingleRewardStakingPoolQueryClient(
        client,
        poolList[index].address
      );

      const [params, globalState] = await Promise.all([
        contract.getParams(),
        contract.getGlobalState(),
      ]);

      latestPool = {
        address: poolList[index].address,
        multiReward: false,
        stake: params.stake_denom,
        stakePretty: getPrettyDenom(params.stake_denom),
        earn1: params.reward_denom,
        earn1Pretty: getPrettyDenom(params.reward_denom),
        apr: 14,
        tvl: globalState.total_stake,
        endTime: nsToSecs(params.finish_time),
        primaryEndTime: nsToSecs(params.finish_time),
        primaryRewardRate: parseInt(params.reward_rate),
      };
    } else {
      const contract = new SenseifiStakingPoolQueryClient(
        client,
        poolList[index].address
      );

      const [params, globalState] = await Promise.all([
        contract.getParams(),
        contract.getGlobalState(),
      ]);

      latestPool = {
        address: poolList[index].address,
        multiReward: true,
        stake: params.stake_denom,
        stakePretty: getPrettyDenom(params.stake_denom),
        earn1: params.primary_reward_denom,
        earn1Pretty: getPrettyDenom(params.primary_reward_denom),
        earn2: params.secondary_reward_denom,
        earn2Pretty: getPrettyDenom(params.secondary_reward_denom),
        apr: 14,
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

    setPoolList((v) => {
      const temp = [...v];
      temp[index] = latestPool;
      return temp;
    });
  } catch (e) {
    let errorMsg = "";
    if (typeof e === "string") {
      errorMsg = e.toUpperCase();
    } else if (e instanceof Error) {
      errorMsg = e.message;
    }

    showNotif(errorMsg, "error");
  }
};
