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

import { chainName } from "@/config/sei";
import { coin, StdFee } from "@cosmjs/amino";
import { toAU, toSU } from "@/utils";
import { feeDenom } from "@/config/contracts";
import Loader from "../Loader/Loader";
import { PoolList } from "@/types/customTypes";
import { SenseifiStakingPoolClient } from "@/contract_clients/SenseifiStakingPool.client";
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

const StakingDepositModal = ({
  open,
  setOpen,
  poolList,
  showNotif,
  updatePoolData,
}: {
  open: boolean;
  setOpen: Function;
  poolList: PoolList;
  showNotif: Function;
  updatePoolData: Function;
}) => {
  const { cosmWasmClient: client } = useCosmWasmClient();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const wallet = useWallet();

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

  const [userBalance, setUserBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      if (wallet.accounts[0]?.address === undefined) return;
      if (client === undefined) return;

      try {
        setIsLoading(true);

        const balance = await client.getBalance(
          wallet.accounts[0]?.address,
          poolList.stake
        );
        setUserBalance(balance.amount);
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
  }, [wallet.accounts[0]?.address, poolList, client]);

  const stake = async () => {
    if (wallet.accounts[0]?.address === undefined) return;
    if (signingCosmWasmClient === undefined) return;

    try {
      setIsLoading(true);

      const contract = new SenseifiStakingPoolClient(
        signingCosmWasmClient,
        wallet.accounts[0]?.address,
        poolList.address
      );

      const fee: StdFee = {
        amount: [coin("10000", feeDenom)],
        gas: "500000",
      };
      const funds = [coin(toSU(selectedValue), poolList.stake)];
      await contract.stake(fee, undefined, funds);

      await updatePoolData();

      showNotif(
        `Successfully deposited ${selectedValue} ${poolList.stakePretty}`,
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
    } finally {
      setIsLoading(false);
    }
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
                Deposit
              </Typography>

              <ShineButton sx={{ fontSize: "20px", fontStyle: "italic" }}>
                More deposits = more rewards!
              </ShineButton>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <AmountSlider
                  usrTokens={toAU(userBalance)}
                  tokenDenom={poolList.stake}
                  title={"Deposit Amount"}
                  setSelectedValue={setSelectedValue}
                  dp={3}
                />
                <Button
                  variant="yellowFill"
                  size="small"
                  fullWidth
                  // sx={{ fontSize: "0.875rem" }}
                  onClick={stake}
                >
                  Deposit
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
                  to={poolList.endTime * 1000}
                />
              </Box>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default StakingDepositModal;
