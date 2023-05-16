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

import { Close, Help } from "@mui/icons-material";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { flipcounterProps, modalProps } from "@/constants/modals";
import AmountSlider from "../Slider/AmountSlider";

import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import {
  GlobalState,
  Params,
} from "@/contract_clients/SenseifiStakingNll.types";
import { coin, StdFee } from "@cosmjs/amino";
import { calculateTickets, nsToSecs, toAU, toSU } from "@/utils";
import { gameDurationSecs, seiStakingNLLContract } from "@/config/contracts";
import {
  SenseifiStakingNllClient,
  SenseifiStakingNllQueryClient,
} from "@/contract_clients/SenseifiStakingNll.client";

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

const TicketsModal = ({
  open,
  setOpen,
  tmType,
  params,
  globalState,
}: {
  open: boolean;
  setOpen: Function;
  tmType: "enter" | "withdraw";
  params: Params;
  globalState: GlobalState;
}) => {
  const chain = useChain(chainName);

  //reset states and close modal
  const handleClose = () => {
    setSelectedValue(0);
    setOpen(false);
  };

  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [otherValue, setOtherValue] = useState<number | undefined>();

  const [userBalance, setUserBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [ticketFactor, setTicketFactor] = useState(BigInt(0));
  const [stakedAmount, setStakedAmount] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(event.target.value));
    //setHelperText(`${parseInt(selectedValue) * 10} Tickets`);
  };
  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(Number(event.target.value));
    //setHelperText(`${otherValue !== undefined && otherValue * 10} Tickets`);
  };

  const [helperText, setHelperText] = useState<String>();

  const helperTextMessage = () => {
    if (otherValue !== undefined) {
      setHelperText(`${otherValue !== undefined && otherValue * 10} Tickets`);
    } else {
      setHelperText(
        `~ ${Intl.NumberFormat("en-US").format(
          toAU((BigInt(toSU(selectedValue)) * ticketFactor).toString())
        )} Tickets`
      );
    }
  };

  useEffect(() => {
    helperTextMessage();
  }, [selectedValue, otherValue]);

  useEffect(() => {
    (async function () {
      if (chain.address === undefined) return;

      const client = await chain.getCosmWasmClient();

      const contract = new SenseifiStakingNllQueryClient(
        client,
        seiStakingNLLContract
      );

      const [balance, stake] = await Promise.all([
        client.getBalance(chain.address, params.denom),
        contract.getUserState({ user: chain.address }),
      ]);

      setUserBalance(balance.amount);
      setStakedAmount(stake.total_stake);

      setTicketFactor(
        calculateTickets(
          BigInt(0),
          BigInt(1),
          BigInt(Math.floor(Date.now() / 1000)),
          BigInt(nsToSecs(globalState.game_start_time)),
          BigInt(nsToSecs(globalState.game_start_time) + gameDurationSecs)
        )
      );

      setIsLoading(false);
    })();
  }, [chain.address, globalState.game_start_time, params.denom]);

  const stake = async () => {
    if (chain.address === undefined) return;

    const client = await chain.getSigningCosmWasmClient();

    const contract = new SenseifiStakingNllClient(
      client,
      chain.address,
      seiStakingNLLContract
    );

    const fee: StdFee = {
      amount: [coin("10000", params.denom)],
      gas: "500000",
    };
    const funds = coin(toSU(selectedValue), params.denom);
    await contract.stake({ nonWinner: false }, fee, undefined, [funds]);
  };

  const unstake = async () => {
    if (chain.address === undefined || otherValue === undefined) return;

    const client = await chain.getSigningCosmWasmClient();

    const contract = new SenseifiStakingNllClient(
      client,
      chain.address,
      seiStakingNLLContract
    );

    const fee: StdFee = {
      amount: [coin("10000", params.denom)],
      gas: "500000",
    };

    await contract.unstake({ amount: toSU(otherValue) }, fee);
  };

  if (!chain.isWalletConnected) {
    chain.openView();
    return <></>;
  }

  if (isLoading) return <></>;

  return (
    <div>
      <Modal
        {...modalProps(theme)}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
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
                sx={{ textTransform: "uppercase" }}
              >
                {tmType === "enter" ? "Enter Draw" : "Withdraw"}
              </Typography>
              {tmType === "enter" ? (
                <>
                  <ShineButton sx={{ fontSize: "20px", fontStyle: "italic" }}>
                    More deposits = better odds!
                  </ShineButton>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <AmountSlider
                      usrTokens={toAU(userBalance)}
                      title={"Deposit Amount"}
                      setSelectedValue={setSelectedValue}
                      dp={3}
                    />
                    {/* TODO: error messages based on invalid inputs */}
                    <Box display="flex" alignItems="center" my={2}>
                      <Typography mr={4}>{helperText}</Typography>
                      <Tooltip
                        disableFocusListener
                        title={
                          "The tickets you receive are proportional to the amount of tokens you deposit and the time remaining for the draw"
                        }
                      >
                        <Help sx={{ fontSize: "1rem", opacity: 0.5 }} />
                      </Tooltip>
                    </Box>
                    <Button
                      variant="yellowFill"
                      size="small"
                      fullWidth
                      // sx={{ fontSize: "0.875rem" }}
                      onClick={stake}
                    >
                      Enter Draw
                    </Button>
                  </FormControl>
                  <Box display="flex" mt={3} sx={{ justifyContent: "center" }}>
                    <FlipClockCountdown
                      // labelStyle={{
                      //   fontSize: 10,
                      //   fontWeight: 600,
                      //   textTransform: "uppercase",
                      //   color: theme.palette.secondary.main,
                      // }}
                      {...flipcounterProps(theme)}
                      to={
                        (nsToSecs(globalState.game_start_time) +
                          gameDurationSecs) *
                        1000
                      }
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Typography
                    my={3}
                    sx={{
                      color: theme.palette.secondary.main,
                    }}
                  >
                    You have{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {toAU(stakedAmount)}
                    </span>{" "}
                    Sei deposited in this pool
                  </Typography>
                  <TextField
                    type="number"
                    label="Sei Amount"
                    variant="outlined"
                    color="secondary"
                    margin="dense"
                    fullWidth
                    value={otherValue}
                    onChange={handleOtherChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                  {/* TODO: error messages based on invalid inputs */}

                  <Typography color="error" my={2} fontSize="small">
                    Once you click withdraw, your tokens will be avaiable to be
                    claimed in about 72Hrs
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    fullWidth
                    onClick={unstake}
                  >
                    Withdraw
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    fullWidth
                    sx={{ my: 2 }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default TicketsModal;
