import React from "react";
import {  Box, IconButton } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useProSidebar } from "react-pro-sidebar";
const Topbar = () => {

  const { toggleSidebar, broken, rtl } = useProSidebar();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
  
      </Box>
      <Box display="flex">
  
    
        {broken && rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
