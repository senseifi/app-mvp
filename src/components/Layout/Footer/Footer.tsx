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
import { IconContext } from "react-icons";
import {
  FaDiscord,
  FaTelegramPlane,
  FaTwitter,
  FaMediumM,
} from "react-icons/fa";

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
          Copyright &copy; Savvio, {new Date().getFullYear()}.
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
          svg: {
            fill: "#9e9e9e",
          },
        }}
      >
        {/* <LinkMUI
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
        </LinkMUI> */}
        <IconContext.Provider value={{ size: "30px" }}>
          <a
            href="https://medium.com/@savvio_fi"
            target="_blank"
            rel="noreferrer"
          >
            <FaMediumM />
          </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "30px" }}>
          <a href="https://t.me/Savvio_DeFi" target="_blank" rel="noreferrer">
            <FaTelegramPlane />
          </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "30px" }}>
          <a
            href="https://twitter.com/Savvio_DeFi"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "30px" }}>
          <a
            href="https://discord.gg/xJUE8Bxn"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord />
          </a>
        </IconContext.Provider>
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
          a: {
            color: "white !important",
          },
        }}
      >
        <IconContext.Provider value={{ size: "30px" }}>
          <a
            href="https://medium.com/@savvio_fi"
            target="_blank"
            rel="noreferrer"
          >
            <FaMediumM />
          </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "30px" }}>
          <a href="https://t.me/Savvio_DeFi" target="_blank" rel="noreferrer">
            <FaTelegramPlane />
          </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "30px" }}>
          <a
            href="https://twitter.com/Savvio_DeFi"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
        </IconContext.Provider>
        <IconContext.Provider value={{ size: "30px" }}>
          <a
            href="https://discord.gg/xJUE8Bxn"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord />
          </a>
        </IconContext.Provider>
        {/* <LinkMUI
          href="https://t.me/Savvio_DeFi"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={telegram} alt="Telegram link" />
        </LinkMUI>
      
        <LinkMUI
          href="https://twitter.com/Savvio_DeFi"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={twitter} alt="Twitter link" />
        </LinkMUI>
        <LinkMUI
          href="https://discord.gg/xJUE8Bxn"
          target="_blank"
          sx={socialIconsStyle}
        >
          <Image src={discord} alt="Discord link" />
        </LinkMUI> */}
      </Box>
      <Box sx={{ textAlign: "center", width: "100%", mb: 1 }}>
        <Typography>
          Copyright &copy; Savvio, {new Date().getFullYear()}.
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
