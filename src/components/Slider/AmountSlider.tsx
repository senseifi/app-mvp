import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import CustomSlider from "../CustomSlider/CustomSlider";
import { getPrettyDenom, getTokenImg, roundToDP } from "@/utils";

const marks = [
  {
    value: 25,
    label: "25%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 75,
    label: "75%",
  },
];

function valuetext(value: number) {
  return `${value}%`;
}

function valueLabelFormat(value: number) {
  return `${value}%`;
}
const AmountSlider = ({
  usrTokens,
  tokenDenom,
  title,
  setSelectedValue,
  dp,
}: {
  usrTokens: number;
  title?: String;
  tokenDenom: string;
  setSelectedValue: Function;
  dp: number;
}) => {
  const [value, setValue] = useState(30);

  const handleSliderChange = (event: Event, newValue: number) => {
    setValue(newValue);
    setSelectedValue(roundToDP((usrTokens * newValue) / 100, dp));
  };

  //set val to 0 when modal closes
  useEffect(() => setValue(0), []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography id="input-slider" gutterBottom sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box width={25}>
            <Image
              alt="stake coin icon"
              width={50}
              height={50}
              src={getTokenImg(tokenDenom)}
            />
          </Box>
        </Grid>
        <Grid item xs my={1}>
          <CustomSlider
            value={value}
            step={0.1}
            //@ts-ignore
            onChange={handleSliderChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
            color="secondary"
            marks={marks}
          />
        </Grid>
        <Grid item width={100}>
          {roundToDP((usrTokens * value) / 100, dp) + " "}
          {getPrettyDenom(tokenDenom)}
        </Grid>
      </Grid>
    </Box>
  );
};
export default AmountSlider;
