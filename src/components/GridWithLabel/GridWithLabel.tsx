import React, { ReactNode } from "react";
import { Grid, Theme, Typography, useTheme } from "@mui/material";

interface GridWithLabelProps {
  label: string;
  children: ReactNode;
  [key: string]: any; // Allow any other additional props
}

const GridWithLabel: React.FC<GridWithLabelProps> = ({
  label,
  children,
  ...rest
}) => {
  const theme: Theme = useTheme();

  return (
    <div>
      <Grid
        sx={{
          my: 5,
          width: "100%",
          border: 1,
          borderRadius: 3,
          p: 2,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        {...rest}
      >
        <Typography
          variant={theme.palette.mode === "dark" ? "aquaGreenText" : "inherit"}
          sx={{
            position: "absolute",
            top: -12,
            px: 1,
            backgroundColor:
              theme.palette.mode === "dark" ? "primary.main" : "#FFF8D5",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "initial"
                : theme.palette.tertiary.main
            }`,
            borderRadius: 2,
          }}
        >
          {label}
        </Typography>
        {children}
      </Grid>
    </div>
  );
};

export default GridWithLabel;
