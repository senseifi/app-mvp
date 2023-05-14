import { Slider, styled } from "@mui/material";
import React from "react";

const CustomSlider = styled(Slider)({
  color: "tertiary",
  //   height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    // height: 24,
    // width: 24,
    animate: "2s infinite",
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 13,
    background: "unset",
    padding: 8,
    width: 60,
    // height: 32,

    border: "2px solid #FFDB2C",
    borderRadius: "10px",
    //borderRadius: "50% 50% 50% 0",
    backgroundColor: "#071428",
    transformOrigin: "bottom",
    // transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    animation: "slide-in 0.2s",
    "&:before": {
      backgroundColor: "transparent",
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderTop: "10px solid #FFDB2C",
      transform: "translate(-50%, 100%)rotate(0deg)",
    },
  },
});

export default CustomSlider;
