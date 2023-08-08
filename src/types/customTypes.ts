import { UserState } from "@/contract_clients/SenseifiStakingPool.types";
import { ModalProps, Theme } from "@mui/material";

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export type Draw = {
  id: string;
  active: boolean;
  prize: string;
  totDeposit?: string;
  totTix?: string;
  usrDeposit?: string;
  usrTix?: string;
  endTime?: number;
  winner?: string;
  prizeClaimed?: boolean;
};

export type ModalDetails = {
  open: boolean;
  isOpen: Function;
  id: number;
};

export interface CustomModalProps extends ModalProps {
  theme: Theme;
}

export type PoolList = {
  address: string;
  multiReward: boolean;
  stake: string;
  stakePretty: string;
  earn1: string;
  earn1Pretty: string;
  earn2?: string; //preferably the weaker token
  earn2Pretty?: string;
  apr?: number;
  distributionRatio?: PoolList["earn2"] extends undefined ? undefined : number; // distribution of earn1 amt(in USD):earn2 amt(in USD) if applicable. can only be defined if earn2 is also defined
  tvl: string;
  endTime: number;
  primaryEndTime: number;
  secondaryEndTime?: number;
  primaryRewardRate: number;
  secondaryRewardRate?: number;
  userState?: { total_stake: string };
};
