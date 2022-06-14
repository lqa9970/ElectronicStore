import { useState, useContext } from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

import { ThemeContext } from "../../context/theme-context";
import { Theme } from "../../types";

import "./theme.scss";

const ThemeTab = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { switchTheme } = useContext(ThemeContext);

  return (
    <>
      <IconButton
        aria-label="choose-theme"
        size="large"
        onClick={() => setIsDrawerOpen(true)}
      >
        <PaletteIcon color="primary" fontSize="inherit" />
      </IconButton>
      <Drawer
        className="themeTab"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          className="themeTab"
          p={2}
          width="250px"
          textAlign="center"
          role="presentation"
        >
          <Typography variant="h6" component="div">
            Theme Tab
          </Typography>
          <div className="themeTab__content">
            <button
              className="themeTab__content__dark"
              onClick={() => switchTheme(Theme.Dark)}
            >
              Dark
            </button>
            <button
              className="themeTab__content__light"
              onClick={() => switchTheme(Theme.Light)}
            >
              Light
            </button>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default ThemeTab;
