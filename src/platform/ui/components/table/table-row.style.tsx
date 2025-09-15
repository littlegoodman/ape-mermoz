import { styled } from "../../theme";

export const StyledTableRow = styled("tr", {});

export const StyledEditableTableRow = styled("tr", {
  cursor: "pointer",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "$gray100",
  },
});
