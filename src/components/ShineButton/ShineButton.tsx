import { Theme, styled, useTheme } from "@mui/material";

const ShineButton = styled("p")(({ theme }) => ({
  color: "#fff",
  background: `linear-gradient(to right, ${theme.palette.tertiary.main} 0, #c3ff4c 10%, ${theme.palette.tertiary.main} 20%)`,
  backgroundPosition: 0,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "shine 3s infinite linear",
  animationFillMode: "forwards",
  WebkitTextSizeAdjust: "none",
  //   textShadow: ` 1px 1px 0 ${theme.palette.secondary.main}`,
  fontWeight: "bold",
  fontSize: 50,
  textDecoration: "none",
  lineHeight: 1,
  margin: 0,
  whiteSpace: "nowrap",

  "@keyframes shine": {
    "0%": {
      backgroundPosition: 0,
    },
    "60%": {
      backgroundPosition: "400px",
    },
    "100%": {
      backgroundPosition: "20px",
    },
  },
}));

export default ShineButton;
