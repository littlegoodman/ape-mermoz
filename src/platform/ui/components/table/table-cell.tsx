import { styled } from "../../theme";

export const TableCell = styled("td", {
  position: "relative",
  userSelect: "text",
  padding: "14px 16px",
  zIndex: "$2",
  variants: {
    checkbox: {
      true: {
        textAlign: "center",
      },
    },
    ellipsis: {
      true: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: 0, // necessary for ellipsis
        textOverflow: "ellipsis",
      },
    },
  },
});
