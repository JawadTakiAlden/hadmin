import React from "react";
import { Menu, MenuItem, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useMenuItems } from "../../../menu_items";
import GroubItems from "../GroubItems/GroubItems";
import LogoSection from "../LogoSection/LogoSection";
import { Box, Drawer, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SET_MENU_ITEM } from "../../../store/slices/customization/customization";
import { drawerWidth } from "../../../constant";
const DashboardSidebar = ({
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
  window,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id, direction } = useSelector((state) => state.customization);
  const menuitems = useMenuItems();

  const drawer = (
    <Sidebar
      breakPoint="xs"
      rtl={direction === "rtl"}
      width={drawerWidth}
      rootStyles={{
        borderRight: "none !important",
        borderLeft : 'none !important',
        border : 'none !important',
        position: "relative !important",
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "transparent",
        },
      }}
    >
      <LogoSection />
      <Menu
        menuItemStyles={{
          root: {
            backgroundColor : 'transparent'
          },
          subMenuContent: {
            backgroundColor: "transparent",
          },

          button: ({ active, level, isSubmenu, open }) => {
            return {
              // backgroundColor: level === 1 && active ? "#0794EB1A" : "white",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              },
              borderRadius: "10px",
              marginBottom: 4,
              backgroundColor : active ? theme.palette.primary.main : 'transparent' ,
              color:
              (isSubmenu && open) ?theme.palette.primary.main :
                active
                  ? theme.palette.common.white
                  : "grey.500",

              
              textTransform: "capitalize",
            };
          },
        }}
      >
        {menuitems.map((item, i) => {
          return item.type === "group" ? (
            <GroubItems key={i} item={item} />
          ) : (
            <MenuItem
              key={i}
              active={
                (item.id === id && location.pathname === item.path) ||
                location.pathname === item.path
              }
              onClick={() => {
                dispatch(SET_MENU_ITEM(item.id));
              }}
              icon={item.icon}
              component={<Link to={item.path} />}
            >
              {item.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={() => handleDrawerTransitionEnd()}
        onClose={() => handleDrawerClose()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}

        PaperProps={{
          sx: {
            borderRight: "none",
            border : 'none',
            boxShadow: (theme) => `1px 0px 10px -6px ${theme.palette.grey[600]}`,
            backgroundColor : 'transparent',
            backdropFilter : 'blur(15px)',
            height : 'calc(100vh - 20px)',
            marginTop : '10px',
            marginLeft : '5px',
            borderRadius : '20px',
            px : 1
          },
        }}
        sx={{
          display : {md : 'none'}
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        PaperProps={{
          sx: {
            borderRight: "none",
            border : 'none',
            boxShadow: (theme) => `1px 0px 10px -6px ${theme.palette.grey[600]}`,
            backgroundColor : 'transparent',
            backdropFilter : 'blur(15px)',
            height : 'calc(100vh - 20px)',
            marginTop : '10px',
            marginLeft : '5px',
            borderRadius : '20px',
            px : 1
          
          },
        }}
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DashboardSidebar;
