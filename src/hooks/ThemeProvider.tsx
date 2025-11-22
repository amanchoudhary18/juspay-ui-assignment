import React, { useState, useCallback } from "react";
import { getColor as baseGetColor } from "../utils/colors";
import type { ThemeMode, ColorKey } from "../utils/colors";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const getColor = useCallback(
    (key: ColorKey) => baseGetColor(key, theme),
    [theme]
  );

  const getThemeColor = useCallback(
    (color: string): string => {
      if (!color) return color;

      const lowerColor = color.toLowerCase();

      if (lowerColor.startsWith("#1c1c1c")) {
        if (theme === "dark") {
          const opacity = lowerColor.substring(7) || "";
          return opacity ? `#ffffff${opacity}` : "#ffffff";
        }
        return color;
      }

      return color;
    },
    [theme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        getColor,
        getThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
