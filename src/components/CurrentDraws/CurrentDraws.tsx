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
} from "@mui/material";
import React from "react";
import seiCoin from "../../assets/sei-coin.png";
import Image from "next/image";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Draw } from "@/types/customTypes";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const ITEM_HEIGHT = 48;

const CurrentDraws = ({
  draw,
  notActive = false,
  // open,
  // setOpen,
  onEnterNowClick,
  onWithdrawClick,
}: {
  draw?: Draw;
  notActive?: boolean;
  // open: boolean;
  // setOpen: Function;
  onEnterNowClick: Function;
  onWithdrawClick: Function;
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

  if (!notActive) {
    return (
      <>
        <Box
          justifyContent="center"
          p={3}
          mx={isSmallScreen ? "auto" : 2}
          my={2}
          border="2px solid"
          borderRadius={3}
          borderColor={theme.palette.secondary.main}
        >
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
                variant="yellowBorder"
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
                variant="yellowFill"
                size="small"
                fullWidth
                sx={{ fontSize: "0.875rem" }}
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
                <MoreVertIcon />
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
                    width: "20ch",
                    border: "2px solid",
                    borderColor: theme.palette.tertiary.main,
                    borderRadius: 10,
                  },
                }}
              >
                <MenuItem
                  onClick={() =>
                    onWithdrawClick(draw === undefined ? "" : draw.id)
                  }
                >
                  Withdraw
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
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
