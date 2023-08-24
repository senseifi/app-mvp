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
import React, { useEffect, useState } from "react";
import logoLight from "../../../assets/logo-light.png";
import logoDark from "../../../assets/logo-dark.png";
import { AccountBalanceWallet, Menu, SwapCalls } from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";

import { chainName } from "@/config/sei";
import { truncateAddress } from "@/utils";
import WormholeIcon from "@/components/WormholeIcon/WormholeIcon";
import { useWallet } from "sei-js/packages/react/dist";
import { WalletSelectModal } from "@/components/SeiWallet";
import useSelectWallet from "@/hooks/useSelectWallet";
import { useRouter } from "next/router";

const NavBar = () => {
  const wallet = useWallet();
  const { openModal } = useSelectWallet();

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    setIsWalletConnected(wallet.connectedWallet !== undefined);
  }, [wallet.connectedWallet]);

  const theme: Theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const { toggleSidebar } = useProSidebar();
  const router = useRouter();

  return (
    <>
      <WalletSelectModal />
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

        <Image
          onClick={() => router.push("/home")}
          alt="SenSei Finance Logo"
          src={logoLight}
          style={{
            height: "100%",
            width: "auto",
            cursor: "pointer",
          }}
        />

        <Box sx={{ display: "flex", gap: "1rem" }}>
          {/* <Link href="/wormhole">
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
        </Link> */}
          <Typography
            variant="yellowText"
            sx={{
              my: "auto",
              fontWeight: 500,
              ...(isSmallScreen
                ? {
                    position: "absolute",
                    transform: "translate(-70%, 50%)",
                  }
                : null),
            }}
          >
            Mainnet
          </Typography>
          <Button
            onClick={() =>
              isWalletConnected ? wallet.disconnect() : openModal()
            }
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
            ) : isWalletConnected ? (
              truncateAddress(wallet.accounts[0]?.address)
            ) : (
              <span style={{ marginRight: "0.5rem" }}>Connect&nbsp;Wallet</span>
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
