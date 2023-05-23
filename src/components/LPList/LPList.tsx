import { Box, Theme, Typography, useTheme } from "@mui/material";
import React from "react";

import { SwapHoriz } from "@mui/icons-material";
import "@fontsource/work-sans/600.css";
import PoolText from "../PoolText/PoolText";

import timeRemaining from "../TimeRemaining";
import Image from "next/image";
const ICON_WIDTH = 50;

const LPList = ({
  stake,
  earn1,
  earn2,
  apr,
  tvl,
  endTime,
}: {
  stake: String;
  earn1: String;
  earn2?: String;
  apr: number;
  tvl: number;
  endTime: number;
}) => {
  const theme: Theme = useTheme();
  let time = timeRemaining(endTime);

  return (
    <>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "secondary",
          my: 5,
          px: 7,
          py: 3,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
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
              fontSize="large"
              sx={{
                mx: 2,
              }}
            />
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                  width: ICON_WIDTH * 1.5,
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
              <PoolText
                header="Earn"
                body={`${earn1.toUpperCase()} ${
                  earn2 !== undefined ? ` + ${earn2.toUpperCase()}` : ``
                }`}
              />
            </Box>
          </Box>
          <PoolText header="Est. APR" body={`${apr}%`} />
          <PoolText
            header="TVL"
            body={
              Intl.NumberFormat("en-US").format(tvl) + " " + stake.toUpperCase()
            }
          />

          <PoolText header="Ends in" body={time} />
        </Box>
      </Box>
    </>
  );
};

export default LPList;
