import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import theme from "@/styles/theme";

import telegram from "@/assets/social/telegram.png";
import twitter from "@/assets/social/twitter.png";
import discord from "@/assets/social/discord.png";
import {
  Box,
  Theme,
  Link as LinkMUI,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  const theme: Theme = useTheme();
  const socialIconsStyle = {
    width: 30,
    opacity: 0.7,
    filter: theme.palette.mode === "light" ? "" : "invert()",
    ":hover": { opacity: 0.5 },
  };

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return !isSmallScreen ? (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        p: 1,
      }}
    >
      <DarkModeToggle />
      <Box sx={{ textAlign: "center", width: "100%", mb: 1 }}>
        <Typography>
          Copyright &copy; SenSei Fi, {new Date().getFullYear()}.
        </Typography>
        <Link
          href="/tnc"
          style={{
            opacity: 0.4,
            color: theme.palette.mode === "dark" ? "#FFF" : "#000",
          }}
        >
          Terms & Conditions
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mx: 2,
          my: "auto",
          "& img": {
            width: 30,
            height: 30,
          },
        }}
      >
        <LinkMUI
          href="https://t.me/SenSeiFi"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={telegram} alt="Telegram link" />
        </LinkMUI>
        <LinkMUI
          href="https://twitter.com/SenSei_DeFi"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={twitter} alt="Twitter link" />
        </LinkMUI>
        <LinkMUI
          href="https://discord.gg/b6h3paCYy4"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={discord} alt="Discord link" />
        </LinkMUI>
      </Box>
    </Box>
  ) : (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mx: "auto",
          mb: 2,

          "& img": {
            width: 30,
            height: 30,
          },
        }}
      >
        <LinkMUI
          href="https://t.me/SenSeiFi"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={telegram} alt="Telegram link" />
        </LinkMUI>
        <LinkMUI
          href="https://twitter.com/SenSei_DeFi"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={twitter} alt="Twitter link" />
        </LinkMUI>
        <LinkMUI
          href="https://discord.gg/b6h3paCYy4"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={discord} alt="Discord link" />
        </LinkMUI>
      </Box>
      <Box sx={{ textAlign: "center", width: "100%", mb: 1 }}>
        <Typography>
          Copyright &copy; SenSei Fi, {new Date().getFullYear()}.
        </Typography>
        <Link
          href="/tnc"
          style={{
            opacity: 0.4,
            color: theme.palette.mode === "dark" ? "#FFF" : "#000",
          }}
        >
          Terms & Conditions
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
