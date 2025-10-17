import type * as Stitches from "@stitches/react";
import { Text } from "../text";
import { styled } from "../../theme";
import { HTMLAttributes } from "react";

const cardVariables = {
  $$cardBorderWidth: "$borderWidths$1",
  $$cardBorderColor: "$colors$pink200",
  $$cardBorderRadius: "$radii$16",
  $$cardMinWidth: "200px",
  $$cardShadow: "$shadows$soft",
  $$cardFooterMaxHeight: "50px",
  $$cardContentMinHeight: "$24",
  $$cardBackgrounColor: "$colors$cream100",
};

const StyledHeader = styled("div", {
  display: "flex",
  boxSizing: "border-box",
  alignItems: "center",
  padding: "$4 $5 $4",
  position: "relative",
  borderRadius: "$$cardBorderRadius $$cardBorderRadius 0 0",
  borderBottom: "1px solid $pink200",
  background: "$gradients$soft",
  variants: {
    draggable: {
      true: {
        cursor: "move",
      },
    },
    noBorder: {
      true: {
        borderBottom: "none",
      },
    },
  },
});

const HeaderContent = styled("div", {
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
});

const StyledTitle = styled(Text, {
  display: "flex",
  flex: "1 1 auto",
  alignItems: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  userSelect: "none",
  fontSize: "$l",
  fontWeight: "$bold",
  fontFamily: "$primary",
  color: "$slate700",
  letterSpacing: "$wide",
});

const TitleIcon = styled("span", {
  display: "inherit",
  fontSize: "$m",
  marginRight: "$2",
});

const HeaderActions = styled("div", {
  flex: "0 0 auto",
  alignSelf: "center",
  marginRight: "-$space$2",
});

export const CardContent = styled("div", {
  width: "100%",
  boxSizing: "border-box",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  padding: "$4 $5 $6",
  variants: {
    disableGutters: {
      true: {
        padding: "$4 0 $4",
      },
    },
    noPadding: {
      true: {
        padding: 0,
      },
    },
  },
});

export const ScrollableCardContent = styled(CardContent, {
  gap: "$space$2",
  flex: "auto", // flex-grow: 1 - flex-shrink: 1 - flex-basis:auto === flex:1 1 auto;
  overflowY: "auto",
  height: "0px", // This is necessary to have a scrollable element.
});

export const CardFooter = styled("div", {
  ...cardVariables,
  padding: "$5",
  maxHeight: "$$cardFooterMaxHeight",
});

export const Card = styled("div", {
  ...cardVariables,
  boxSizing: "border-box",
  minWidth: "$$cardMinWidth",
  borderRadius: "$$cardBorderRadius",
  borderWidth: "$$cardBorderWidth",
  borderColor: "$$cardBorderColor",
  borderStyle: "solid",
  backgroundColor: "$$cardBackgrounColor",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  variants: {
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    color: {
      primary: {
        borderColor: "$primaryLight",
        [`& ${StyledHeader}`]: {
          backgroundColor: "rgb(204, 244, 253, 0.5)",
          borderColor: "$primaryLight",
        },
      },
    },
    shadowed: {
      true: {
        boxShadow: "$$cardShadow",
      },
    },
    large: {
      true: {
        [`& ${CardContent}`]: {
          padding: "$5 $6 $7",
        },
        [`& ${StyledHeader}`]: {
          padding: "$6 $6 $5",
        },
      },
    },
    small: {
      true: {
        [`& ${CardContent}`]: {
          padding: "$3 $4 $5",
        },
        [`& ${StyledHeader}`]: {
          padding: "$3 $4 $3",
        },
        [`& ${StyledTitle}`]: {
          fontSize: "$base",
        },
        [`& ${HeaderActions}`]: {
          margin: "-4px -12px",
        },
      },
    },
    xsmall: {
      true: {
        minWidth: "160px",
        [`& ${CardContent}`]: {
          padding: "$1 $2 $1",
        },
        [`& ${StyledHeader}`]: {
          padding: "$1 $2 $1",
        },
        [`& ${StyledTitle}`]: {
          fontSize: "$base",
        },
        [`& ${HeaderActions}`]: {
          margin: "-1px -2px",
        },
      },
    },
    fill: {
      true: {
        backgroundColor: "$gray400",
      },
    },
    transparent: {
      true: {
        backgroundColor: "transparent",
        border: "none",
      },
    },
  },
});

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  Stitches.VariantProps<typeof Card>;

export type CardTitleProps = Stitches.VariantProps<typeof StyledTitle> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export const CardTitle = ({ children, icon, ...rest }: CardTitleProps) => (
  <StyledTitle as="h5" variant="subtitle" css={{ color: "$text" }} {...rest}>
    {icon && <TitleIcon>{icon}</TitleIcon>}
    {children}
  </StyledTitle>
);

export type CardHeaderProps = HTMLAttributes<HTMLElement> &
  Stitches.VariantProps<typeof StyledHeader> & {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    title?: React.ReactNode;
    action?: React.ReactNode;
    css?: Stitches.CSS;
  };

export const CardHeader = ({
  children,
  icon,
  title,
  action,
  className,
  ...rest
}: CardHeaderProps) => (
  <StyledHeader {...rest}>
    {/* we forward the classname to the header content because we need to add a
    .draggable class to it for react-grid-layout */}
    <HeaderContent className={className}>
      {title && <CardTitle icon={icon}>{title}</CardTitle>}
      {children}
    </HeaderContent>
    {action && <HeaderActions>{action}</HeaderActions>}
  </StyledHeader>
);
