import React from "react";
import Image from "next/image";
import loader from "../../assets/loader.gif";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        backdropFilter: "blur(5px)",
        display: "flex",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 9999999,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image height={100} width={100} src={loader} alt="loading" />
    </Box>
  );
};

export default Loader;
