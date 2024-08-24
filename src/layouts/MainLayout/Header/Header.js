import React from "react";
import { Box, useTheme, IconButton, Select, MenuItem } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { SET_DIRECTION } from "../../../store/slices/customization/customization";
import { useTranslation } from "react-i18next";
const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  return (
    <Box
      sx={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        // pl: 5,
        // pr: 2,
        boxShadow: (theme) => `0 1px 15px -5px ${theme.palette.grey[500]}`,
        borderRadius: "12px",
        px: 2,
        mb: 2,
        mt: "10px",
        // backgroundColor: theme.palette.common.white,
      }}
    >
      <Box>
        <IconButton
          sx={{
            display: { md: "none" },
          }}
          onClick={() => handleDrawerToggle()}
        >
          <MenuOpen />
        </IconButton>
      </Box>
      <Select
        sx={{
          borderRadius: "30px",
          width: "100px",
          height: "40px",
        }}
        value={i18n.language}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
          const dir = e.target.value === "en" ? "ltr" : "rtl";
          dispatch(SET_DIRECTION(dir));
          document.dir = dir;
        }}
      >
        <MenuItem value={"ar"}>
          {i18n.language === "en" ? "Ar" : "عربي"}
        </MenuItem>
        <MenuItem value={"en"}>En</MenuItem>
      </Select>
    </Box>
  );
};

export default Header;
