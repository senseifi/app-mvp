/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.27.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Uint128 = string;
export interface InstantiateMsg {
  admin: string;
  primary_reward_denom: string;
  primary_reward_rate: Uint128;
  secondary_reward_denom: string;
  secondary_reward_rate: Uint128;
  stake_denom: string;
}
export type ExecuteMsg = {
  stake: {};
} | {
  unstake: {
    amount: Uint128;
  };
} | {
  claim_rewards: {};
} | {
  supply_rewards: {};
} | {
  set_reward_rate: {
    primary_reward_rate: Uint128;
    secondary_reward_rate: Uint128;
  };
};
export type QueryMsg = {
  get_admin: {};
} | {
  get_params: {};
} | {
  get_global_state: {};
} | {
  get_user_state: {
    user: string;
  };
};
export type Addr = string;
export type Timestamp = Uint64;
export type Uint64 = string;
export interface GlobalState {
  last_update_time: Timestamp;
  num_stakers: Uint128;
  primary_reward_per_token_stored: Uint128;
  secondary_reward_per_token_stored: Uint128;
  total_stake: Uint128;
}
export interface Params {
  primary_finish_time: Timestamp;
  primary_reward_denom: string;
  primary_reward_rate: Uint128;
  secondary_finish_time: Timestamp;
  secondary_reward_denom: string;
  secondary_reward_rate: Uint128;
  stake_denom: string;
}
export interface UserState {
  primary_reward: Uint128;
  primary_reward_per_token_paid: Uint128;
  secondary_reward: Uint128;
  secondary_reward_per_token_paid: Uint128;
  total_stake: Uint128;
}