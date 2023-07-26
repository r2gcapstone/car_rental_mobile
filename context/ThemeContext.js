import React, { createContext, useContext } from "react";
import DefaultTheme from "../constants/Theme"; // Import the default theme

const ThemeContext = createContext(DefaultTheme);

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
