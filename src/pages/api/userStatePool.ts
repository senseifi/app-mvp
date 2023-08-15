import { SenseifiSingleRewardStakingPoolQueryClient } from "@/contract_clients/SenseifiSingleRewardStakingPool.client";
import { SenseifiStakingPoolQueryClient } from "@/contract_clients/SenseifiStakingPool.client";
import { PoolList, showNotiFunction } from "@/types/customTypes";

export const fetchUserStateForPool = async (
  chain: ChainContext,
  index: number,
  poolList: PoolList[],
  setPoolList: React.Dispatch<React.SetStateAction<PoolList[]>>,
  showNotif: showNotiFunction
) => {
  try {
    let total_stake: string | undefined;

    if (chain.address === undefined) {
      total_stake = undefined;
    } else {
      const client = await chain.getCosmWasmClient();

      if (!poolList[index].multiReward) {
        const contract = new SenseifiSingleRewardStakingPoolQueryClient(
          client,
          poolList[index].address
        );

        const userState = await contract.getUserState({
          user: chain.address,
        });

        total_stake = userState.total_stake;
      } else {
        const contract = new SenseifiStakingPoolQueryClient(
          client,
          poolList[index].address
        );

        const userState = await contract.getUserState({
          user: chain.address,
        });

        total_stake = userState.total_stake;
      }
      setPoolList((v) => {
        const temp = [...v];
        const pool = temp[index];
        pool.userState = total_stake != undefined ? { total_stake } : undefined;
        temp[index] = pool;
        return temp;
      });
    }
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
