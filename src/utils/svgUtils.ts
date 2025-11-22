/**
 * Utility function to convert hex color to CSS filter for SVG color changes
 * This is a fallback method when direct SVG manipulation isn't possible
 */
export function hexToFilter(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate filter values
  // This is an approximation - CSS filters can't perfectly match all colors
  // For white (#FFFFFF), we use brightness and invert filters
  if (
    hexColor.toUpperCase() === "#FFFFFF" ||
    hexColor.toUpperCase() === "#FFF"
  ) {
    return "brightness(0) invert(1)";
  }

  // For black (#000000), we use brightness filter
  if (
    hexColor.toUpperCase() === "#000000" ||
    hexColor.toUpperCase() === "#000"
  ) {
    return "brightness(0)";
  }

  // For other colors, this is a simplified approximation
  // A more accurate method would require complex calculations
  const brightness = (r + g + b) / 765; // Normalize to 0-1
  return `brightness(${brightness}) saturate(1.5)`;
}
