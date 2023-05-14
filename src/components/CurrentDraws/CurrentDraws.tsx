import {
  Box,
  Button,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import React, { CSSProperties, useState } from "react";
import seiCoin from "../../assets/sei-coin.png";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Draw } from "@/types/customTypes";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { Info, Person, Undo } from "@mui/icons-material";
import { gameDetailsGridProps } from "@/constants/modals";

const ITEM_HEIGHT = 48;

const CurrentDraws = ({
  draw,
  notActive = false,
  // open,
  // setOpen,
  onEnterNowClick,
  onWithdrawClick,
  onCheckDrawClick,
}: {
  draw?: Draw;
  notActive?: boolean;
  // open: boolean;
  // setOpen: Function;
  onEnterNowClick: Function;
  onWithdrawClick: Function;
  onCheckDrawClick: Function;
}) => {
  //Withdraw button for compact UI and encouraging people to keep playing

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const theme: Theme = useTheme();

  const [showDetails, setShowDetails] = useState(false);

  //After clicking withdraw, once the amount is available
  const [claimAvailable, setClaimAvailable] = useState(false);

  if (!notActive) {
    return (
      <>
        <Box
          justifyContent="center"
          mx={isSmallScreen ? "auto" : 2}
          my={2}
          border="2px solid"
          borderRadius={3}
          borderColor={theme.palette.secondary.main}
          position={"relative"}
        >
          <Box textAlign="end" height={10} position="absolute" right={0}>
            <IconButton
              aria-label="more"
              color="secondary"
              sx={{ p: 0.5 }}
              onClick={() => setShowDetails(true)}
            >
              <Info />
            </IconButton>
          </Box>
          {showDetails && (
            <Box
              bgcolor={theme.palette.primary.main}
              borderRadius={3}
              sx={{
                position: "absolute",
                zIndex: 999999,
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                textAlign="end"
                borderRadius="10px 10px 0 0"
                sx={{ backgroundColor: theme.palette.tertiary.main }}
              >
                <IconButton
                  aria-label="more"
                  sx={{ p: 0.5, color: "#071428" }}
                  onClick={() => setShowDetails(false)}
                >
                  <Undo />
                </IconButton>
              </Box>
              <Typography
                textAlign="center"
                variant="h5"
                pb={2}
                borderBottom="1px solid"
                sx={{
                  backgroundColor: theme.palette.tertiary.main,
                  color: "#071428",
                }}
              >
                Game Stats
              </Typography>
              <Grid container my={1}>
                <Grid {...gameDetailsGridProps}>
                  <Typography>Total Deposit:</Typography>
                  <Typography>
                    {Intl.NumberFormat("en-US").format(1234)} Sei
                  </Typography>
                </Grid>
                <Grid {...gameDetailsGridProps}>
                  <Typography>Total Tickets:</Typography>
                  <Typography>
                    {Intl.NumberFormat("en-US").format(123456)}
                  </Typography>
                </Grid>
                <Grid {...gameDetailsGridProps} mt={3}>
                  <Typography fontWeight="bold">Your Deposit:</Typography>
                  <Typography fontWeight="bold">
                    {Intl.NumberFormat("en-US").format(123)} Sei
                  </Typography>
                </Grid>
                <Grid {...gameDetailsGridProps}>
                  <Typography fontWeight="bold">Your Tickets:</Typography>
                  <Typography fontWeight="bold">
                    {Intl.NumberFormat("en-US").format(12345)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          <Box p={3}>
            <Image
              alt="coin"
              src={seiCoin}
              width={isSmallScreen ? 100 : 150}
              placeholder="blur"
              style={{ display: "flex", margin: "auto" }}
            />
            <Grid
              container
              bgcolor={theme.palette.secondary.main}
              color={theme.palette.primary.main}
              px={3}
              py={1}
              my={2}
              borderRadius={2}
              justifyContent="center"
            >
              <Typography>Grand Prize:&nbsp;</Typography>
              <Typography fontWeight="bold">
                {draw === undefined ? "" : draw.prize}
              </Typography>
            </Grid>
            <Grid container px={3} justifyContent="center">
              <Typography>Total Deposits:&nbsp;</Typography>
              <Typography fontWeight="bold" mb={2}>
                {draw === undefined ? "" : draw.totDeposit}

                {/* {draw === undefined ? "" : draw.id} */}
              </Typography>
            </Grid>
            <FlipClockCountdown
              to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
              labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
              labelStyle={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                color: theme.palette.secondary.main,
              }}
              digitBlockStyle={{
                width: 20,
                height: 30,
                fontSize: 20,
                color: theme.palette.primary.main,
                background: theme.palette.secondary.main,
              }}
              dividerStyle={{ color: theme.palette.primary.main, height: 1 }}
              separatorStyle={{
                color: theme.palette.secondary.main,
                size: "4px",
              }}
              duration={0.5}
            />
            <Grid container spacing={1} marginTop={2}>
              <Grid item xs={12} md={5}>
                <Button
                  variant="yellowFill"
                  size="small"
                  fullWidth
                  sx={{ fontSize: "0.875rem" }}
                  onClick={() =>
                    onEnterNowClick(draw === undefined ? "" : draw.id)
                  }
                >
                  Enter
                </Button>
              </Grid>
              <Grid item xs={10} md={5}>
                <Button
                  variant="yellowBorder"
                  size="small"
                  fullWidth
                  sx={{ fontSize: "0.875rem" }}
                  onClick={() =>
                    onCheckDrawClick(draw === undefined ? "" : draw.id)
                  }
                >
                  Check&nbsp;Draw
                </Button>
              </Grid>
              <Grid item xs={2} md={2} sx={{ paddingLeft: "0 !important" }}>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openMenu ? "long-menu" : undefined}
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="secondary"
                >
                  {claimAvailable ? (
                    <Badge badgeContent="!" color="tertiary">
                      <MoreVertIcon />
                    </Badge>
                  ) : (
                    <MoreVertIcon />
                  )}
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "max-content",
                      border: "2px solid",
                      borderColor: theme.palette.tertiary.main,
                      borderRadius: 10,
                    },
                  }}
                >
                  {claimAvailable ? (
                    <MenuItem>Claim your withdrawal</MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() =>
                        onWithdrawClick(draw === undefined ? "" : draw.id)
                      }
                    >
                      Withdraw
                    </MenuItem>
                  )}
                </Menu>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }

  //Blank placeholders
  else {
    return (
      <>
        <Box
          justifyContent="center"
          width={300}
          bgcolor={grey[200]}
          p={3}
          mx={isSmallScreen ? "auto" : 2}
          my={2}
          borderRadius={3}
          sx={theme.palette.mode === "dark" ? { opacity: 0.2 } : {}}
        >
          <Box
            width={isSmallScreen ? 100 : 150}
            height={isSmallScreen ? 100 : 150}
            sx={{
              display: "flex",
              margin: "auto",
              bgcolor: grey[300],
              borderRadius: "50%",
            }}
          />
          <Grid
            container
            bgcolor={grey[300]}
            color={theme.palette.primary.main}
            px={3}
            py={1}
            my={2}
            borderRadius={2}
            justifyContent="center"
          >
            <Typography>&nbsp;</Typography>
            <Typography fontWeight="bold">&nbsp;</Typography>
          </Grid>
          <Grid
            container
            px={3}
            justifyContent="center"
            color={theme.palette.mode === "dark" ? grey[700] : grey[500]}
          >
            <Typography>More coming soon!</Typography>
          </Grid>
          <Grid container spacing={1} marginTop={2}>
            <Grid item xs={12} md={6}>
              <Button
                disabled
                size="small"
                fullWidth
                sx={{ bgcolor: grey[300] }}
              >
                &nbsp;
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                disabled
                size="small"
                fullWidth
                sx={{ bgcolor: grey[400] }}
              >
                &nbsp;
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
};

export default CurrentDraws;
