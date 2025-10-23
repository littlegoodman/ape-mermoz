import { styled } from "../../theme";
import { TableRow } from "./table-row";
import { TableCell } from "./table-cell";
import { TableHeaderRow } from "./table-header-row";
import { TableHeaderCell } from "./table-header-cell";

export const TableContainer = styled("table", {
  borderCollapse: "separate",
  borderSpacing: 0,
  width: "100%",
  padding: 0,
  // [`& ${StyledTableRow}:not(:first-child)`]: {
  [`& ${TableCell}`]: {
    borderTop: "1px solid $gray400",
    padding: "$2 $5",
  },
  // },
  variants: {
    dense: {
      true: {
        [`& ${TableHeaderCell}`]: {
          padding: "8px",
        },
        [`& ${TableCell}`]: {
          padding: "8px",
        },
      },
    },
    variant: {
      tickers: {
        borderSpacing: "0 6px",
        borderRadius: "6px",
        [`& ${TableRow}`]: {
          backgroundColor: "$white",
        },
        [`& ${TableRow}:hover`]: {
          backgroundColor: "$white",
        },
        [`& ${TableRow}:hover ${TableCell}`]: {
          borderColor: "$primarySolid",
        },
        [`& ${TableRow}:not(:hover) [data-visibility="hover"]`]: {
          display: "none",
        },
        [`& ${TableHeaderCell}`]: {},
        [`& ${TableCell}`]: {
          borderTop: "none",
          border: "1px solid $gray400",
          borderStyle: "solid none",
          padding: "9px 12px",
        },
        [`& ${TableCell}:first-child`]: {
          borderLeftStyle: "solid",
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
        },
        [`& ${TableCell}:last-child`]: {
          borderRightStyle: "solid",
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
        },
      },
    },
    headless: {
      true: {
        [`& ${TableHeaderRow}`]: {
          display: "none",
        },
      },
    },
    clickable: {
      true: {
        [`& ${TableRow}:hover`]: {
          cursor: "pointer",
        },
      },
    },
  },
});
