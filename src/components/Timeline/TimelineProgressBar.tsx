import { Box } from "@mui/material";
import React from "react";

const TimelineProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Box
      sx={{
        zIndex: 3,
        mt: 0.6,
        //transform: "translateX(50%)",
        opacity: 1,
        position: "absolute",
        left: 0,
        border: 2,
        borderColor: "tertiary.main",
        borderRadius: "3px",
        width: `${progress}%`, //progress
      }}
    />
  );
};

export default TimelineProgressBar;
