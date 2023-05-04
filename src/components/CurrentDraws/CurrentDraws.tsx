import {
  Box,
  Button,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import seiCoin from "../../assets/sei-coin.png";
import Image from "next/image";
import { grey } from "@mui/material/colors";

const CurrentDraws = ({ notActive = false }: { notActive?: boolean }) => {
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
            <Typography fontWeight="bold">12,345 Sei</Typography>
          </Grid>
          <Grid container px={3} justifyContent="center">
            <Typography>Total Deposits:&nbsp;</Typography>
            <Typography fontWeight="bold">120,345 Sei</Typography>
          </Grid>
          <Grid container spacing={1} marginTop={2}>
            <Grid item xs={12} md={6}>
              <Button variant="yellowBorder" size="small" fullWidth>
                Deposit
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="yellowFill" size="small" fullWidth>
                Check&nbsp;Draw
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  } else {
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
