import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import theme from "@/styles/theme";

import telegram from "@/assets/social/telegram.png";
import twitter from "@/assets/social/twitter.png";
import discord from "@/assets/social/discord.png";
import { Box, Link, Theme, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";

const Footer = () => {
  const theme: Theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "row",
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        p: 1,
      }}
    >
      <DarkModeToggle />
      <Typography
        paragraph
        gutterBottom
        sx={{ textAlign: "center", width: "100%" }}
      >
        Copyright &copy; SenSei Fi, {new Date().getFullYear()}.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mx: 2, my: "auto" }}>
        <Link
          href="https://t.me/SenSeiFi"
          target="_blank"
          sx={{ width: 30, ":hover": { opacity: 0.5 } }}
        >
          <Image src={telegram} alt="Telegram link" />
        </Link>
        <Link
          href="https://twitter.com/SenSei_DeFi"
          target="_blank"
          sx={{ width: 30, ":hover": { opacity: 0.5 } }}
        >
          <Image src={twitter} alt="Twitter link" />
        </Link>
        <Link
          href="https://discord.gg/b6h3paCYy4"
          target="_blank"
          sx={{ width: 30, ":hover": { opacity: 0.5 } }}
        >
          <Image src={discord} alt="Discord link" />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
