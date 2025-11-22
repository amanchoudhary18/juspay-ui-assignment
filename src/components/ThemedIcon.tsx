import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import type { ThemeMode } from "../utils/colors";

interface ThemedIconProps {
  src: string;
  color?: string;
  className?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  forceTheme?: ThemeMode;
}

export function ThemedIcon({
  src,
  color,
  className = "",
  alt = "",
  width,
  height,
  onClick,
  forceTheme,
}: ThemedIconProps) {
  const { theme } = useTheme();
  const [svg, setSvg] = useState("");

  const effectiveTheme = forceTheme ?? theme;

  useEffect(() => {
    const load = async () => {
      try {
        let text = await fetch(src).then((r) => r.text());

        if (color) {
          const col =
            effectiveTheme === "dark" &&
            color.toLowerCase().startsWith("#1c1c1c")
              ? "#ffffff"
              : color;

          text = text
            .replace(
              /(fill|stroke)=["'](#[0-9A-Fa-f]{3,8})["']/g,
              `$1="${col}"`
            )
            .replace(/(fill|stroke)=["']currentColor["']/g, `$1="${col}"`);

          setSvg(text);
          return;
        }

        if (effectiveTheme === "dark") {
          text = text
            .replace(/#1c1c1c([0-9A-Fa-f]{2})?/gi, "#ffffff$1")
            .replace(/currentColor/gi, "#ffffff");
        }

        setSvg(text);
      } catch {
        setSvg("");
      }
    };

    load();
  }, [src, color, effectiveTheme]);

  if (!svg) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  }

  return (
    <span
      className={className}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width,
        height,
        cursor: onClick ? "pointer" : "default",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
