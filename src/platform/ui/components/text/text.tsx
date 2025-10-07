import { styled } from "../../theme";

export const Text = styled("p", {
  fontSize: "$base",
  lineHeight: "$m",
  fontWeight: "$regular",
  letterSpacing: 0.5,
  margin: 0,
  padding: 0,
  variants: {
    noWrap: {
      true: {
        whiteSpace: "nowrap",
      },
    },
    variant: {
      bold: {
        fontWeight: "$bold",
      },
      title1: {
        fontSize: "$xl",
        lineHeight: "$xxl",
        fontWeight: "$bolder",
      },
      title2: {
        fontSize: "$l",
        lineHeight: "$xl",
        fontWeight: "$bolder",
      },
      title3: {
        fontSize: "$m",
        lineHeight: "$l",
        fontWeight: "$bolder",
      },
      subtitle: {
        fontSize: "$m",
        lineHeight: "$l",
        fontWeight: "$bold",
      },
      button: {
        // not the same styles of the actual buttons...
        fontSize: "$m",
        lineHeight: "$l",
        fontWeight: "$bolder",
      },
      link: {
        fontWeight: "$bolder",
      },
      bodyAlternate: {
        // TODO change
        fontSize: "14px",
        fontWeight: "500",
        color: "#1f2937",
        lineHeight: "1.3",
        letterSpacing: "0.025em",
      },
      body1: {},
      body2: {
        fontWeight: "$regular",
        lineHeight: "calc($m - 0.5)",
      },
      important: {
        fontWeight: "medium",
      },
      legend: {
        fontSize: "$xxs",
        lineHeight: "$xs",
        fontWeight: "$regular",
      },
    },
    weight: {
      semibold: {
        fontWeight: "$medium",
      },
      bold: {
        fontWeight: "$bold",
      },
    },
    size: {
      xs: {
        fontSize: "$xs",
        lineHeight: "$xs",
      },
      s: {
        fontSize: "$s",
        lineHeight: "$s",
      },
      m: {
        fontSize: "$m",
        lineHeight: "$m",
      },
      l: {
        fontSize: "$l",
        lineHeight: "$l",
      },
      xl: {
        fontSize: "$xl",
        lineHeight: "$xl",
      },
      xxl: {
        fontSize: "$xxl",
        lineHeight: "$xxl",
      },
    },
    color: {
      primary: {
        color: "$primarySolid",
      },
      secondary: {
        color: "$secondarySolid",
      },
      neutral: {
        color: "$textWeak",
      },
      success: {
        color: "$successSolid",
      },
      error: {
        color: "$errorSolid",
      },
      warning: {
        color: "$warningSolid",
      },
      primaryContrast: {
        color: "$primaryContrast",
      },
    },
    crossedOut: {
      true: {
        textDecoration: "line-through",
      },
    },
    legend: {
      true: {
        fontSize: "$xxs",
        lineHeight: "$xs",
        fontWeight: "$regular",
      },
    },
    ellipsis: {
      true: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "inline-block",
        maxWidth: "100%",
        minWidth: 0,
        flex: "1 1 auto",
      },
    },
  },
  compoundVariants: [
    {
      legend: true,
      crossedOut: true,
      css: {
        fontSize: "$xxs",
        lineHeight: "$xs",
        fontWeight: "$regular",
        textDecoration: "line-through",
      },
    },
    {
      legend: true,
      ellipsis: true,
      css: {
        fontSize: "$xxs",
        lineHeight: "$xs",
        fontWeight: "$regular",
      },
    },
  ],
});
