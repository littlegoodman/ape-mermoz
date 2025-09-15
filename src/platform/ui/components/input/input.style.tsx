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

export const StyledInput = styled("input", {
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
  },
});
