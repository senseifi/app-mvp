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
import { AccountBalanceWallet, Menu, SwapCalls } from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";

import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import { truncateAddress } from "@/utils";
import WormholeIcon from "@/components/WormholeIcon/WormholeIcon";

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
      <Link href="/home" style={{ width: "min-width" }}>
        <Image
          alt="SenSei Finance Logo"
          src={logoLight}
          style={{
            maxHeight: "100%",
            width: "auto",
          }}
        />
      </Link>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Link href="/wormhole">
          <IconButton
            aria-label="wormhole"
            sx={{
              color: "#FFF",
              transform: "rotate(90deg)",
              maxHeight: "40px",
              margin: "auto",
            }}
          >
            <WormholeIcon />
          </IconButton>
        </Link>
        <Link href="/swap">
          <IconButton
            aria-label="swap"
            sx={{
              color: "#FFF",
              transform: "rotate(90deg)",
              maxHeight: "40px",
              margin: "auto",
            }}
          >
            <SwapCalls />
          </IconButton>
        </Link>
        <Button
          onClick={chain.openView}
          variant="contained"
          color={theme.palette.mode === "dark" ? "secondary" : "primary"} //workaround
          disableElevation
          startIcon={<AccountBalanceWallet sx={{ ml: 1 }} />}
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
          {isSmallScreen ? (
            ""
          ) : chain.isWalletConnected ? (
            truncateAddress(chain.address)
          ) : (
            <span style={{ marginRight: "0.5rem" }}>Connect&nbsp;Wallet</span>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
