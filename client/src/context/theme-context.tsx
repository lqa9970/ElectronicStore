import React, { useState, createContext } from "react";

import { Theme, ThemeContextType } from "../types";

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Light,
  switchTheme: () => {},
});
const ThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
