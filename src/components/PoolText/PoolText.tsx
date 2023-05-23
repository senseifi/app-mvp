import { Box, Theme, Typography, useTheme } from "@mui/material";
import React from "react";

const PoolText = ({ header, body }: { header: String; body: String }) => {
  const theme: Theme = useTheme();
  return (
    <Box sx={{ ml: 1 }}>
      <Typography
        sx={{
          color: theme.palette.tertiary.main,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {header}
      </Typography>
      <Typography sx={{ fontSize: 20 }}>{body}</Typography>
    </Box>
  );
};

export default PoolText;
