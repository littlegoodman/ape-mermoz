import type * as Stitches from "@stitches/react";
import { styled } from "../../theme";

const containedVariant = (color: string) => ({
  color: `$${color}Contrast`,
  backgroundColor: `$${color}`,
  "&:hover": {
    boxShadow: "$btn",
  },
  "&:active": {
    backgroundColor: color === "negative" ? "$neutralLight" : `$${color}Solid`,
  },
  "&:disabled": {
    backgroundColor: "$$disabledBackground",
  },
});

const outlinedVariant = (color: string) => ({
  color,
  variant: "outlined",
  css: {
    color: color === "negative" ? "$negativeText" : "$text",
    borderColor: `$${color}Border`,
    backgroundColor: color === "negative" ? "transparent" : "$background",
    "&:hover": {
      color: color === "negative" ? "$negativeContrast" : "$text",
      backgroundColor: color === "negative" ? "$neutralLight" : "$neutralLight",
      boxShadow: "none",
    },
    "&:active": {
      backgroundColor: `$${color}Solid`,
      borderColor: `$${color}Solid`,
      color: `$${color}Contrast`,
    },
    "&:disabled": {
      color: "$$disabledBackground",
      borderColor: "$$disabledBackground",
      backgroundColor: "$background",
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
  borderRadius: "$3",
  fontFamily: "$primary",
  fontWeight: "$bold",
  fontSize: "$base",
  lineHeight: "$btn",
  letterSpacing: "$base",
  WebkitFontSmoothing: "antialiased",
  border: "0",
  padding: "$1 $4",
  boxSizing: "border-box",
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "transparent",
  "&:disabled": {
    pointerEvents: "none",
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
