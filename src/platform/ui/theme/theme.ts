import { palette } from "./palette";

const { pink, purple, gold, rose, slate, cream, sequential } = palette;

export const lightTheme = {
  white: "#ffffff",
  background: "#FFF8F9", // Soft pink background
  text: "$slate700",
  textWeak: "$slate600",

  // Primary color - elegant pink
  primary: "$pink500",
  primaryContrast: "$white",
  primarySolid: "$pink600",
  primaryBorder: "$pink500",
  primaryLight: "$pink200",
  primaryLightHover: "$pink300",
  primaryBackground: "$pink100",
  primaryText: "$pink900",

  // Secondary color - sophisticated purple
  secondary: "$purple500",
  secondaryContrast: "$white",
  secondarySolid: "$purple600",
  secondaryBorder: "$purple500",
  secondaryLight: "$purple200",
  secondaryLightHover: "$purple300",
  secondaryBackground: "$purple100",
  secondaryText: "$purple900",

  // Neutral - elegant slate
  neutral: "$slate600",
  neutralContrast: "$white",
  neutralSolid: "$slate700",
  neutralBorder: "$slate400",
  neutralBorderHover: "$slate500",
  neutralLight: "$slate200",
  neutralLightHover: "$slate300",
  neutralBackground: "$slate100",
  neutralText: "$slate800",

  // Success - soft rose
  success: "$rose500",
  successContrast: "$white",
  successSolid: "$rose600",
  successBorder: "$rose500",
  successLight: "$rose200",
  successLightHover: "$rose300",
  successBackground: "$rose100",
  successText: "$rose900",

  // Warning - elegant gold
  warning: "$gold500",
  warningContrast: "$white",
  warningSolid: "$gold600",
  warningBorder: "$gold500",
  warningLight: "$gold200",
  warningLightHover: "$gold300",
  warningBackground: "$gold100",
  warningText: "$gold900",

  // Error - deep rose
  error: "$rose600",
  errorContrast: "$white",
  errorSolid: "$rose700",
  errorBorder: "$rose500",
  errorLight: "$rose200",
  errorLightHover: "$rose300",
  errorBackground: "$rose100",
  errorText: "$rose800",

  // Negative - cream
  negative: "$cream100",
  negativeContrast: "$slate700",
  negativeSolid: "$cream200",
  negativeBorder: "$cream300",
  negativeLight: "$cream100",
  negativeLightHover: "$cream200",
  negativeBackground: "$cream100",
  negativeText: "$slate700",
};

export const theme = {
  colors: {
    ...pink,
    ...purple,
    ...gold,
    ...rose,
    ...slate,
    ...cream,
    ...sequential,
    ...lightTheme,
  },
  space: {
    0: "4px",
    1: "6px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "32px",
    // 36px is used too for large inputs and buttons
    8: "40px",
  },
  fontSizes: {
    base: "14px",
    lead: "18px",
    xs: "10px",
    s: "12px",
    m: "14px",
    l: "20px",
    xl: "24px",
    xxl: "32px",
    xxxl: "40px",
    appname: "21px", // weird...
  },
  fonts: {
    primary: "'Playfair Display', 'Georgia', serif", // Elegant serif for headings
    secondary: "'Poppins', 'Inter', sans-serif", // Modern sans-serif for body text
    accent: "'Dancing Script', cursive", // Script font for special elements
  },
  fontWeights: {
    bolder: 700,
    bold: 600,
    medium: 500,
    regular: 400,
    light: 300,
    lighter: 200,
    thin: 100,
  },
  lineHeights: {
    xs: "12px",
    s: "15px",
    m: "18px",
    l: "22px",
    btn: "24px",
    xl: "30px",
    xxl: "40px",
    appname: "21px", // weird...
  },
  letterSpacings: {
    base: "0.3px",
    wide: "0.8px",
    wider: "1.2px",
    tight: "0.1px",
  },
  sizes: {
    4: "4px",
    16: "16px",
    24: "24px",
  },
  borderWidths: {
    1: "1px",
    2: "2px",
  },
  borderStyles: {},
  radii: {
    1: "4px",
    2: "6px",
    3: "8px",
    8: "8px",
    12: "12px",
    16: "16px",
    24: "24px",
    32: "32px",
  },
  shadows: {
    btn: "0px 4px 12px rgba(244, 114, 182, 0.3), 0px 2px 4px rgba(244, 114, 182, 0.2)",
    md: "0px 8px 25px rgba(244, 114, 182, 0.15), 0px 4px 10px rgba(244, 114, 182, 0.1)",
    lt: "0px 2px 8px rgba(244, 114, 182, 0.1), 0px 1px 3px rgba(244, 114, 182, 0.05)",
    vlt: "0px 1px 3px rgba(244, 114, 182, 0.1)",
    soft: "0px 4px 20px rgba(244, 114, 182, 0.08), 0px 1px 3px rgba(244, 114, 182, 0.05)",
    glow: "0px 0px 20px rgba(244, 114, 182, 0.3), 0px 0px 40px rgba(244, 114, 182, 0.1)",
  },
  gradients: {
    primary: "linear-gradient(135deg, $pink400 0%, $pink600 100%)",
    secondary: "linear-gradient(135deg, $purple400 0%, $purple600 100%)",
    rose: "linear-gradient(135deg, $rose300 0%, $rose500 100%)",
    gold: "linear-gradient(135deg, $gold300 0%, $gold500 100%)",
    sunset: "linear-gradient(135deg, $pink300 0%, $rose400 50%, $gold300 100%)",
    dream:
      "linear-gradient(135deg, $purple200 0%, $pink300 50%, $rose200 100%)",
    soft: "linear-gradient(135deg, $cream100 0%, $pink100 100%)",
  },
  zIndices: {
    1: "100",
    2: "200",
    3: "300",
    4: "400",
    5: "500",
    drawer: "200",
    appbar: "300",
    modal: "500",
    toast: "600",
  },
  transitions: {},
  tiles: {
    padding: 16,
    headerHeight: 40,
    border: 1,
  },
  charts: {
    backgroundColor: "#fff",
    axisColor: slate.slate400,
    gridColor: slate.slate400,
    gridStrokeDashArray: "10, 5",
    brushColor: pink.pink400,
    crosshairColor: pink.pink400,
  },
};
