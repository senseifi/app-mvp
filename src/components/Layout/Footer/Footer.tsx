import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import theme from "@/styles/theme";
import { Box, Theme, Typography, useTheme } from "@mui/material";
import React from "react";

const Footer = () => {
  const theme: Theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        p: 1,
      }}
    >
      <DarkModeToggle />
      <Typography
        paragraph
        gutterBottom
        sx={{ textAlign: "center", width: "100%" }}
      >
        Copyright &copy; SenSei Fi, {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
};

export default Footer;
