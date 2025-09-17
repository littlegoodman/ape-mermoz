import { styled } from "../../theme/stitches.config";

export const TriggerIcon = styled("span", {
  color: "$gray600",
  fontSize: "$lead",
});

export const Trigger = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 5,
  background: "$white",
  color: "$dark500",
  borderRadius: "$radii$2",
  border: "1px solid $neutralBorder",
  fontWeight: "$medium",
  fontSize: "$base",
  padding: "$1 $3",
  cursor: "pointer",
  whiteSpace: "nowrap",
  variants: {
    valueSelected: {
      true: {
        border: "1px solid $primaryBorder",
      },
    },
    disabled: {
      true: {
        background: "$neutralLight",
        cursor: "default",
      },
    },
    size: {
      small: {
        padding: "$1 $2",
        fontSize: "$sm",
      },
      large: {
        padding: "$2 $3",
        fontSize: "$base",
      },
    },
    variant: {
      primary: {
        color: "$primaryContrast",
        background: "$primary",
        [`& ${TriggerIcon}`]: {
          color: "$primaryContrast",
        },
      },
      dark: {
        background: "$dark500",
        color: "$gray100",
        [`& ${TriggerIcon}`]: {
          color: "$gray100",
        },
      },
      error: {
        border: "2px solid #FF0033",
      },
      highlighted: { border: "1px solid $primaryBorder" },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    shape: {
      round: {
        justifyContent: "center",
        borderRadius: "$24",
      },
    },
    bold: {
      true: {
        fontSize: "$m",
        lineHeight: "$l",
        fontWeight: "$bolder",
      },
    },
  },
});

export const TriggerText = styled("span", {
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1,
  textAlign: "left",
});

export const StyledSelect = styled("select", {
  fontSize: "inherit",
  fontWeight: "inherit",
  color: "inherit",
  lineHeight: "inherit",
  width: "100%",
  height: "100%",
});
