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
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import SeiChart from "@/components/SeiChart/SeiChart";

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
      sx={{ display: "flex", position: "sticky", top: "0px", zIndex: 998 }}
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
                  overflow: "hidden",
                },

                width: "280px",
                minWidth: "104px !important",
              }
        }
      >
        <Box position="relative" height={isSmallScreen ? "" : "100%"}>
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
              onClick={() => toggleSidebar(false)}
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
              // onClick={() => toggleSidebar(false)}
              icon={<WaterDrop />}
              // component={<Link href={"/liquidity"} />}
              // // rootStyles={
              // //   router.pathname == "/liquidity"
              // //     ? {
              // //         borderRadius: "10px",
              // //         backgroundColor: themePalette.secondary.main,
              // //         "& span": {
              // //           color: themePalette.primary.main,
              // //         },
              // //       }
              // //     : {}
              // // }
            >
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid>Liquidity</Grid>
                <Grid
                  item
                  sx={{
                    fontSize: "10px",
                    px: 1,
                    backgroundColor: "#ffdc2c6e",
                    border: "1px solid #FFDB2C",
                    borderRadius: "5px",
                  }}
                >
                  SOON
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem
              onClick={() => toggleSidebar(false)}
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
              icon={<EmojiEvents />}
              //component={<Link to="rewards" />}
              // eslint-disable-next-line
            >
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>Rewards</Grid>
                <Grid
                  item
                  sx={{
                    fontSize: "10px",
                    px: 1,
                    backgroundColor: "#ffdc2c6e",
                    border: "1px solid #FFDB2C",
                    borderRadius: "5px",
                  }}
                >
                  SOON
                </Grid>
              </Grid>
            </MenuItem>
            {/* <MenuItem
            icon={<IntegrationInstructions />}
            //component={<Link to="developers" />}
            // eslint-disable-next-line
          >
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>Developers</Grid>
              <Grid
                item
                sx={{
                  fontSize: "10px",
                  px: 1,
                  backgroundColor: "#ffdc2c6e",
                  border: "1px solid #FFDB2C",
                  borderRadius: "5px",
                }}
              >
                SOON
              </Grid>
            </Grid>
          </MenuItem> */}
            <MenuItem
              onClick={() => toggleSidebar(false)}
              icon={<Error />}
              component={<Link href="/help" />}
              rootStyles={
                router.pathname == "/help"
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
              Help
            </MenuItem>
          </Menu>

          {isSmallScreen ? (
            <Box
              sx={{
                mt: 10,
                px: 3,
              }}
            >
              <DarkModeToggle />
              {toggled ? (
                <Box
                  sx={{
                    position: "sticky",
                    pl: 1,
                    mt: "2rem",
                  }}
                >
                  <SeiChart />
                </Box>
              ) : null}
            </Box>
          ) : (
            <Box
              sx={{
                position: "absolute",
                left: 5,
                bottom: 10,
                transform: "translateY(-50%)",
              }}
            >
              <SeiChart sidebarIsOpen={collapsed} />
            </Box>
          )}
        </Box>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
