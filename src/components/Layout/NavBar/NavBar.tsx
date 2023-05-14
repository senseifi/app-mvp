import {
  Box,
  Button,
  IconButton,
  Link,
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

import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import { truncateAddress } from "@/utils";

const NavBar = () => {
  const chain = useChain(chainName);
  const theme: Theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const { toggleSidebar } = useProSidebar();

  return (
    <Box
      component="nav"
      paddingX={isSmallScreen ? 1 : 10}
      paddingY={1}
      sx={{
        height: "4rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        background: "#071428",
        boxShadow: "0 0 20px  #ffffff50",
        zIndex: 999,
      }}
    >
      {isSmallScreen ? (
        <IconButton
          color={theme.palette.mode === "light" ? "primary" : "secondary"}
          onClick={() => toggleSidebar()}
        >
          <Menu />
        </IconButton>
      ) : (
        ""
      )}
      <Link href="/home">
        <Image
          alt="SenSei Finance Logo"
          src={logoLight}
          style={{
            maxHeight: "100%",
            width: "auto",
          }}
        />
      </Link>
      <Button
        onClick={chain.openView}
        variant="contained"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"} //workaround
        disableElevation
        startIcon={<AccountBalanceWallet />}
        size="large"
        sx={{
          backgroundColor: isSmallScreen ? "transparent" : "#FFF",
          color: isSmallScreen ? "#FFF" : "#071428",
          "& span": { margin: isSmallScreen ? 0 : "" },
          "&:hover": {
            backgroundColor: isSmallScreen ? "#ffffff3d" : "",
          },
        }}
      >
        {isSmallScreen
          ? ""
          : chain.isWalletConnected
          ? truncateAddress(chain.address)
          : "Connect Wallet"}
      </Button>
    </Box>
  );
};

export default NavBar;
