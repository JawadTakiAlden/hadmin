import React from "react";
import {
  Box,
  useTheme,
  IconButton,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { CHANGE_MODE, SET_DIRECTION } from "../../../store/slices/customization/customization";
import { useTranslation } from "react-i18next";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
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
      <Box
        sx={{
          display : 'flex',
          alignItems : 'center',
          gap : '20px'
        }}
      >
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => {
            dispatch(CHANGE_MODE());
          }}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
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
    </Box>
  );
};

export default Header;
