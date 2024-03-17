import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { headerContainerStyles, headerTitleStyles } from "./styles";
const Header = () => {
  return (
    <Box sx={headerContainerStyles}>
      <header>
        <Link to="/">
          <Typography variant="h1" gutterBottom sx={headerTitleStyles}>
            POKEMON APP
          </Typography>
        </Link>
      </header>
    </Box>
  );
};

export default Header;
