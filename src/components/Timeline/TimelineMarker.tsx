import { Box } from "@mui/material";
import React from "react";

const TimelineMarker = () => {
  return (
    <Box
      sx={{
        zIndex: 2,
        width: 14,
        height: 14,
        backgroundColor: "tertiary.main",
        border: 3,
        borderColor: "primary.main",
        borderRadius: "50%",
      }}
    />
  );
};

export default TimelineMarker;
