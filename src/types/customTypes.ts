export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export type Draw = {
  id: number;
  active: boolean;
  prize: number;
  totDeposit: number;
  totTix: number;
  usrDeposit: number;
  usrTix: number;
  timeRem: number;
};

export type ModalDetails = {
  open: boolean;
  isOpen: Function;
  id: number;
};
