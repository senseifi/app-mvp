import {
  Backdrop,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShineButton from "../ShineButton";
import { Fireworks } from "@fireworks-js/react";
import {
  flipcounterProps,
  fireworkOptions,
  timeToDraw,
  modalProps,
} from "@/constants/modals";

import { Close } from "@mui/icons-material";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  m: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CheckWinnerModal = ({
  open,
  setOpen,

  gameID,
}: {
  open: boolean;
  setOpen: Function;

  gameID: number;
}) => {
  const handleClose = () => setOpen(false);
  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <div>
      <Modal
        {...modalProps()}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <>
          <Fireworks
            options={fireworkOptions}
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              position: "fixed",
              background: "#00000045",
            }}
          />
          <Slide direction="up" in={open}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: isSmallScreen ? "100%" : 400,
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 2,
                  border: "4px solid",
                  borderColor: theme.palette.tertiary.main,
                  boxShadow: "0px 0px 24px #FFF",
                  p: 4,
                  zIndex: 10000,
                }}
              >
                <IconButton
                  color={"secondary"}
                  onClick={handleClose}
                  sx={{ display: "flex", ml: "auto" }}
                >
                  <Close />
                </IconButton>
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                  sx={{ textTransform: "uppercase", mb: 5 }}
                >
                  Check Draw!
                </Typography>
                <Box display="flex" mt={3} sx={{ justifyContent: "center" }}>
                  <FlipClockCountdown {...flipcounterProps()} />
                </Box>

                {timeToDraw !== 0 ? (
                  <>
                    <Typography my={2}>
                      Come back when the timer hits 0 <br /> <br />
                      Until then, keep your fingers crossed!
                    </Typography>
                    <Button
                      disableElevation
                      variant="contained"
                      color="secondary"
                      size="small"
                      fullWidth
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography my={2}>Keep your fingers crossed...</Typography>
                    <Button variant="yellowFill" size="small" fullWidth>
                      Check Now!
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Slide>
        </>
      </Modal>
    </div>
  );
};

export default CheckWinnerModal;
