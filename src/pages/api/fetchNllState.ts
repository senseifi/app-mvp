import { seiStakingNLLContract } from "@/config/contracts";
import { SenseifiStakingNllQueryClient } from "@/contract_clients/SenseifiStakingNll.client";
import { GameState } from "@/contract_clients/SenseifiStakingNll.types";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const fetchNllState = async (cosmWasmClient: CosmWasmClient) => {
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

  return { params, globalState, totalRewards, pastGamesStates };
};
