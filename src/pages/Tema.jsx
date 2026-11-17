
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const COLOR_THEMES = {
  orange: {
    name: "Oranye",
    primary: "#ea580c",
    hover: "#c2410c",
    soft: "#ffedd5",
  },
  sage: {
  name: "Sage",
  primary: "#7c9a82",
  hover: "#5f7e66",
  soft: "#e4ece5",
},
  pink: {
  name: "Pink Soft",
  primary: "#E8A0B5",
  hover: "#D6819B",
  soft: "#FCEAF0",
},
  blue: {
  name: "Biru Soft",
  primary: "#619acb",
  hover: "#6D9FCB",
  soft: "#E8F3FC",
},
  purple: {
  name: "Ungu Soft",
  primary: "#A78BCE",
  hover: "#8B6BB3",
  soft: "#F0E8F8",
},

};

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("rh_dark_mode") === "true";
  });

  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem("rh_accent_color");
    return COLOR_THEMES[saved] ? saved : "orange";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);

    localStorage.setItem("rh_dark_mode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    const theme = COLOR_THEMES[accentColor];

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-hover", theme.hover);
    root.style.setProperty("--primary-soft", theme.soft);

    localStorage.setItem("rh_accent_color", accentColor);
  }, [accentColor]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme harus digunakan di dalam ThemeProvider");
  }

  return context;
}
