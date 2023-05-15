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
