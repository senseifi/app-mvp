import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";

import { useTheme, Theme } from "@mui/material/styles";

import Link from "next/link";
import {
  AccountBalanceWallet,
  EmojiEvents,
  Error,
  Home,
  IntegrationInstructions,
  WaterDrop,
} from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const SideBar = () => {
  const theme: Theme = useTheme();
  const themePalette = theme.palette;
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const {
    toggled,
    toggleSidebar,
    collapseSidebar,

    //@ts-ignore
    defaultCollapsed,
    collapsed,
  } = useProSidebar();

  const router = useRouter();

  return (
    <Box
      onMouseEnter={() => collapseSidebar(false)}
      onMouseLeave={() => collapseSidebar(true)}
      sx={{ display: "flex", position: "sticky", top: "0px" }}
    >
      <Sidebar
        defaultCollapsed
        breakPoint="sm"
        // @ts-ignore
        rootStyles={
          isSmallScreen
            ? {
                position: "absolute !important",
                borderColor: themePalette.secondary.main,
                [`.${sidebarClasses.container}`]: {
                  backgroundColor: themePalette.primary.main,
                  width: `${toggled ? "280px" : "-100px"}`,
                },
                // [`.${sidebarClasses.broken} .${sidebarClasses.collapsed}`]: {
                //   left: "250px !important",
                // },
                // marginTop: "5rem",
              }
            : {
                borderColor: themePalette.secondary.main,
                [`.${sidebarClasses.container}`]: {
                  backgroundColor: themePalette.primary.main,
                  padding: "0px 10px",
                },

                width: "280px",
                minWidth: "104px !important",
              }
        }
      >
        <Menu
          rootStyles={{
            [`.${menuClasses.button}`]: {
              color: themePalette.secondary.main,
              margin: "8px 0px",
              borderRadius: "10px",
              "&:hover": {
                color: themePalette.primary.main,
                backgroundColor: themePalette.secondary.main,
                boxShadow: "2px 4px 20px #0000001A",
              },
            },
            [`.${menuClasses.menuItemRoot}`]: {
              margin: `${isSmallScreen ? "0 1rem" : ""}`,
            },

            marginTop: "1rem",
          }}
        >
          <MenuItem
            icon={<Home />}
            component={<Link href="/home" />}
            rootStyles={
              router.pathname == "/home"
                ? {
                    borderRadius: "10px",
                    backgroundColor: themePalette.secondary.main,
                    "& span": {
                      color: themePalette.primary.main,
                    },
                  }
                : {}
            }
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<AccountBalanceWallet />}
            component={<Link href="/portfolio" />}
            rootStyles={
              router.pathname == "/portfolio"
                ? {
                    borderRadius: "10px",
                    backgroundColor: themePalette.secondary.main,
                    "& span": {
                      color: themePalette.primary.main,
                    },
                  }
                : {}
            }
          >
            Portfolio
          </MenuItem>
          <MenuItem
            icon={<WaterDrop />}
            // component={<Link to="liquidity" />}
            // eslint-disable-next-line
          >
            Liquidity
          </MenuItem>
          <MenuItem
            icon={<EmojiEvents />}
            //component={<Link to="rewards" />}
            // eslint-disable-next-line
          >
            Rewards
          </MenuItem>
          <MenuItem
            icon={<IntegrationInstructions />}
            //component={<Link to="developers" />}
            // eslint-disable-next-line
          >
            Developers
          </MenuItem>
          <MenuItem
            icon={<Error />}
            //component={<Link to="help" />}
            // eslint-disable-next-line
          >
            Help
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
