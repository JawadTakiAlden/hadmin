import { EmojiObjectsOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const MotionBox = motion(Box);

const CustomLoader = () => {
  const theme = useTheme();
  return (
    <MotionBox
      sx={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderLeft: `20px solid ${theme.palette.primary.light}`,
        borderRight: `20px solid ${theme.palette.primary.dark}`,
        position: "relative",
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
        ease: "linear",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex : -1
        }}
        component={motion.div}
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
      >
        <Typography color={"error.main"}>HOG</Typography>
        <EmojiObjectsOutlined
          sx={{
            fontSize: "100px",
            color: "warning.main",
          }}
        />
        <Typography variant="caption">loading...</Typography>
      </Box>
    </MotionBox>
  );
};

export default CustomLoader;
