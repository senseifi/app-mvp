import { PaletteMode, createTheme } from "@mui/material";

// Define custom palette options
// interface MyPaletteOptions {
//   tertiary: {
//     main: string;
//   };
// }

// // Augment the PaletteOptions interface
// declare module "@mui/material/styles" {
//   interface PaletteOptions extends MyPaletteOptions {}
// }
const radius: number = 12;

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
              main: "#071428",
            },
            tertiary: {
              main: "#FFDB2C",
            },
            text: {
              primary: "#071428",
              secondary: "#FFDB2C",
            },
            background: {
              default: "#FFFFFF",
            },
            divider: "#071428",
          }
        : {
            primary: {
              main: "#071428",
            },
            secondary: {
              main: "#FFFFFF",
            },
            tertiary: {
              main: "#FFDB2C",
            },
            text: {
              primary: "#FFFFFF",
              secondary: "#FFDB2C",
            },
            background: {
              default: "#071428",
            },
            divider: "#FFFFFF",
          }),
    },

    typography: {
      fontFamily: "Work Sans, sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: radius,
            fontWeight: 600,
          },
        },
      },
    },
  });

export default createAppTheme;
