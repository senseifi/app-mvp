import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logoLight from "../../../assets/logo-light.png";
import logoDark from "../../../assets/logo-dark.png";
import { AccountBalanceWallet, Menu } from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";

const NavBar = () => {
  const theme: Theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const { toggleSidebar } = useProSidebar();

  return (
    <Box
      sx={{
        height: "4rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        background: theme.palette.secondary.main,
        p: 1,
      }}
    >
      {isSmallScreen ? (
        <IconButton color="primary" onClick={() => toggleSidebar()}>
          <Menu />
        </IconButton>
      ) : (
        ""
      )}
      <Image
        alt="SenSei Finance Logo"
        src={theme.palette.mode === "light" ? logoLight : logoDark}
        style={{
          maxHeight: "100%",
          width: "auto",
        }}
      />
      <Button
        variant="contained"
        disableElevation
        startIcon={<AccountBalanceWallet />}
        size="large"
        sx={{ "& span": { margin: isSmallScreen ? 0 : "" } }}
      >
        {isSmallScreen ? "" : "Connect Wallet"}
      </Button>
    </Box>
  );
};

export default NavBar;
