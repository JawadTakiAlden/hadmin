import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router";
import { drawerWidth } from "../../constant";
import { dashboardVarinats } from "../../pagesVariant";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px - 10px)` },
            ml: { md: `${drawerWidth}px` }
          }}
          color="inherit"
          variant="elevation"
        >
          <Toolbar>
            <Header handleDrawerToggle={handleDrawerToggle} />
          </Toolbar>
        </AppBar> */}
      <DashboardSidebar
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        handleDrawerClose={handleDrawerClose}
        mobileOpen={mobileOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // py: 6,
          px: 3,
          position: "relative",
          maxWidth: "100%",
          width: { md: `calc(100% - ${drawerWidth}px - 5px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
