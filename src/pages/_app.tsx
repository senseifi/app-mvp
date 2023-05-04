import "@/styles/globals.css";
import "@fontsource/work-sans/variable.css";
import "@fontsource/work-sans/400.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { ColorModeContext } from "@/components/DarkModeToggle";
import createAppTheme from "@/styles/theme";
import { PaletteMode } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: toggleMode,
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
