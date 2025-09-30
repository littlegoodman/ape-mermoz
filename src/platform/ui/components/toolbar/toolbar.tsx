import { styled } from "@stitches/react";
import type * as Stitches from "@stitches/react";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxSizing: "border-box",
  background: "transparent",
  color: "#455460",
  width: "100%",
  padding: "$3",
  height: 60,
  variants: {
    variant: {
      "primary-solid": {
        background: "$primary",
        color: "$primaryContrast",
      },
      flat: {
        borderBottom: "1px solid $neutralLightHover",
      },
      floating: {
        padding: 0,
      },
    },
    size: {
      large: {
        height: 80,
        padding: "0 0 0 $4",
      },
    },
    noPadding: {
      true: {
        padding: 0,
      },
    },
  },
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
});

export const ToolbarSlot = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  width: "100%",
  variants: {
    position: {
      left: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      right: {
        justifyContent: "flex-end",
      },
    },
  },
});

export const Toolbar = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  css?: Stitches.CSS;
} & Stitches.VariantProps<typeof Container>) => (
  <Container {...props}>
    <Content>{children}</Content>
  </Container>
);
