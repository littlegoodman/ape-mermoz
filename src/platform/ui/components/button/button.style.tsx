import type * as Stitches from "@stitches/react";
import { styled } from "../../theme";

const containedVariant = (color: string) => ({
  color: `$${color}Contrast`,
  background: color === "primary" ? "$gradients$primary" : `$${color}`,
  "&:hover": {
    boxShadow: "$btn",
    transform: "translateY(-1px)",
    transition: "all 0.2s ease-in-out",
  },
  "&:active": {
    backgroundColor: color === "negative" ? "$neutralLight" : `$${color}Solid`,
    transform: "translateY(0px)",
  },
  "&:disabled": {
    backgroundColor: "$$disabledBackground",
    transform: "none",
  },
});

const outlinedVariant = (color: string) => ({
  color,
  variant: "outlined",
  css: {
    color: color === "negative" ? "$negativeText" : "$text",
    borderColor: `$${color}Border`,
    backgroundColor: color === "negative" ? "transparent" : "$background",
    borderWidth: "2px",
    "&:hover": {
      color: color === "negative" ? "$negativeContrast" : `$${color}Solid`,
      backgroundColor:
        color === "negative" ? "$neutralLight" : `$${color}Background`,
      boxShadow: "$soft",
      transform: "translateY(-1px)",
      transition: "all 0.2s ease-in-out",
    },
    "&:active": {
      backgroundColor: `$${color}Solid`,
      borderColor: `$${color}Solid`,
      color: `$${color}Contrast`,
      transform: "translateY(0px)",
    },
    "&:disabled": {
      color: "$$disabledBackground",
      borderColor: "$$disabledBackground",
      backgroundColor: "$background",
      transform: "none",
    },
  },
});

const lightVariant = (color: string) => ({
  color,
  variant: "light",
  css: {
    color: `$${color}Solid`,
    backgroundColor: "transparent",
    "&:hover": {
      color: color === "negative" ? "$negativeContrast" : `$${color}Solid`,
      backgroundColor: "$neutralLight",
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: `$${color}Background`,
    },
    "&:disabled": {
      color: "$$disabledBackground",
      backgroundColor: "transparent",
    },
  },
});

const subtleVariant = (color: string) => ({
  color,
  variant: "subtle",
  css: {
    color: `$${color}Solid`,
    backgroundColor: "transparent",
    "&:hover": {
      color: color === "negative" ? "$negativeContrast" : `$${color}Solid`,
      backgroundColor: `$${color}Background`,
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: `$${color}Light`,
    },
    "&:disabled": {
      color: "$$disabledBackground",
      backgroundColor: "transparent",
    },
  },
});

const buttonVariables = {
  $$disabledBackground: "$colors$neutral",
};

export const ButtonBase = styled("button", {
  ...buttonVariables,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$12", // More rounded for feminine look
  fontFamily: "$secondary",
  fontWeight: "$medium",
  fontSize: "$base",
  lineHeight: "$btn",
  letterSpacing: "$wide",
  WebkitFontSmoothing: "antialiased",
  border: "0",
  padding: "$2 $5", // Slightly more padding
  boxSizing: "border-box",
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "transparent",
  transition: "all 0.2s ease-in-out",
  "&:disabled": {
    pointerEvents: "none",
  },
  "&[hidden]": {
    display: "none !important",
  },
});

export const ButtonIcon = styled("span", {
  display: "inherit",
  fontSize: "$lead",
  variants: {
    slot: {
      left: {
        marginRight: "$3",
      },
      right: {
        marginLeft: "$2",
      },
    },
  },
});

export const Button = styled(ButtonBase, {
  textDecoration: "none",
  variants: {
    color: {
      primary: containedVariant("primary"),
      secondary: containedVariant("secondary"),
      success: containedVariant("success"),
      warning: containedVariant("warning"),
      error: containedVariant("error"),
      neutral: containedVariant("neutral"),
      negative: containedVariant("negative"),
    },
    variant: {
      contained: {},
      subtle: {},
      outlined: {
        borderWidth: "1px",
        borderStyle: "solid",
        padding: "calc($1 - 1px) $4",
      },
      light: {
        textDecoration: "underline",
      },
    },
    size: {
      xsmall: {
        fontSize: "$s",
        padding: "3px 5px",
        lineHeight: "$s",
        [`& ${ButtonIcon}`]: {
          fontSize: "13px",
        },
      },
      xs: {
        // used for button input adornments, e.g SearchInput
        padding: "3px 7px",
        lineHeight: "$l",
        [`& ${ButtonIcon}`]: {
          fontSize: "15px",
        },
      },
      small: {
        padding: "4px 9px",
        lineHeight: "$l",
        [`& ${ButtonIcon}`]: {
          fontSize: "15px",
        },
      },
      medium: {},
      large: {
        fontSize: "$m",
        letterSpacing: "$base",
        padding: "$2 $5",
      },
    },
    icon: {
      true: {
        padding: "9px",
      },
    },
    round: {
      true: {
        borderRadius: "50%",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
  },
  compoundVariants: [
    ...[
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "neutral",
      "negative",
    ].flatMap((color: string) => [
      outlinedVariant(color),
      lightVariant(color),
      subtleVariant(color),
    ]),
    {
      size: "small",
      variant: "outlined",
      css: {
        padding: "3px 8px !important",
      },
    },
    {
      size: "large",
      variant: "outlined",
      css: {
        padding: "calc($2 - 1px) calc($5 - 1px) !important",
      },
    },
    {
      icon: true,
      size: "small",
      css: {
        padding: "7px !important",
      },
    },
    {
      icon: true,
      size: "xs",
      css: {
        padding: "4px !important",
      },
    },
    {
      icon: true,
      variant: "outlined",
      css: {
        padding: "8px !important",
      },
    },
    {
      icon: true,
      variant: "outlined",
      size: "small",
      css: {
        padding: "6px !important",
      },
    },
  ],
  defaultVariants: {
    color: "secondary",
    size: "medium",
  },
});

export type ButtonVariantProps = Stitches.VariantProps<typeof Button>;
