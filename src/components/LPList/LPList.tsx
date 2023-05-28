import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { MoreVert, SwapHoriz } from "@mui/icons-material";
import "@fontsource/work-sans/600.css";
import PoolText from "../PoolText/PoolText";

import timeRemaining from "../TimeRemaining";
import Image from "next/image";
import { PoolList } from "@/types/customTypes";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import {
  SenseifiStakingPoolClient,
  SenseifiStakingPoolQueryClient,
} from "@/contract_clients/SenseifiStakingPool.client";
import { StdFee, coin } from "@cosmjs/amino";
import { getTokenImg, toAU } from "@/utils";
import { UserState } from "@/contract_clients/SenseifiStakingPool.types";

const ITEM_HEIGHT = 48;

//token to usd exchange rates: 1 token = x USD
//token1
type Token = "sei" | "sen" | "pepe";
interface EarningsBreakdown {
  earnAmt1: number; //quantity in earn1 tokens (not USD)
  earnAmt2?: number; //quantity in earn2 tokens (not USD)
}

const exchangeRates: Record<string, number> = {
  sei: 0.5,
  sen: 0.1,
  pepe: 0.001,
};

const LPList = ({
  index,
  poolList: {
    address,
    stake,
    stakePretty,
    earn1,
    earn1Pretty,
    earn2,
    earn2Pretty,
    apr,
    distributionRatio,
    tvl,
    endTime,
  },
  onClickDeposit,
  onClickWithdraw,
}: {
  index: number;
  poolList: PoolList;
  onClickDeposit: Function;
  onClickWithdraw: Function;
}) => {
  const chain = useChain(chainName);
  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  let time = timeRemaining(endTime);
  const ICON_WIDTH = isSmallScreen ? 45 : 50;
  //calculate rewards in earn1 and earn2
  // const rewardsCalc = () => {
  //   const dailyReturnPercent = apr / 365;
  //   const stakeConverted = 45 * exchangeRates[stake];
  //   const dailyReturnAmt = (dailyReturnPercent / 100) * stakeConverted;

  //   if (
  //     earn2 === undefined ||
  //     distributionRatio === undefined //second condition added to quiet ts-check
  //   ) {
  //     const earnings: EarningsBreakdown = {
  //       earnAmt1: dailyReturnAmt * exchangeRates[earn1],
  //     };
  //     return earnings;
  //   } else {
  //     const earnings: EarningsBreakdown = {
  //       earnAmt1:
  //         (dailyReturnAmt * (1 - distributionRatio)) / exchangeRates[earn1],
  //       earnAmt2: (dailyReturnAmt * distributionRatio) / exchangeRates[earn2],
  //     };
  //     return earnings;
  //   }
  // };

  // const { earnAmt1, earnAmt2 } = rewardsCalc();
  const [userState, setUserState] = useState<UserState | undefined>(undefined);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchSetUserState = async () => {
    if (chain.address === undefined) {
      setUserState(undefined);
      return;
    }

    const client = await chain.getCosmWasmClient();
    const contract = new SenseifiStakingPoolQueryClient(client, address);
    const userState = await contract.getUserState({ user: chain.address });
    setUserState(userState);
  };

  useEffect(() => {
    fetchSetUserState();
  }, [chain.address]);

  const supplyRewards = async () => {
    if (chain.address === undefined) return;

    try {
      const client = await chain.getSigningCosmWasmClient();

      const contract = new SenseifiStakingPoolClient(
        client,
        chain.address,
        address
      );

      const fee: StdFee = {
        amount: [coin("10000", "usei")],
        gas: "500000",
      };
      const funds = [coin("1200", "usei")];
      const res = await contract.supplyRewards(fee, undefined, funds);
    } catch (e) {}
  };

  //After clicking withdraw, once the amount is available
  const [claimAvailable, setClaimAvailable] = useState(false);

  return (
    <>
      <Box
        sx={{
          my: 5,
          px: isSmallScreen ? 2 : 7,
          py: isSmallScreen ? 2 : 3,
          border: "1px solid",
          borderRadius: 3,
        }}
      >
        <Grid
          container
          gap={2}
          sx={{
            justifyContent: "space-between",
            borderColor: "secondary",
          }}
        >
          <Grid
            item
            xs={12}
            md={4.5}
            display="flex"
            alignItems="center"
            p="0 !important"
            mb={isSmallScreen ? 2 : 0}
          >
            <Box sx={{ height: ICON_WIDTH, scale: "105%", display: "flex" }}>
              <Image
                alt="stake coin icon"
                width={ICON_WIDTH}
                height={ICON_WIDTH}
                src={getTokenImg(stake)}
              />

              <PoolText header="Stake" body={stakePretty.toUpperCase()} />
            </Box>
            <SwapHoriz
              fontSize={isSmallScreen ? "medium" : "large"}
              sx={{
                mx: isSmallScreen ? 1 : 2,
              }}
            />
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  width: ICON_WIDTH * (earn2 !== undefined ? 1.5 : 1),
                  height: ICON_WIDTH,
                }}
              >
                <Box
                  sx={{
                    width: ICON_WIDTH,
                    scale: "105%",
                    position: "absolute",
                  }}
                >
                  <Image
                    alt="stake coin icon"
                    width={ICON_WIDTH}
                    height={ICON_WIDTH}
                    src={getTokenImg(earn1)}
                  />
                </Box>
                {earn2 && (
                  <Box
                    sx={{
                      width: ICON_WIDTH,
                      position: "absolute",
                      transform: "translateX(50%)",
                    }}
                  >
                    <Image
                      alt="stake coin icon"
                      width={ICON_WIDTH}
                      height={ICON_WIDTH}
                      src={getTokenImg(earn2)}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <PoolText
              header="Earn"
              body={`${earn1Pretty.toUpperCase()} ${
                earn2Pretty !== undefined
                  ? ` + ${earn2Pretty?.toUpperCase()}`
                  : ``
              }`}
            />
          </Grid>
          <Grid item p="0 !important">
            <PoolText header="Est. APR" body={`${apr}%`} />
          </Grid>
          <Grid item md={2} p="0 !important">
            <PoolText
              header="TVL"
              body={toAU(tvl) + " " + stakePretty.toUpperCase()}
            />
          </Grid>
          <Grid item md={1.2} p="0 !important">
            <PoolText header="Ends in" body={time} />
          </Grid>
        </Grid>
        <Divider
          variant="middle"
          sx={{ mt: isSmallScreen ? 2 : 5, borderColor: "#8181814d" }}
        />
        <Grid
          container
          sx={{
            gap: 1,
            mt: isSmallScreen ? 0 : 2,
            alignItems: "center",
          }}
        >
          {userState !== undefined ? (
            <>
              <Grid item xs={12} md={5.7}>
                <PoolText
                  large
                  header="My Stake"
                  body={toAU(userState.total_stake)}
                  body2={stakePretty.toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <PoolText
                  large
                  header="My Unclaimed Rewards"
                  body={toAU(userState.primary_reward)}
                  body2={earn1Pretty.toUpperCase()}
                  body3={toAU(userState.secondary_reward)}
                  body4={earn2Pretty?.toUpperCase() ?? ""}
                />
              </Grid>
            </>
          ) : (
            <Grid item md={9}>
              <Typography sx={{ mt: 2, fontWeight: 600 }}>
                Participate now to start earning!
              </Typography>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={2}
            sx={{ mt: isSmallScreen ? 2 : 0, ml: "auto", display: "flex" }}
          >
            <Button
              variant="yellowFill"
              size="small"
              fullWidth
              sx={{ fontSize: "0.875rem", height: "auto" }}
              onClick={() => onClickDeposit(index)}
            >
              Deposit
            </Button>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={openMenu ? "long-menu" : undefined}
              aria-expanded={openMenu ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              color="secondary"
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "max-content",
                  border: "2px solid",
                  borderColor: theme.palette.tertiary.main,
                  borderRadius: 10,
                },
              }}
            >
              <MenuItem onClick={() => onClickWithdraw(index)}>
                Withdraw
              </MenuItem>
              <MenuItem>Claim withdrawal</MenuItem>
              <MenuItem onClick={supplyRewards}>Supply Rewards</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={2} md={2} sx={{ paddingLeft: "0 !important" }}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LPList;
