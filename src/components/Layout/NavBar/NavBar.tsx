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
import {
  AccountBalanceWallet,
  Menu,
  SwapCalls,
  MultipleStop,
} from "@mui/icons-material";
import { useProSidebar } from "react-pro-sidebar";

import { chainName } from "@/config/sei";
import { truncateAddress } from "@/utils";
import WormholeIcon from "@/components/WormholeIcon/WormholeIcon";

// import { WalletSelectModal } from "@/components/SeiWallet";
import useSelectWallet from "@/hooks/useSelectWallet";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { getTransfers } from "@/config/metaportConfig";
import buildMetaport from "@/config/build_metaport";
import TokenOptions from "@/components/TokenOption";

const NavBar = () => {
  const [token, setToken] = useState<string>("");
  const [metaport, setMetaport] = useState();
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<"staging" | "mainnet">(
    "staging"
  );

  async function loadMetaport() {
    const Metaport = (await import("@skalenetwork/metaport")).Metaport;
    setMetaport(
      new Metaport({
        openOnLoad: true,
        skaleNetwork: "staging",
        chains: ["mainnet"],
        tokens: { mainnet: { eth: {} } },
      })
    );
  }

  useEffect(() => {
    loadMetaport();
  }, []);

  useEffect(() => {
    if (metaport) {
      console.log("metaport widget initialized");
    }
  }, [metaport]);

  const theme: Theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { toggleSidebar } = useProSidebar();
  const router = useRouter();

  return (
    <>
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
        {/* {token.length === 0 && (
          <TokenOptions
            token={{
              image: "",
              symbol: "",
              nft: undefined,
            }}
            {...{ setToken }}
          />
        )} */}
        {isSmallScreen ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color={theme.palette.mode === "light" ? "primary" : "secondary"}
              onClick={() => toggleSidebar()}
            >
              <Menu />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
            <Button
              variant="outlined"
              startIcon={<MultipleStop />}
              sx={{
                textTransform: "initial",
                fontWeight: "normal",
                color: "white",
                border: "1px solid white",
              }}
            >
              Swap
            </Button>
            <ConnectKitButton />
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavBar;
