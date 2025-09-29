import { styled } from "../../theme";
import { TableRow } from "./table-row";

export const TableBody = styled("tbody", {
  variants: {
    isFixed: {
      true: {
        display: "table",
        width: "100%",
        tableLayout: "fixed",
      },
    },
    isInfinityScroll: {
      true: {
        display: "block",
        height: "100%",
        overflow: "auto",
        [`& ${TableRow}`]: {
          display: "table",
          width: "100%",
          tableLayout: "fixed",
        },
      },
    },
  },
  defaultVariants: {
    isInfinityScroll: false,
  },
});
