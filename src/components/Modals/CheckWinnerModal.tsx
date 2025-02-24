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
import { Draw } from "@/types/customTypes";
import { chainName } from "@/config/sei";
import {
  SenseifiStakingNllClient,
  SenseifiStakingNllQueryClient,
} from "@/contract_clients/SenseifiStakingNll.client";
import { seiStakingNLLContract } from "@/config/contracts";
import { StdFee, coin } from "@cosmjs/amino";
import { Params } from "@/contract_clients/SenseifiStakingNll.types";
import { toAU } from "@/utils";
import Loader from "../Loader/Loader";
import {
  useCosmWasmClient,
  useWallet,
  useSigningCosmWasmClient,
} from "sei-js/packages/react/dist";

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
  params,
  showNotif,
}: {
  open: boolean;
  setOpen: Function;
  gameID: string;
  params: Params;
  showNotif: Function;
}) => {
  const { cosmWasmClient: client } = useCosmWasmClient();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const wallet = useWallet();

  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [isLoading, setIsLoading] = useState(true);

  const [usrIsWinner, setUsrIsWinner] = useState<
    "true" | "false" | "undefined"
  >("undefined");
  const [loadingWinner, setLoadingWinner] = useState(false);

  const [draw, setDraw] = useState<Draw>();

  useEffect(() => {
    (async function () {
      if (client === undefined) return;

      try {
        setIsLoading(true);

        const contract = new SenseifiStakingNllQueryClient(
          client,
          seiStakingNLLContract
        );

        const gameState = await contract.getGameState({ gameId: gameID });

        let latestDraw: Draw = {
          id: gameID,
          active: false,
          prize: gameState.total_prize,
          winner: gameState.winner,
          prizeClaimed: gameState.prize_claimed,
        };

        setDraw(latestDraw);
      } catch (e) {
        let errorMsg = "";
        if (typeof e === "string") {
          errorMsg = e.toUpperCase();
        } else if (e instanceof Error) {
          errorMsg = e.message;
        }

        showNotif(errorMsg, "error");
        setOpen(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [gameID, client]);

  const checkingWinner = () => {
    setLoadingWinner(true);
    setTimeout(() => {
      setLoadingWinner(false);
      setUsrIsWinner(
        draw?.winner === wallet.accounts[0]?.address ? "true" : "false"
      );
    }, 5000);
  };

  const claimPrize = async () => {
    if (signingCosmWasmClient === undefined) return;

    if (draw?.prizeClaimed === false) {
      try {
        setIsLoading(true);

        const contract = new SenseifiStakingNllClient(
          signingCosmWasmClient,
          wallet.accounts[0]?.address,
          seiStakingNLLContract
        );

        const fee: StdFee = {
          amount: [coin("10000", params.denom)],
          gas: "500000",
        };

        await contract.claimPrize(
          { gameId: gameID },
          fee,
          undefined,
          undefined
        );

        showNotif(
          `Successfully claimed ${toAU(draw.totDeposit ?? "0")} SEI`,
          "success"
        );
        setOpen(false);
      } catch (e) {
        let errorMsg = "";
        if (typeof e === "string") {
          errorMsg = e.toUpperCase();
        } else if (e instanceof Error) {
          errorMsg = e.message;
        }

        showNotif(errorMsg, "error");
        setOpen(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      showNotif(`Prize has already been claimed ;)`, "info");
      setOpen(false);
    }
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
          borderRadius: 4,
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

        {loadingWinner && (
          <Box width="50%" m="auto">
            <CoinFlipSVG />
          </Box>
        )}
        {/* : (
          <>
            {usrIsWinner === "undefined" && (
              <Box display="flex" mt={3} sx={{ justifyContent: "center" }}>
                <FlipClockCountdown {...flipcounterProps(theme)} />
              </Box>
            )}
          </>
        )} */}

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
                        Are you ready to see if you&apos;ve won?
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
                      Round {gameID}
                    </Typography>
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
                      onClick={claimPrize}
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
                      you haven&apos;t won this time
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
        {...modalProps(theme)}
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
              {isLoading && <Loader />}
              <ModalContent />
            </Box>
          </Slide>
        </>
      </Modal>
    </div>
  );
};

export default CheckWinnerModal;
