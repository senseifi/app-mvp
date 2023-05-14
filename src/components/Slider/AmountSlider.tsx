import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Slider } from "@mui/material";
import SeiCoin from "../SeiCoin/SeiCoin";
import CustomSlider from "../CustomSlider/CustomSlider";

const usrTokens = 5000;

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
  title,
  setSelectedValue,
}: {
  title?: String;
  setSelectedValue: Function;
}) => {
  const [value, setValue] = useState(30);

  const handleSliderChange = (event: Event, newValue: number) => {
    setValue(newValue);
    setSelectedValue((usrTokens * newValue) / 100);
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
            <SeiCoin />
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
          {(usrTokens * value) / 100 + " "}
          Sei
        </Grid>
      </Grid>
    </Box>
  );
};
export default AmountSlider;
