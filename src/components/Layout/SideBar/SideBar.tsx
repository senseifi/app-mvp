import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  menuClasses,
  sidebarClasses,
} from "react-pro-sidebar";

import { useTheme, Theme, makeStyles } from "@mui/material/styles";

import Link from "next/link";
import {
  AccountBalanceWallet,
  ChevronLeft,
  ChevronRight,
  EmojiEvents,
  Error,
  Home,
  IntegrationInstructions,
  WaterDrop,
} from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";

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

  //router location to Title Case
  function pathName() {
    return location.pathname
      .substring(1)
      .replace("-", " ")
      .split(" ")
      .map(function (word: string) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }

  return (
    <Box
      onMouseEnter={() => collapseSidebar(false)}
      onMouseLeave={() => collapseSidebar(true)}
      sx={{ display: "flex", position: "sticky", top: "0px" }}
      //className="flex md:h-screen md:sticky md:top-0 md:left-0 text-left uppercase"
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
        <Link href="home">
          {/* <Savvio
            className="mt-5 ml-3  block  h-[64px]"
            style={{ fill: "#2F3130" }}
          /> */}
        </Link>
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
              padding: `${isSmallScreen ? "0 1rem" : ""}`,
            },

            marginTop: "1rem",
          }}
        >
          <MenuItem
            icon={<Home />}
            // component={<Link href="portfolio" />}
            // eslint-disable-next-line
          >
            Portfolio
          </MenuItem>
          <MenuItem
            icon={<AccountBalanceWallet />}
            // component={<Link to="smart-savings" />}
            // eslint-disable-next-line
          >
            Smart Savings
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
