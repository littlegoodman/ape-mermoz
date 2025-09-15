import { styled } from "../../theme";

export const StyledTable = styled("table", {
  width: "100%",
});

export const StyledEditableTableRow = styled("tr", {
  cursor: "pointer",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "$gray100",
  },
});
