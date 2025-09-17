import type * as Stitches from "@stitches/react";
import { styled } from "../../theme";
import { To } from "react-router-dom";
import { Check } from "lucide-react";
import type { JSX } from "react";

export const ListItemButtonBase = styled("button", {
  flexGrow: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  fontFamily: "inherit",
  fontWeight: "$medium",
  fontSize: "$base",
  border: "0",
  padding: "$3",
  boxSizing: "border-box",
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "transparent",
  color: "$text",
  textDecoration: "none",
  "&:disabled": {
    pointerEvents: "none",
  },
  "&:hover": {
    backgroundColor: "$neutralLightHover",
    color: "$text",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "$primaryBackground",
        "&:hover": {
          backgroundColor: "$primaryLight",
        },
      },
    },
    disabled: {
      true: {
        color: "$gray700",
        "&:hover": {
          backgroundColor: "transparent",
          cursor: "not-allowed",
        },
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
    },
    danger: {
      true: {
        color: "$errorText",
      },
    },
  },
});

export const ListItem = styled("li", {
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  "&:focus-visible": {
    outline: "none",
  },
  variants: {
    focusRing: {
      true: {
        backgroundColor: "$neutralLightHover",
        color: "$text",
        borderRadius: "$2",
      },
    },
    withBullet: {
      true: {
        display: "list-item",
        listStyleType: "disc",
        listStylePosition: "outside",
        marginLeft: "$space$4",
        paddingLeft: "$space$2",
      },
    },
  },
});

const SelectedIndicator = styled(Check, {
  position: "absolute",
  fontSize: "$l",
  padding: 7,
  top: 0,
  right: 0,
});

export const List = styled("ul", {
  boxSizing: "border-box",
  listStyle: "none",
  margin: 0,
  padding: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  variants: {
    divider: {
      true: {
        gap: "0 !important",
        [`& ${ListItem}:not(:last-child)`]: {
          borderBottom: "1px solid $gray400",
        },
      },
    },
    variant: {
      navigation: {
        gap: "$0",
        [`& ${ListItemButtonBase}`]: {
          fontWeight: "$bold",
          fontSize: "$base",
          lineHeight: "$m",
          padding: "$2",
          borderRadius: "$2",
          "&:hover": {
            backgroundColor: "$neutralBorder",
          },
          "&.active": {
            backgroundColor: "$primary",
            color: "$primaryContrast",
          },
        },
      },
      subnav: {
        margin: "$1 0 $1 $2",
        paddingLeft: "$2",
        borderLeft: "1px solid $neutralBorder",
        [`& ${ListItemButtonBase}`]: {
          fontWeight: "$medium",
          fontSize: "$base",
          padding: "$1",
          borderRadius: "$12",
          color: "$neutralSolid",
          "&:hover": {
            textDecoration: "underline",
            backgroundColor: "transparent",
          },
          "&.active": {
            textDecoration: "underline",
            color: "$primaryText",
            backgroundColor: "transparent",
          },
        },
      },
      select: {
        padding: 5,
        [`& ${ListItemButtonBase}`]: {
          lineHeight: "$m",
          borderRadius: "$1",
          minHeight: 34,
          padding: "8px 35px 8px 8px",
        },
      },
      bulleted: {
        listStyle: "disc",
        paddingLeft: "$space$4",
        display: "block",
      },
    },
  },
});

export type ListVariantProps = Stitches.VariantProps<typeof List>;

export const ListHeader = styled("li", {
  fontWeight: "$bold",
  fontSize: "$m",
  padding: 0,
  boxSizing: "border-box",
  color: "$neutral",
  marginTop: "$4",
  marginBottom: "$2",
  textTransform: "uppercase",
  variants: {
    noMarginTop: {
      true: {
        marginTop: "$2",
      },
    },
  },
});

export const ListItemText = styled("span", {
  flexGrow: 1,
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  fontFamily: "inherit",
  fontWeight: "$bolder",
  fontSize: "$m",
  color: "inherit",
  userSelect: "none",
});

const ListItemButtonIcon = styled("span", {
  display: "inherit",
  fontSize: "$lead",
  variants: {
    hidden: {
      true: {
        visibility: "hidden",
      },
    },
    slot: {
      left: {
        marginRight: "$3",
      },
      right: {
        marginLeft: "$3",
      },
    },
  },
});

type ButtonVariantProps = Stitches.VariantProps<typeof ListItemButtonBase>;
export type ListItemButtonProps = ButtonVariantProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonVariantProps
  > & {
    /** Element placed before the children. */
    startIcon?: React.ReactNode;
    /** Element placed after the children. */
    endIcon?: React.ReactNode;
    children?: React.ReactNode;
    as?: React.ElementType;
    to?: To; // for react-router
    css?: Stitches.CSS;
  };

export const ListItemButton = (props: ListItemButtonProps): JSX.Element => {
  const {
    as = "button",
    startIcon,
    endIcon,
    children,
    selected,
    ...rest
  } = props;
  return (
    <ListItemButtonBase as={as} selected={selected} {...rest}>
      {selected && <SelectedIndicator />}
      {startIcon && (
        <ListItemButtonIcon slot="left">{startIcon}</ListItemButtonIcon>
      )}
      {children}
      {endIcon && (
        <ListItemButtonIcon slot="right">{endIcon}</ListItemButtonIcon>
      )}
    </ListItemButtonBase>
  );
};
