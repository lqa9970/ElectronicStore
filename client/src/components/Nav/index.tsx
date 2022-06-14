import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Divider, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ThemeTab from "../ThemeTab";
// import FavoriteTab from '../FavoriteTab'
import CartTab from "../CartTab";

import "./Nav.scss";
import { ThemeContext } from "../../context/theme-context";

const Nav = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="nav__content">
      <div className="nav__content__left">
        <ThemeTab />
      </div>
      <Link to="/product" style={{ textDecoration: "none" }}>
        <div className={`nav__content__mid nav__content__mid__${theme}`}>
          Verkkokauppa
        </div>
      </Link>
      <div className="nav__content__right">
        <Link to="/user">
          <IconButton aria-label="choose-theme" size="large">
            <PersonIcon color="primary" fontSize="inherit" />
          </IconButton>
        </Link>
        <Link to="/cart">
          <IconButton aria-label="choose-theme" size="large">
            <ShoppingCartIcon color="primary" fontSize="inherit" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
