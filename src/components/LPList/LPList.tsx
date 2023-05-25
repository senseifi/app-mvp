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
import React, { useState } from "react";

import { MoreVert, SwapHoriz } from "@mui/icons-material";
import "@fontsource/work-sans/600.css";
import PoolText from "../PoolText/PoolText";

import timeRemaining from "../TimeRemaining";
import Image from "next/image";
import { PoolList } from "@/types/customTypes";

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
  stake,
  earn1,
  earn2,
  apr,
  distributionRatio,
  tvl,
  endTime,
  usrStake,
}: PoolList) => {
  const theme: Theme = useTheme();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  let time = timeRemaining(endTime);
  const ICON_WIDTH = isSmallScreen ? 45 : 50;
  //calculate rewards in earn1 and earn2
  const rewardsCalc = () => {
    const dailyReturnPercent = apr / 365;
    const stakeConverted = usrStake * exchangeRates[stake];
    const dailyReturnAmt = (dailyReturnPercent / 100) * stakeConverted;

    if (
      earn2 === undefined ||
      distributionRatio === undefined //second condition added to quiet ts-check
    ) {
      const earnings: EarningsBreakdown = {
        earnAmt1: dailyReturnAmt * exchangeRates[earn1],
      };
      return earnings;
    } else {
      const earnings: EarningsBreakdown = {
        earnAmt1:
          (dailyReturnAmt * (1 - distributionRatio)) / exchangeRates[earn1],
        earnAmt2: (dailyReturnAmt * distributionRatio) / exchangeRates[earn2],
      };
      return earnings;
    }
  };

  const { earnAmt1, earnAmt2 } = rewardsCalc();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
                src={`/tokenIcons/${stake}.png`}
              />

              <PoolText header="Stake" body={stake.toUpperCase()} />
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
                    src={`/tokenIcons/${earn1}.png`}
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
                      src={`/tokenIcons/${earn2}.png`}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <PoolText
              header="Earn"
              body={`${earn1.toUpperCase()} ${
                earn2 !== undefined ? ` + ${earn2.toUpperCase()}` : ``
              }`}
            />
          </Grid>
          <Grid item p="0 !important">
            <PoolText header="Est. APR" body={`${apr}%`} />
          </Grid>
          <Grid item md={2} p="0 !important">
            <PoolText
              header="TVL"
              body={
                Intl.NumberFormat("en-US", {
                  notation: isSmallScreen ? "compact" : "standard",
                  maximumSignificantDigits: isSmallScreen ? 4 : undefined,
                }).format(tvl) +
                " " +
                stake.toUpperCase()
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
          {usrStake !== 0 ? (
            <>
              <Grid item xs={12} md={5.7}>
                <PoolText
                  large
                  header="My Stake"
                  body={usrStake}
                  body2={stake.toUpperCase()}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <PoolText
                  large
                  header="My Est. Daily Rewards"
                  body={Math.round(earnAmt1 * 10000) / 10000}
                  body2={earn1.toUpperCase()}
                  body3={
                    earnAmt2 !== undefined
                      ? Math.round(earnAmt2 * 10000) / 10000
                      : ""
                  }
                  body4={earn2 !== undefined ? earn2.toUpperCase() : ""}
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
              // onClick={() => onEnterNowClick()}
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
              <MenuItem>Withdraw</MenuItem>
              <MenuItem>Claim withdrawal</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={2} md={2} sx={{ paddingLeft: "0 !important" }}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LPList;
