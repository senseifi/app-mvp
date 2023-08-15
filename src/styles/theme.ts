import { PaletteMode, createTheme } from "@mui/material";
import "@fontsource/work-sans";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";

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
declare module "@mui/material/Radio" {
  interface RadioPropsColorOverrides {
    tertiary: true;
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    tertiary: true;
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
      h1: {
        "@media (max-width: 768px)": {
          fontSize: "4.5rem",
        },
      },
      h2: {
        color: "#FFDB2C",
        fontSize: "2rem",
        fontWeight: 500,
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
              border: `2px solid ${yellow}`,
              "&:hover": {
                color: mode === "light" ? navyBlue : yellow,
                backgroundColor: "rgba(255, 219, 44, 0.2)",
                borderColor: "transparent",
              },
            },
          },
        ],
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            // maxWidth: "300px",
            padding: "1rem 1.2rem",
            "@media (max-width: 600px)": {
              fontSize: "0.875rem",
              padding: "10px",
            },
          },
        },
      },
      // MuiRadio: {
      //   styleOverrides: {
      //     checked: {
      //       color: "#f44336",
      //     },
      //   },
      // },
      MuiCssBaseline: {
        styleOverrides: {
          main: {
            // minHeight: "80vh",
            padding: "6rem 10rem 2rem 10rem",
            "@media (max-width: 1200px)": {
              padding: "2rem",
            },
          },
          section: {
            padding: "1rem 7rem 2rem 7rem",
            "@media (max-width: 1200px)": {
              padding: "0 1.5rem 2rem 1.5rem",
            },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          select: {
            padding: "10px 16px",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            "& .Mui-selected": {
              backgroundColor: "rgba(7, 20, 40, 0.16)",
            },
          },
          paper: {
            boxShadow: "0 0 2px 0 black",
            borderRadius: 8,
          },
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow:
              "0px 0px 10px rgba(0, 0, 0, 0.1), inset 0px 0px 10px rgba(0, 0, 0, 0.2)",

            border: "1px solid",
            borderLeft: "15px solid",
            paddingLeft: "16px",
            backgroundColor: "#fff",
            color: navyBlue,
          },
          filledSuccess: {
            borderColor: "#4caf50",
          },
          filledInfo: {
            borderColor: "#2196f3",
          },
          filledWarning: {
            borderColor: "#ff9800",
          },
          filledError: {
            borderColor: "#f44336",
          },
        },
      },
    },
  });

export default createAppTheme;
