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
import CoinFlipSVG from "../CoinFlipSVG";

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
  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [usrIsWinner, setUsrIsWinner] = useState<
    "true" | "false" | "undefined"
  >("true");
  const [loadingWinner, setLoadingWinner] = useState(false);

  const checkingWinner = () => {
    setLoadingWinner(true);
  };

  //reset states and close modal
  const handleClose = () => {
    // setLoadingWinner(false);
    // setUsrIsWinner(false);
    setOpen(false);
  };

  const ModalContent = () => {
    return (
      <Box
        sx={{
          width: isSmallScreen ? "100%" : 400,
          bgcolor: theme.palette.primary.main,
          borderRadius: 2,
          border: "4px solid",
          borderColor:
            usrIsWinner === "undefined" || usrIsWinner === "true"
              ? theme.palette.tertiary.main
              : theme.palette.error.light,
          boxShadow:
            usrIsWinner === "undefined"
              ? "0px 0px 24px #FFF"
              : usrIsWinner === "true"
              ? "0px 0px 24px #FFDB2C"
              : "0px 0px 24px #f44336",
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
        {usrIsWinner === "undefined" && (
          <Typography
            id="transition-modal-title"
            variant="h5"
            component="h2"
            sx={{ textTransform: "uppercase", mb: 5 }}
          >
            Check Draw!
          </Typography>
        )}

        {loadingWinner ? (
          <Box width="50%" m="auto">
            <CoinFlipSVG />
          </Box>
        ) : (
          <>
            {usrIsWinner === "undefined" && (
              <Box display="flex" mt={3} sx={{ justifyContent: "center" }}>
                <FlipClockCountdown {...flipcounterProps()} />
              </Box>
            )}
          </>
        )}

        {timeToDraw == 0 ? (
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
            {loadingWinner ? (
              <>
                <Typography my={2}>
                  <span style={{ fontWeight: "bold" }}>
                    The wait is almost over!
                  </span>
                  <br />
                </Typography>
                <Button
                  disabled
                  variant="contained"
                  size="small"
                  fullWidth
                  className="loading"
                >
                  Checking
                </Button>
              </>
            ) : (
              <>
                {usrIsWinner === "undefined" && (
                  <>
                    <Typography my={2}>
                      <span style={{ fontWeight: "bold" }}>
                        Are you ready to see if you've won?
                      </span>
                      <br />
                      Keep your fingers crossed...
                    </Typography>
                    <Button
                      variant="yellowFill"
                      size="small"
                      fullWidth
                      className="pulse-button"
                      onClick={() => checkingWinner()}
                    >
                      Check Now!
                    </Button>
                  </>
                )}
                {usrIsWinner === "true" && (
                  <>
                    <Typography
                      sx={{
                        mt: 2,
                        mb: 5,
                        fontSize: 28,
                        fontWeight: "bold",
                        // color: "gray",
                      }}
                    >
                      You have won!
                    </Typography>
                    <Button
                      variant="yellowFill"
                      size="small"
                      fullWidth

                      // onClick={()=>()}
                    >
                      Claim your prize
                    </Button>
                  </>
                )}
                {usrIsWinner === "false" && (
                  <>
                    <Typography
                      sx={{
                        mt: 2,
                        mb: 5,
                        fontSize: 28,
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      Too bad, <br />
                      you haven't won this time
                    </Typography>
                    <Button
                      color="secondary"
                      variant="contained"
                      disableElevation
                      size="small"
                      fullWidth
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
    );
  };

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
          {usrIsWinner === "true" && (
            <Fireworks
              onClick={handleClose}
              options={fireworkOptions}
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                background: "#00000045",
              }}
            />
          )}
          <Slide direction="up" in={open}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <ModalContent />
            </Box>
          </Slide>
        </>
      </Modal>
    </div>
  );
};

export default CheckWinnerModal;
