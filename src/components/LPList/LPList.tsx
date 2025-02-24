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
import dynamic from "next/dynamic";

import { MoreVert, SwapHoriz } from "@mui/icons-material";
import "@fontsource/work-sans/600.css";

import PoolText from "../PoolText/PoolText";

import timeRemaining from "../TimeRemaining";
import Image from "next/image";
import { PoolList } from "@/types/customTypes";
import { chainName } from "@/config/sei";
import {
  SenseifiStakingPoolClient,
  SenseifiStakingPoolQueryClient,
} from "@/contract_clients/SenseifiStakingPool.client";
import { StdFee, coin } from "@cosmjs/amino";
import { getTokenImg, toAU, toSU } from "@/utils";
import { intlFormatStyle } from "@/constants/modals";

import {
  useCosmWasmClient,
  useWallet,
  useSigningCosmWasmClient,
} from "sei-js/packages/react/dist";

const ITEM_HEIGHT = 48;

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
    primaryEndTime,
    secondaryEndTime,
    primaryRewardRate,
    secondaryRewardRate,
    userState,
  },
  onClickDeposit,
  onClickWithdraw,
  onClickClaim,
}: {
  index: number;
  poolList: PoolList;
  onClickDeposit: Function;
  onClickWithdraw: Function;
  onClickClaim: Function;
}) => {
  const { cosmWasmClient: client } = useCosmWasmClient();
  const { signingCosmWasmClient } = useSigningCosmWasmClient();
  const wallet = useWallet();

  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  let time = timeRemaining(endTime);
  const ICON_WIDTH = isSmallScreen ? 45 : 50;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const supplyRewards = async () => {
    if (wallet.accounts[0]?.address === undefined) return;
    if (signingCosmWasmClient === undefined) return;

    try {
      const contract = new SenseifiStakingPoolClient(
        signingCosmWasmClient,
        wallet.accounts[0]?.address,
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

  const [dailyRewards, setDailyRewards] = useState<{
    primary: string;
    secondary?: string;
  }>({
    primary: "",
    secondary: undefined,
  });

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);

    let primary = BigInt(0);
    if (now < primaryEndTime && tvl != "0") {
      primary =
        (BigInt(userState?.total_stake ?? 0) *
          BigInt(primaryRewardRate) *
          BigInt(86400)) /
        BigInt(tvl);
    }

    let secondary: bigint | undefined;
    if (secondaryEndTime) {
      if (now < (secondaryEndTime ?? 0) && tvl != "0") {
        secondary =
          (BigInt(userState?.total_stake ?? 0) *
            BigInt(secondaryRewardRate ?? 0) *
            BigInt(86400)) /
          BigInt(tvl);
      } else {
        secondary = BigInt(0);
      }
    } else {
      secondary = undefined;
    }

    setDailyRewards({
      primary: primary.toString(),
      secondary: secondary?.toString(),
    });
  }, [userState, tvl, primaryEndTime, secondaryEndTime, primaryRewardRate]);

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
            {/* <PoolText
              header="Est. APR"
              body={apr != undefined ? `${apr}%` : "- %"}
            /> */}
          </Grid>
          <Grid item md={3} p="0 !important">
            <PoolText
              header="TVL"
              body={
                Intl.NumberFormat("en-US", intlFormatStyle).format(toAU(tvl)) +
                " " +
                stakePretty.toUpperCase()
              }
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
                  header="My Daily Rewards"
                  body={toAU(dailyRewards.primary)}
                  body2={earn1Pretty.toUpperCase()}
                  body3={
                    dailyRewards.secondary !== undefined
                      ? toAU(dailyRewards.secondary)
                      : undefined
                  }
                  body4={earn2Pretty?.toUpperCase() ?? undefined}
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
              <MenuItem onClick={() => onClickClaim(index)}>
                Claim Rewards
              </MenuItem>
              {/* <MenuItem onClick={supplyRewards}>Supply Rewards</MenuItem> */}
            </Menu>
          </Grid>
          <Grid item xs={2} md={2} sx={{ paddingLeft: "0 !important" }}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LPList;
