import { Box } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import SideBar from "./SideBar/SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
      <ProSidebarProvider>
        {" "}
        <NavBar />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <SideBar />

          {children}
        </Box>
      </ProSidebarProvider>
      <Footer />
    </Box>
  );
};

export default Layout;
