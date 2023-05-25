import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import React from "react";

const formatNumber = (value: number) =>
  Intl.NumberFormat("en-US").format(value);

const renderBody = (value: number | string, isSmallScreen: Boolean) => (
  <Typography
    sx={{
      px: typeof value === "number" ? 1 : 0,
      fontSize:
        typeof value === "number"
          ? isSmallScreen
            ? 20
            : 24
          : isSmallScreen
          ? 14
          : 16,
      fontWeight: typeof value === "number" ? 500 : 600,
      color: typeof value === "number" ? "gray" : "",
    }}
  >
    {typeof value === "number" ? formatNumber(value) : value}
  </Typography>
);

const PoolText = ({
  header,
  body,
  large,
  body2,
  body3,
  body4,
}: {
  header: string;
  body: string | number;
  body2?: string | number;
  body3?: string | number;
  body4?: string | number;
  large?: Boolean;
}) => {
  const theme: Theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  if (large) {
    return (
      <Box sx={{ mt: isSmallScreen ? 2 : 3 }}>
        <Typography
          sx={{
            fontSize: 16,
            px: 1,
            py: isSmallScreen ? 0 : 1,
            width: "max-content",
            borderRadius: 1.5,
          }}
        >
          {header}
        </Typography>
        <Box display="flex" alignItems="baseline">
          {renderBody(body, isSmallScreen)}

          {body2 !== undefined && renderBody(body2, isSmallScreen)}
          {body3 !== undefined && renderBody(",", isSmallScreen)}
          {body3 !== undefined && renderBody(body3, isSmallScreen)}
          {body4 !== undefined && renderBody(body4, isSmallScreen)}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ ml: 1 }}>
        <Typography
          sx={{
            color:
              theme.palette.mode === "light"
                ? "#071428"
                : theme.palette.tertiary.main,
            fontWeight: 600,
            fontSize: isSmallScreen ? 12 : 14,

            width: "max-content",
            borderBottom: theme.palette.mode === "light" ? 2 : 1,
            borderColor: theme.palette.tertiary.main,
          }}
        >
          {header}
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? 14 : 20 }}>
          {body}
        </Typography>
      </Box>
    );
  }
};

export default PoolText;
