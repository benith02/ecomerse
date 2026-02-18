import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import DynamicNavigation from "./DynamicNavigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: theme.spacing(2),
  width: "40%",
  height: "40px",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Navbar() {
  return (
    <>
      {/* 🔥 FIXED NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#0992C2",
          borderRadius: "30px",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "1200px",
          paddingX: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Ecom
          </Typography>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search products…" />
          </Search>

          {/* Push Navigation to Right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation */}
          <DynamicNavigation />
        </Toolbar>
      </AppBar>

    </>
  );
}
