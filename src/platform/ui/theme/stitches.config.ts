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
