import { Box, Typography } from "@mui/material";
import React from "react";
import TimelineMarker from "./TimelineMarker";

const TimelineMilestone = ({
  milestone,
  width,
}: {
  milestone: string;
  width: number;
}) => {
  return (
    <Box
      sx={{
        mx: 1,
        width: `${width}%`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TimelineMarker />
      <Typography textAlign="center" fontSize={14}>
        {milestone}
      </Typography>
    </Box>
  );
};

export default TimelineMilestone;
