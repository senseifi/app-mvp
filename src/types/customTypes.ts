export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export type Draw = {
  active: boolean;
  prize: number;
  totDeposit: number;
  totTix: number;
  usrDeposit: number;
  usrTix: number;
  timeRem: number;
};
