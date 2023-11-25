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

import { WalletSelectModal } from "@/components/SeiWallet";
import useSelectWallet from "@/hooks/useSelectWallet";
import { useRouter } from "next/router";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";

const NavBar = () => {
  const { account, connected, network, wallet } = useWallet();
  const { openModal } = useSelectWallet();

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // useEffect(() => {
  //   setIsWalletConnected(wallet.connectedWallet !== undefined);
  // }, [wallet.connectedWallet]);

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
          background: "#232423",
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
          alt="Savvio Logo"
          src={logoLight}
          style={{
            height: "100%",
            width: "auto",
            cursor: "pointer",
          }}
        />

        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Typography
            variant="aquaGreenText"
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
            Testnet
          </Typography>
          <WalletConnector />
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
