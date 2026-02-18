import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled, alpha } from "@mui/material/styles";
import DynamicNavigation from "./DynamicNavigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: theme.spacing(2),
  width: "40%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const iconBtnStyle = {
  backgroundColor: "transparent",
  "&:hover": { backgroundColor: "transparent" },
  "&:active": { backgroundColor: "transparent" },
  "&.Mui-focusVisible": { backgroundColor: "transparent" },
  "& .MuiTouchRipple-root": { display: "none" },
  WebkitTapHighlightColor: "transparent",
};

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: "20px",
          margin: "10px",
          paddingX: 2,
        }}
      >
        <Toolbar>
          <Typography variant="h6">Ecom</Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <DynamicNavigation />
          {/* Hamburger */}

          {/* <IconButton disableRipple disableFocusRipple sx={iconBtnStyle}>
            <MenuIcon />
          </IconButton> */}
          {/* Profile */}

          {/* <IconButton disableRipple disableFocusRipple sx={iconBtnStyle}>
            <AccountCircle />
          </IconButton> */}

        </Toolbar>
      </AppBar>
    </Box>
  );
}