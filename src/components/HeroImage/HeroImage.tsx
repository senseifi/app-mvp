import { Box, Theme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

import heroImg from "@/assets/hero-animation.gif";
import placeholderImg from "@/assets/placeholder.png";
import Block from "@/assets/blocks.svg";

const HeroImage = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => setIsLoading(true), []);
  const handleImageLoad = () => {
    setIsLoading(false);
    console.log("loaded");
  };
  return (
    <Box sx={{ maxWidth: "400px", mx: "auto", mt: "-7rem", mb: "-4rem" }}>
      <Block />
    </Box>
  );
};

export default HeroImage;
