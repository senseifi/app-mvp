import { useEffect, useState } from "react";
import { CoinGeckoClient } from "coingecko-api-v3";
import { Sparklines, SparklinesCurve, SparklinesSpots } from "react-sparklines";
import { Box, Typography } from "@mui/material";
import SeiCoin from "../SeiCoin/SeiCoin";

const SeiChart = ({ sidebarIsOpen }: { sidebarIsOpen?: boolean }) => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });

  const [priceData, setPriceData] = useState<number[]>([]);
  const [priceDifference, setPriceDifference] = useState<number>(0);

  const fetchSeiPrice = async () => {
    const data = await client.coinIdMarketChart({
      id: "sei-network",
      vs_currency: "usd",
      days: 1,
    });

    const formattedPriceData = data.prices
      .map((data) => Math.round(data[1] * 10000) / 10000)
      .slice(0, 288);

    setPriceData(formattedPriceData);
    setPriceDifference(
      formattedPriceData[0] - formattedPriceData[formattedPriceData.length - 1]
    );
    console.log(priceDifference);
  };

  useEffect(() => {
    fetchSeiPrice();
  }, []);

  return (
    <>
      {priceData.length > 0 && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box width={20} height={20} sx={{ display: "flex" }}>
                <SeiCoin colored />
              </Box>
              <Typography fontSize={20}>Sei</Typography>
            </Box>
            <Typography fontWeight="bold" fontSize={15}>
              US${priceData[priceData.length - 1]}
            </Typography>
          </div>
          <Box
            sx={{
              display: !sidebarIsOpen ? "flex" : "none",
              alignItems: "center",
              justifyContent: "end",
              height: 50,
              width: "100%",

              "& svg": {
                height: 50,
                width: "100%",
              },
            }}
          >
            <Sparklines data={priceData} height={120}>
              <SparklinesCurve
                style={{
                  //fill: priceDifference > 0 ? "red" : "lawngreen",
                  fill: "none",
                  strokeWidth: 3,
                  stroke: priceDifference > 0 ? "red" : "lawngreen",
                }}
              />
              <SparklinesSpots />
            </Sparklines>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SeiChart;
