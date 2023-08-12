import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Tooltip,
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
import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import {
  SenseifiStakingPoolClient,
  SenseifiStakingPoolQueryClient,
} from "@/contract_clients/SenseifiStakingPool.client";
import { StdFee, coin } from "@cosmjs/amino";
import { getTokenImg, toAU, toSU } from "@/utils";
import { useRouter } from "next/router";

const ITEM_HEIGHT = 48;

const exchangeRates: Record<string, number> = {
  sei: 0.5,
  sen: 0.1,
  pepe: 0.001,
};

const LPListForProfile = ({
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
}: {
  index: number;
  poolList: PoolList;
}) => {
  const chain = useChain(chainName);
  const router = useRouter();

  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  let time = timeRemaining(endTime);
  const ICON_WIDTH = 30;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  return userState === undefined ? null : (
    <>
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
          md={2.5}
          display="flex"
          alignItems="center"
          p="0 !important"
          mb={isSmallScreen ? 2 : 0}
        >
          <Box>
            <Image
              alt="stake coin icon"
              width={ICON_WIDTH}
              height={ICON_WIDTH}
              src={getTokenImg(stake)}
            />
            <Typography fontSize="0.8rem" textAlign="center">
              {stakePretty}
            </Typography>
          </Box>
          <SwapHoriz
            fontSize="small"
            sx={{
              mx: 1,
              mb: 2,
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
              width: ICON_WIDTH * (earn2 !== undefined ? 2.2 : 1),
            }}
          >
            <Box>
              <Image
                alt="stake coin icon"
                width={ICON_WIDTH}
                height={ICON_WIDTH}
                src={getTokenImg(earn1)}
              />
              <Typography fontSize="0.8rem" textAlign="center">
                {earn1Pretty}
              </Typography>
            </Box>
            {earn2 && (
              <Box>
                <Image
                  alt="stake coin icon"
                  width={ICON_WIDTH}
                  height={ICON_WIDTH}
                  src={getTokenImg(earn2)}
                />
                <Typography fontSize="0.8rem" textAlign="center">
                  {earn2Pretty}
                </Typography>
              </Box>
            )}
          </Box>

          {/* <PoolText
              header="Earn"
              body={`${earn1Pretty.toUpperCase()} ${
                earn2Pretty !== undefined
                  ? ` + ${earn2Pretty?.toUpperCase()}`
                  : ``
              }`}
            /> */}
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Typography>
            {toAU(userState.total_stake)} {stakePretty.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Typography>
            {toAU(dailyRewards.primary)} {earn1Pretty.toUpperCase()}
          </Typography>
          {dailyRewards.secondary !== undefined ? (
            <Typography>
              {toAU(dailyRewards.secondary)} {earn2Pretty?.toUpperCase()}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container gap={1}>
            <Tooltip title="Go to Liquidity page">
              <Button
                onClick={() => router.push("/liquidity")}
                variant="yellowBorder"
                fullWidth
                sx={{ fontSize: 12, p: 1 }}
              >
                Manage
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LPListForProfile;
