import { styled } from "../../theme";

export const TableHeaderCell = styled("th", {
  cursor: "default",
  userSelect: "none",
  color: "$text",
  fontSize: "$base",
  textAlign: "left",
  position: "relative",
  padding: "14px 16px",
  variants: {
    checkbox: {
      true: {
        width: 24,
        textAlign: "center",
      },
    },
  },
});
