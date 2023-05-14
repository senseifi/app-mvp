/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.27.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

export type Uint64 = string;
export interface InstantiateMsg {
  admin: string;
  denom: string;
  min_unbond_interval_sec: Uint64;
  validator: string;
}
export type ExecuteMsg =
  | {
      set_admin: {
        admin: string;
      };
    }
  | {
      set_unbond_interval: {
        min_unbond_interval_sec: Uint64;
      };
    }
  | {
      set_winner: {
        winner: string;
      };
    }
  | {
      redelegate: {
        validator: string;
      };
    }
  | {
      unbond: {};
    }
  | {
      stake: {
        non_winner: boolean;
      };
    }
  | {
      unstake: {
        amount: Uint128;
      };
    }
  | {
      claim_prize: {
        game_id: Uint128;
      };
    }
  | {
      claim_unstake: {};
    };
export type Uint128 = string;
export type QueryMsg =
  | {
      get_admin: {};
    }
  | {
      get_params: {};
    }
  | {
      get_global_state: {};
    }
  | {
      get_game_state: {
        game_id: Uint128;
      };
    }
  | {
      get_user_state: {
        user: string;
      };
    }
  | {
      get_total_rewards: {};
    };
export type Addr = string;
export interface GameState {
  game_id: Uint128;
  prize_claimed: boolean;
  total_prize: Uint128;
  winner: Addr;
}
export type Timestamp = Uint64;
export interface GlobalState {
  game_counter: Uint128;
  game_start_time: Timestamp;
  last_unbond_time: Timestamp;
  last_update_time: Timestamp;
  num_stakers: Uint128;
  total_rewards: Uint128;
  total_stake: Uint128;
  total_tickets: Uint128;
  total_to_be_unbonded: Uint128;
  total_unclaimed_prize: Uint128;
}
export interface Params {
  denom: string;
  min_unbond_interval_sec: Uint64;
  validator: Addr;
}
export interface UserState {
  last_update_time: Timestamp;
  non_winner: boolean;
  total_stake: Uint128;
  total_tickets: Uint128;
  total_unstake: Uint128;
}
