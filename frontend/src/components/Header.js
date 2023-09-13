import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ahmed from "../assets/ahmed.png";
import { useSelector } from "react-redux";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const { items } = useSelector((state) => state.items);

  const pages = [
    { title: "User", link: "/user" },
    { title: "Products", link: "/products" },
    { title: "Invoices", link: "/invoices" },
    {
      title: (
        <Badge
          overlap="circular"
          badgeContent={items?.length}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              right: -10,
              top: 3,
            },
          }}
        >
          My Invoice
        </Badge>
      ),
      link: "/my-invoice",
    },
  ];
  return (
    <AppBar
      position="absolute"
      sx={{
        boxShadow: 0,
        background: "transparent",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "150px",
            padding: "0 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={"/"}>
              <img src={ahmed} alt="MzAhmed" className="sign-logo" />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                sx={{ fontSize: "32px", color: "black", paddingTop: "5vh" }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {page.title}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              justifyContent: "flex-start",
              alignItems: "center",
              height: "120px",
            }}
          >
            {pages.map((page, index) => (
              <Link
                to={page.link}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    margin: "0 15px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
