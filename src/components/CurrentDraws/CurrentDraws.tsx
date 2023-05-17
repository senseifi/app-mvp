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
  Chip,
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
import { calculateTickets, nsToSecs, toAU } from "@/utils";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/sei";
import { SenseifiStakingNllQueryClient } from "@/contract_clients/SenseifiStakingNll.client";
import { gameDurationSecs, seiStakingNLLContract } from "@/config/contracts";
import Loader from "../Loader/Loader";

const ITEM_HEIGHT = 48;

const CurrentDraws = ({
  draw,
  notActive = false,
  // open,
  // setOpen,
  onEnterNowClick,
  onWithdrawClick,
  onCheckDrawClick,
  onClaimWithdrawalClick,
  showNotif,
}: {
  draw?: Draw;
  notActive?: boolean;
  // open: boolean;
  // setOpen: Function;
  onEnterNowClick: Function;
  onWithdrawClick: Function;
  onCheckDrawClick: Function;
  onClaimWithdrawalClick: Function;
  showNotif: Function;
}) => {
  const chain = useChain(chainName);

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
  const [isLoading, setIsLoading] = useState(false);

  //After clicking withdraw, once the amount is available
  const [claimAvailable, setClaimAvailable] = useState(false);

  const [stats, setStats] = useState<{
    totalDeposit: string;
    totalTickets: string;
    numDepositors: string;
    userDeposit: undefined | string;
    userTickets: undefined | string;
  }>({
    totalDeposit: "",
    totalTickets: "",
    numDepositors: "",
    userDeposit: undefined,
    userTickets: undefined,
  });

  const fetchStats = async () => {
    try {
      setIsLoading(true);

      const client = await chain.getCosmWasmClient();

      const contract = new SenseifiStakingNllQueryClient(
        client,
        seiStakingNLLContract
      );

      const [params, globalState] = await Promise.all([
        contract.getParams(),
        contract.getGlobalState(),
      ]);

      const totalTickets = BigInt(globalState.total_tickets);
      const totalStake = BigInt(globalState.total_stake);
      const numDepositors = globalState.num_stakers;
      const lastUpdateTime = BigInt(nsToSecs(globalState.last_update_time));
      const gameStartTime = BigInt(nsToSecs(globalState.game_start_time));
      const currentTime = BigInt(Math.floor(Date.now() / 1000));

      const newTotalTickets = calculateTickets(
        totalTickets,
        totalStake,
        lastUpdateTime,
        gameStartTime,
        gameStartTime + BigInt(gameDurationSecs)
      );

      let newUserTickets: BigInt | undefined = undefined;
      let userStake: BigInt | undefined = undefined;

      if (chain.address) {
        const userState = await contract.getUserState({ user: chain.address });

        const totalTickets = BigInt(userState.total_tickets);
        const totalStake = BigInt(userState.total_stake);
        const lastUpdateTime = BigInt(nsToSecs(userState.last_update_time));

        userStake = totalStake;
        newUserTickets = calculateTickets(
          totalTickets,
          totalStake,
          lastUpdateTime,
          gameStartTime,
          gameStartTime + BigInt(gameDurationSecs)
        );
      }

      setStats({
        totalDeposit: totalStake.toString(),
        totalTickets: newTotalTickets.toString(),
        numDepositors: numDepositors,
        userDeposit: userStake?.toString(),
        userTickets: newUserTickets?.toString(),
      });

      setShowDetails(true);
    } catch (e) {
      let errorMsg = "";
      if (typeof e === "string") {
        errorMsg = e.toUpperCase();
      } else if (e instanceof Error) {
        errorMsg = e.message;
      }

      showNotif(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

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
          overflow={"hidden"}
        >
          {isLoading && <Loader />}
          {draw?.active ? (
            <Box textAlign="end" height={10} position="absolute" right={0}>
              <IconButton
                aria-label="more"
                color="secondary"
                sx={{ p: 0.5 }}
                onClick={fetchStats}
              >
                <Info />
              </IconButton>
            </Box>
          ) : null}
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
                  <Typography>No. of Depositors:</Typography>
                  <Typography>{stats.numDepositors}</Typography>
                </Grid>
                <Grid {...gameDetailsGridProps}>
                  <Typography>Total Deposit:</Typography>
                  <Typography>
                    {Intl.NumberFormat("en-US").format(
                      toAU(stats.totalDeposit)
                    )}{" "}
                    Sei
                  </Typography>
                </Grid>
                <Grid {...gameDetailsGridProps}>
                  <Typography>Total Tickets:</Typography>
                  <Typography>
                    {Intl.NumberFormat("en-US").format(
                      toAU(stats.totalTickets)
                    )}
                  </Typography>
                </Grid>
                <Grid {...gameDetailsGridProps} mt={3}>
                  <Typography fontWeight="bold">Your Deposit:</Typography>
                  <Typography fontWeight="bold">
                    {stats.userDeposit !== undefined
                      ? Intl.NumberFormat("en-US").format(
                          toAU(stats.userDeposit)
                        )
                      : "-"}{" "}
                    Sei
                  </Typography>
                </Grid>
                <Grid {...gameDetailsGridProps}>
                  <Typography fontWeight="bold">Your Tickets:</Typography>
                  <Typography fontWeight="bold">
                    {stats.userTickets !== undefined
                      ? Intl.NumberFormat("en-US").format(
                          toAU(stats.userTickets)
                        )
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          <Box p={3}>
            <Box
              textAlign="end"
              height={10}
              position="absolute"
              left={0}
              top={0}
            >
              <Chip label={" Round " + draw?.id} sx={{ m: 1 }} />
            </Box>
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
                {draw === undefined ? "" : toAU(draw.prize)}
              </Typography>
            </Grid>
            {draw?.totDeposit !== undefined ? (
              <Grid container px={3} justifyContent="center">
                <Typography>Total Deposits:&nbsp;</Typography>
                <Typography fontWeight="bold" mb={2}>
                  {toAU(draw.totDeposit)}
                </Typography>
              </Grid>
            ) : (
              <Grid container px={3} justifyContent="center">
                <Typography>&nbsp;</Typography>
                <Typography fontWeight="bold" mb={2}>
                  &nbsp;
                </Typography>
              </Grid>
            )}
            <FlipClockCountdown
              to={draw?.endTime !== undefined ? draw.endTime * 1000 : 0}
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
            <Grid container spacing={1} marginTop={2} justifyContent="center">
              {draw?.active ? (
                <Grid item xs={10} md={10}>
                  <Button
                    variant="yellowFill"
                    size="small"
                    fullWidth
                    sx={{ fontSize: "0.875rem" }}
                    onClick={() => onEnterNowClick()}
                  >
                    Enter
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={10} md={10}>
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
              )}
              {draw?.active && (
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
                    <MenuItem onClick={() => onWithdrawClick()}>
                      Withdraw
                    </MenuItem>
                    <MenuItem onClick={() => onClaimWithdrawalClick()}>
                      Claim withdrawal
                    </MenuItem>
                  </Menu>
                </Grid>
              )}
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
