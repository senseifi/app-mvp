import { CustomModalProps } from "@/types/customTypes";
import { FireworksOptions } from "@fireworks-js/react";
import { FlipClockCountdownProps } from "@leenguyen/react-flip-clock-countdown";
import { Backdrop, ModalProps, Theme, useTheme } from "@mui/material";

export const fireworkOptions: FireworksOptions = {
  gravity: 1.5,
  flickering: 5,
  traceLength: 2,
  explosion: 10,
  intensity: 50,
  acceleration: 1,
  rocketsPoint: {
    min: 40,
    max: 60,
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 4,
    },
  },
  hue: {
    min: 15,
    max: 50,
  },
};

export const timeToDraw = new Date().getTime() + 24 * 3600 * 1000 + 5000;

export const flipcounterProps = () => {
  const theme: Theme = useTheme();

  //https://github.com/sLeeNguyen/react-flip-clock-countdown#containerprops
  const flipCDProps: FlipClockCountdownProps = {
    to: timeToDraw,
    showLabels: true,
    showSeparators: true,
    renderMap: [true, true, true, true],
    labels: ["DAYS", "HOURS", "MINUTES", "SECONDS"],
    labelStyle: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      color: theme.palette.secondary.main,
    },
    digitBlockStyle: {
      width: 30,
      height: 40,
      fontSize: 30,
      color: theme.palette.primary.main,
      background: theme.palette.secondary.main,
    },
    dividerStyle: {
      color: theme.palette.primary.main,
      height: 1,
    },
    separatorStyle: {
      color: theme.palette.secondary.main,
      size: "4px",
    },
    duration: 0.5,
    onTick: () => undefined,
    onComplete: () => console.log("timer"),
  };
  return flipCDProps;
};

export const modalProps = () => {
  const theme: Theme = useTheme();
  const modalProps: ModalProps = {
    closeAfterTransition: true,
    slots: { backdrop: Backdrop },
    slotProps: {
      backdrop: {
        timeout: 500,
        sx: {
          backgroundColor:
            theme.palette.mode === "light" ? "#07142860" : "#07142840",
          backdropFilter: "blur(40px)",
        },
      },
    },
  } as any;
  //"as any" added to defer TS missing props error

  return modalProps;
};
