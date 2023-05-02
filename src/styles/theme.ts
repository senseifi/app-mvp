import { PaletteMode, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: {
      main: string;
    };
  }
  interface PaletteOptions {
    tertiary?: {
      main?: string;
    };
  }

  interface TypographyVariants {
    yellowText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    yellowText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    yellowText: true;
  }
}

// Update the Buttons's variant prop options
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    yellowBorder: true;
    yellowFill: true;
  }
}

const radius: number = 10;
const yellow: string = "#FFDB2C";
const navyBlue: string = "#071428";

const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#FFFFFF",
            },
            secondary: {
              main: navyBlue,
            },
            tertiary: {
              main: yellow,
            },
            text: {
              primary: navyBlue,
              secondary: "#FFDB2C",
            },
            background: {
              default: "#FFFFFF",
            },
            divider: navyBlue,
          }
        : {
            primary: {
              main: navyBlue,
            },
            secondary: {
              main: "#FFFFFF",
            },
            tertiary: {
              main: yellow,
            },
            text: {
              primary: "#FFFFFF",
              secondary: "#FFDB2C",
            },
            background: {
              default: navyBlue,
            },
            divider: "#FFFFFF",
          }),
    },

    typography: {
      fontFamily: "Work Sans, sans-serif",
      yellowText: {
        color: "#FFDB2C",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radius,
            fontWeight: 600,
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            height: "100%",
          },
        },
        variants: [
          {
            props: { variant: "yellowBorder" },
            style: {
              textTransform: "uppercase",
              border: `2px solid ${yellow}`,
              backgroundColor: "transparent",
              "&:hover": {
                color: mode === "light" ? navyBlue : yellow,
                borderColor: "transparent",
                backgroundColor: "rgba(255, 219, 44, 0.2)",
              },
            },
          },
          {
            props: { variant: "yellowFill" },
            style: {
              textTransform: "uppercase",
              backgroundColor: yellow,
              color: navyBlue,

              "&:hover": {
                color: mode === "light" ? navyBlue : yellow,
                backgroundColor: "rgba(255, 219, 44, 0.2)",
              },
            },
          },
        ],
      },
    },
  });

export default createAppTheme;
