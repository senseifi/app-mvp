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
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { modalProps } from "@/constants/modals";

import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import { coin, StdFee } from "@cosmjs/amino";
import { toAU, toSU } from "@/utils";
import { feeDenom } from "@/config/contracts";
import Loader from "../Loader/Loader";
import { PoolList } from "@/types/customTypes";
import {
  SenseifiStakingPoolClient,
  SenseifiStakingPoolQueryClient,
} from "@/contract_clients/SenseifiStakingPool.client";

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

const ClaimRewardsModal = ({
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
  const chain = useChain(chainName);

  //reset states and close modal
  const handleClose = () => {
    setOpen(false);
  };

  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [isLoading, setIsLoading] = useState(true);
  const [rewardString, setRewardString] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async function () {
      if (chain.address === undefined) return;

      try {
        setIsLoading(true);

        const client = await chain.getCosmWasmClient();

        const contract = new SenseifiStakingPoolQueryClient(
          client,
          poolList.address
        );

        const [stake] = await Promise.all([
          contract.getUserState({ user: chain.address }),
        ]);

        const isDisabled =
          toAU(stake.primary_reward) == 0 && toAU(stake.secondary_reward) == 0;
        setDisabled(isDisabled);

        const rewardStr = `${toAU(stake.primary_reward)} ${
          poolList.earn1Pretty
        } and ${toAU(stake.secondary_reward)} ${poolList.earn2Pretty}`;

        setRewardString(rewardStr);
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
  }, [chain.address, poolList]);

  const claimRewards = async () => {
    if (chain.address === undefined) return;

    try {
      setIsLoading(true);

      const client = await chain.getSigningCosmWasmClient();

      const contract = new SenseifiStakingPoolClient(
        client,
        chain.address,
        poolList.address
      );

      const fee: StdFee = {
        amount: [coin("10000", feeDenom)],
        gas: "500000",
      };

      await contract.claimRewards(fee, undefined, undefined);
      await updatePoolData();

      showNotif(`Successfully claimed ${rewardString}`, "success");
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
                Claim Rewards
              </Typography>

              <Typography
                my={3}
                sx={{
                  color: theme.palette.secondary.main,
                }}
              >
                You have{" "}
                <span style={{ fontWeight: "bold" }}>{rewardString}</span> ready
                to be claimed
              </Typography>

              <Typography color="error" my={2} fontSize="small">
                Once you click claim, your rewards will be transferred to be
                wallet
              </Typography>
              <Button
                variant="outlined"
                size="small"
                color="error"
                fullWidth
                onClick={claimRewards}
                disabled={disabled}
              >
                CLAIM
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
            </Box>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
};

export default ClaimRewardsModal;
