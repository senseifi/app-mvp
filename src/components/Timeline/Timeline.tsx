import { Box, Grid } from "@mui/material";
import React from "react";
import TimelineProgressBar from "./TimelineProgressBar";
import TimelineMilestone from "./TimelineMilestone";
import TimelineTrack from "./TimelineTrack";

const Timeline = ({
  milestones,
  progress,
}: {
  milestones: string[];
  progress: number;
}) => {
  return (
    <Grid
      item
      sx={{
        width: "100%",

        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // width: "max-content",
          my: 2,
        }}
      >
        <Box
          sx={{
            mt: -0.7,
          }}
        >
          <TimelineProgressBar progress={progress} />
          <Box
            sx={{
              display: "flex",
            }}
          >
            {milestones.map((milestone) => (
              <TimelineMilestone
                milestone={milestone}
                width={100 / milestones.length}
              />
            ))}
          </Box>
        </Box>

        <TimelineTrack />
      </Box>
    </Grid>
  );
};

export default Timeline;
