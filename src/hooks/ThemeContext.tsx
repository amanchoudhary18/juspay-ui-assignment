import { createContext } from "react";
import type { ThemeMode, ColorKey } from "../utils/colors";

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  getColor: (key: ColorKey) => string;
  getThemeColor: (color: string) => string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
