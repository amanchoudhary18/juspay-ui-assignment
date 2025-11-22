export const shared = {
  blue: "#E3F5FF",
  cyan: "#A8C5DA",
  light: "#F7F9FB",

  completed: "#4AA785",
  progress: "#8A8CD9",
  pending: "#59A8D4",
  approved: "#FFC555",
  rejected: "#1C1C1C66",
  black: "#1C1C1C",
  white: "#FFFFFF",
} as const;

export const themeColors = {
  light: {
    background: "#FFFFFF",
    text: "#1C1C1C",
  },
  dark: {
    background: "#1C1C1C",
    text: "#FFFFFF",
    light: "#FFFFFF0D",
  },
} as const;

export const Colors = {
  light: { ...shared, ...themeColors.light },
  dark: { ...shared, ...themeColors.dark },
} as const;

export type ThemeMode = keyof typeof Colors;
export type ColorKey = keyof typeof Colors.light;

export function getColor(key: ColorKey, theme: ThemeMode) {
  return Colors[theme][key];
}
