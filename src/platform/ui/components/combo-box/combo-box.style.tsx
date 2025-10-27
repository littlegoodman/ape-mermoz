import { styled } from "../../theme/stitches.config";

const comboBoxVariables = {
  $$comboBoxColor: "$colors$background",
  $$comboBoxTextColor: "$colors$text",
  $$comboBoxTextWeight: "$fontWeights$light",
  $$comboBoxPlaceholderColor: "$colors$dark400",
  $$comboBoxBorderRadius: "$radii$2",
  $$comboBoxBorderWidth: "$borderWidths$1",
  $$comboBoxBorderColor: "$colors$neutralBorder",
  $$comboBoxDisabledColor: "$colors$neutralLight",
  $$comboBoxFocusedColor: "$colors$neutralLightHover",
  $$comboBoxFocusedBorderWidth: "$borderWidths$2",
  $$comboBoxFocusedBorderColor: "$colors$primaryBorder",
  $$comboBoxErrorBorderColor: "$colors$errorBorder",
  $$comboBoxSeparatorColor: "$colors$neutralBorderHover",
};

export const ComboBoxWrapper = styled("div", {
  ...comboBoxVariables,
  $$comboBoxFontSize: "$fontSizes$base",
  $$comboBoxHeight: "$space$7",
  $$comboBoxLineHeight: "$lineHeights$3",
  $$comboBoxPadding: "$space$2",

  display: "inline-flex",
  verticalAlign: "middle",
  alignItems: "center",
  userSelect: "none",
  position: "relative",
  boxSizing: "border-box",

  height: "$$comboBoxHeight",
  width: "100%",

  background: "$$comboBoxColor",
  borderRadius: "$$comboBoxBorderRadius",
  borderWidth: "$$comboBoxBorderWidth",
  borderColor: "$$comboBoxBorderColor",
  borderStyle: "solid",
  transition: "border-radius 0.2s ease",

  "&:before": {
    content: "",
    position: "absolute",
    bottom: -1,
    left: "50%",
    transform: "translate(-50%)",
    zIndex: "$2",
    height: "$$comboBoxFocusedBorderWidth",
    width: 0,
    background: "$$comboBoxFocusedBorderColor",
    transition: "width 0.2s ease",
  },

  "&:focus-within": {
    background: "$$comboBoxFocusedColor",
    borderColor: "$$comboBoxFocusedColor",
    borderRadius: "$$comboBoxBorderRadius $$comboBoxBorderRadius 0 0",
    "&:before": {
      width: "100%",
    },
  },

  variants: {
    disabled: {
      true: {
        $$comboBoxTextColor: "$colors$textWeak",
        background: "$$comboBoxDisabledColor",
      },
    },
    focused: {
      true: {
        background: "$$comboBoxFocusedColor",
        borderColor: "$$comboBoxFocusedColor",
        borderRadius: "$$comboBoxBorderRadius $$comboBoxBorderRadius 0 0",
        "&:before": {
          width: "100%",
        },
      },
    },
    error: {
      true: {
        borderRadius: "$$comboBoxBorderRadius $$comboBoxBorderRadius 0 0",
        "&:before": {
          width: "calc(100% + 1px) !important",
          background: "$$comboBoxErrorBorderColor",
        },
      },
    },
    width: {
      small: {
        width: "200px",
      },
      medium: {
        width: "300px",
      },
      large: {
        width: "400px",
      },
      full: {
        width: "100%",
      },
    },
  },
});

export const ComboBoxInput = styled("input", {
  fontSize: "inherit",
  fontWeight: "inherit",
  color: "$$comboBoxTextColor",
  lineHeight: "$$comboBoxLineHeight",
  width: "100%",
  height: "100%",
  padding: "0 $$comboBoxPadding",
  background: "transparent",
  border: "none",
  borderRadius: 0,
  outline: "none",
  minWidth: 0,
  appearance: "none",
  "&::placeholder": {
    color: "$$comboBoxPlaceholderColor",
  },
});

export const ComboBoxAdornment = styled("span", {
  display: "flex",
  alignItems: "center",
  boxSizing: "content-box",
  height: "100%",
  margin: 0,
  color: "$$comboBoxTextColor",
  cursor: "default",
  position: "relative",
  padding: "0 4px 0 4px",
  "&:after": {
    content: "",
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    zIndex: "$2",
    height: "calc($$comboBoxHeight - 2 * $space$2)",
    width: 1,
    background: "$$comboBoxSeparatorColor",
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

export const ComboBoxButton = styled("button", {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "content-box",
  height: "100%",
  margin: 0,
  color: "$$comboBoxTextColor",
  cursor: "pointer",
  position: "relative",
  padding: "0 4px 0 4px",
  transform: "translateY(-8px)",
  "&:before": {
    content: "",
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translate(0, -50%)",
    zIndex: "$2",
    height: "calc($$comboBoxHeight - 2 * $space$2)",
    width: 1,
    background: "$$comboBoxSeparatorColor",
    pointerEvents: "none",
  },
  "&:hover": {
    color: "$colors$primary",
  },
  "&:focus": {
    outline: "none",
  },
  "&:disabled": {
    cursor: "default",
    color: "$colors$textWeak",
  },
});

export const ComboBoxPopover = styled("div", {
  background: "$white",
  border: "1px solid $neutralBorder",
  borderRadius: "$radii$2",
  boxShadow: "$shadows$md",
  maxHeight: "300px",
  overflow: "auto",
  marginTop: "2px",
});

export const ComboBoxListBox = styled("ul", {
  listStyle: "none",
  margin: 0,
  padding: "$1",
  "&:focus": {
    outline: "none",
  },
});

export const ComboBoxListBoxItem = styled("li", {
  padding: "$2 $3",
  cursor: "pointer",
  borderRadius: "$radii$1",
  fontSize: "$base",
  color: "$dark500",
  "&:hover": {
    background: "$neutralLight",
  },
  "&[data-selected]": {
    background: "$primaryLight",
    color: "$primary",
  },
  "&[data-focused]": {
    background: "$neutralLightHover",
  },
  "&[data-disabled]": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});
