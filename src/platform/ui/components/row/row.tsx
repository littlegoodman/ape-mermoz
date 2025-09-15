import { StyledRow } from "./row.style";

export type RowProps = {
  children: React.ReactNode;
  spacing: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  align: "start" | "center" | "end" | "stretch";
  justify: "start" | "center" | "end" | "space";
};

export const Row = ({ children, spacing, align, justify }: RowProps) => {
  return (
    <StyledRow spacing={spacing} align={align} justify={justify}>
      {children}
    </StyledRow>
  );
};
