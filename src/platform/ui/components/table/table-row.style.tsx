import { styled } from "../../theme";

export const ImmutableTableRow = styled("tr", {});

export const EditableTableRow = styled("tr", {
  cursor: "pointer",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "$gray100",
  },
});
