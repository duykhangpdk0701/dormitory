import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";

import StyledEngineProvider from "@mui/material/StyledEngineProvider";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

interface IThemeProviderWrapper {
  children?: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = (props) => {
  // const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const curThemeName = "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    // localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
