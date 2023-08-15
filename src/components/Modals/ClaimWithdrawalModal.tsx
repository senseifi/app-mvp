import {
  Box,
  Button,
  IconButton,
  Modal,
  Slide,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Close } from "@mui/icons-material";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { modalProps } from "@/constants/modals";

import { chainName } from "@/config/sei";
import {
  GlobalState,
  Params,
} from "@/contract_clients/SenseifiStakingNll.types";
import { coin, StdFee } from "@cosmjs/amino";
import { toAU } from "@/utils";
import { seiStakingNLLContract } from "@/config/contracts";
import {
  SenseifiStakingNllClient,
  SenseifiStakingNllQueryClient,
} from "@/contract_clients/SenseifiStakingNll.client";
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

const ClaimWithdrawalModal = ({
  open,
  setOpen,
  params,
  showNotif,
}: {
  open: boolean;
  setOpen: Function;
  params: Params;
  showNotif: Function;
}) => {
  const { cosmWasmClient: client } = useCosmWasmClient();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const wallet = useWallet();

  //reset states and close modal
  const handleClose = () => {
    setOpen(false);
  };

  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [isLoading, setIsLoading] = useState(true);
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [claimAmount, setClaimAmount] = useState("");

  useEffect(() => {
    (async function () {
      if (client === undefined) return;

      try {
        setIsLoading(true);

        const contract = new SenseifiStakingNllQueryClient(
          client,
          seiStakingNLLContract
        );

        const [globalState, ctcbalance, userState] = await Promise.all([
          contract.getGlobalState(),
          client.getBalance(seiStakingNLLContract, params.denom),
          contract.getUserState({ user: wallet.accounts[0]?.address }),
        ]);

        setUnstakeAmount(userState.total_unstake);

        const ctcAvailable =
          BigInt(ctcbalance.amount) -
          BigInt(globalState.total_unclaimed_prize) -
          BigInt(globalState.total_rewards);

        const claimAmount =
          ctcAvailable < BigInt(userState.total_unstake)
            ? "0"
            : userState.total_unstake;

        setClaimAmount(claimAmount);

        setIsLoading(false);
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
  }, [wallet.accounts[0]?.address, params.denom, client]);

  const claimWithdrawal = async () => {
    if (signingCosmWasmClient === undefined) return;

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

      await contract.claimUnstake(fee);

      showNotif(`Successfully claimed ${toAU(claimAmount)} SEI`, "success");
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
                {"Claim Withdrawals"}
              </Typography>

              <>
                <Typography
                  my={3}
                  sx={{
                    color: theme.palette.secondary.main,
                  }}
                >
                  You have withdrawn{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {toAU(unstakeAmount)}
                  </span>{" "}
                  Sei
                </Typography>
                <Typography
                  my={3}
                  sx={{
                    color: theme.palette.secondary.main,
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {toAU(claimAmount)}
                  </span>{" "}
                  Sei avaiable to be claimed
                </Typography>
                <Typography color="error" my={2} fontSize="small">
                  Once you click claim, your tokens will be transferred to your
                  wallet
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  fullWidth
                  disabled={BigInt(claimAmount) <= BigInt(0)}
                  onClick={claimWithdrawal}
                >
                  Claim
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
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default ClaimWithdrawalModal;
