import { createStitches } from "@stitches/react";
import { theme as themeTokens } from "./theme";

export const breakpoints: Record<Breakpoint, string> = {
  xs: "0px",
  sm: "650px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
};

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: themeTokens,
  media: {
    xs: `(min-width: ${breakpoints.xs})`,
    sm: `(min-width: ${breakpoints.sm})`,
    md: `(min-width: ${breakpoints.md})`,
    lg: `(min-width: ${breakpoints.lg})`,
    xl: `(min-width: ${breakpoints.xl})`,
    motion: "(prefers-reduced-motion: reduce)",
    safari: "not all and (min-resolution:.001dpcm)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  utils: {
    // marginX: (value) => ({ marginLeft: value, marginRight: value }),
  },
});

export const applyTheme = globalCss({
  "@import": [
    "url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap')",
  ],
  "*": {
    margin: 0,
    padding: 0,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
  },

  html: {
    fontSize: "$base",
    backgroundColor: "$background",
    color: "$text",
  },

  body: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textRendering: "optimizeLegibility",
    fontSize: "$base",
    lineHeight: "$m",
    letterSpacing: "$base",
    fontFamily: "$secondary",
    backgroundColor: "$background",
    color: "$text",
    backgroundImage:
      "radial-gradient(circle at 20% 80%, rgba(244, 114, 182, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.05) 0%, transparent 50%)",
  },

  "h1, h2, h3, h4, h5, h6": {
    fontFamily: "$primary",
    fontWeight: "$bold",
    letterSpacing: "$wide",
    color: "$slate700",
  },

  "button, input, select, textarea": {
    fontFamily: "$secondary",
  },
});
