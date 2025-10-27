import { styled } from "../../theme/stitches.config";

const inputVariables = {
  $$inputColor: "$colors$background",
  $$inputTextColor: "$colors$text",
  $$inputTextWeight: "$fontWeights$light",
  $$inputPlaceholderColor: "$colors$dark400",
  $$inputBorderRadius: "$radii$2",
  $$inputBorderWidth: "$borderWidths$1",
  $$inputBorderColor: "$colors$neutralBorder",
  $$inputDisabledColor: "$colors$neutralLight",
  $$inputFocusedColor: "$colors$neutralLightHover",
  $$inputFocusedBorderWidth: "$borderWidths$2",
  $$inputFocusedBorderColor: "$colors$primaryBorder",
  $$inputErrorBorderColor: "$colors$errorBorder",
  $$inputSeparatorColor: "$colors$neutralBorderHover",
};

export const Adornment = styled("span", {
  display: "flex",
  alignItems: "center",
  boxSizing: "content-box",
  height: "100%",
  margin: 0,
  color: "$$inputTextColor",
  cursor: "default",
  position: "relative",
  padding: "0 4px 0 4px",
  "&:after": {
    content: "",
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    zIndex: "$2",
    height: "calc($$inputHeight - 2 * $space$2)",
    width: 1,
    background: "$$inputSeparatorColor",
    pointerEvents: "none",
  },
  variants: {
    left: {
      true: {
        "&:after": {
          right: 0,
        },
      },
    },
    right: {
      true: {
        "&:after": {
          left: 0,
        },
      },
    },
    separator: {
      false: {
        "&:after": {
          visibility: "hidden",
        },
      },
    },
    transparent: {
      true: {},
    },
  },
  compoundVariants: [
    {
      transparent: true,
      left: true,
      css: {
        paddingLeft: 0,
      },
    },
    {
      transparent: true,
      right: true,
      css: {
        paddingRight: 0,
      },
    },
  ],
});

export const InputWrapper = styled("div", {
  ...inputVariables,
  $$inputFontSize: "$fontSizes$base", // so we can change it depending on an eventual 'size' variant
  $$inputHeight: "$space$7",
  $$inputLineHeight: "$lineHeights$3",
  $$inputPadding: "$space$2",

  display: "inline-flex",
  verticalAlign: "middle",
  alignItems: "center",
  userSelect: "none",
  position: "relative",
  boxSizing: "border-box",

  height: "$$inputHeight",
  width: "100%",

  background: "$$inputColor",
  borderRadius: "$$inputBorderRadius",
  borderWidth: "$$inputBorderWidth",
  borderColor: "$$inputBorderColor",
  borderStyle: "solid",
  transition: "border-radius 0.2s ease",

  "&:before": {
    content: "",
    position: "absolute",
    bottom: -1,
    left: "50%",
    transform: "translate(-50%)",
    zIndex: "$2",
    height: "$$inputFocusedBorderWidth",
    width: 0,
    background: "$$inputFocusedBorderColor",
    transition: "width 0.2s ease",
  },

  "&:focus-within": {
    background: "$$inputFocusedColor",
    borderColor: "$$inputFocusedColor",
    borderRadius: "$$inputBorderRadius $$inputBorderRadius 0 0",
    "&:before": {
      width: "100%",
    },
  },

  variants: {
    disabled: {
      true: {
        $$inputTextColor: "$colors$textWeak",
        background: "$$inputDisabledColor",
      },
    },
    focused: {
      true: {
        background: "$$inputFocusedColor",
        borderColor: "$$inputFocusedColor",
        borderRadius: "$$inputBorderRadius $$inputBorderRadius 0 0",
        "&:before": {
          width: "100%",
        },
      },
    },
    multiline: {
      true: {
        height: "auto",
        minHeight: "$$inputHeight",
        paddingTop: "$$inputPadding",
      },
    },
    error: {
      true: {
        borderRadius: "$$inputBorderRadius $$inputBorderRadius 0 0",
        "&:before": {
          width: "calc(100% + 1px) !important",
          background: "$$inputErrorBorderColor",
        },
      },
    },
    variant: {
      default: {},
      white: {
        $$inputColor: "$colors$white",
        $$inputBorderColor: "$colors$neutralBorder",
        $$inputFocusedColor: "$colors$white",
        $$inputFocusedBorderColor: "$colors$blue400",
        boxShadow: "$vlt",
        "&:focus-within": {
          background: "$$inputColor",
          borderColor: "$$inputFocusedBorderColor",
          borderRadius: "$$inputBorderRadius",
          boxShadow: "0 0 0 2px rgba(7, 138, 232, 0.1)",
          "&:before": {
            display: "none",
          },
        },
        "&:hover": {
          borderColor: "$colors$slate300",
          background: "$$inputColor",
        },
        "& [data-end-adornment]": {
          backgroundColor: "$colors$white",
          borderRadius: "$1",
          padding: "$1",
          margin: "$1",
        },
      },
    },
  },
});

export const Input = styled("input", {
  fontSize: "inherit",
  fontWeight: "inherit",
  color: "$$inputTextColor",
  lineHeight: "$$inputLineHeight",
  width: "100%",
  height: "100%",
  padding: "0 $$inputPadding",
  background: "transparent",
  border: "none",
  borderRadius: 0,
  outline: "none",
  minWidth: 0,
  appearance: "none",
  "&::placeholder": {
    color: "$$inputPlaceholderColor",
  },
});
