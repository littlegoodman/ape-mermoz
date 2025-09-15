import { RowContainer } from "./row.style";

export type RowProps = {
  spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space";
  children: React.ReactNode;
};

export const Row = ({
  children,
  spacing = 3,
  align = "start",
  justify = "start",
}: RowProps) => {
  return (
    <RowContainer spacing={spacing} align={align} justify={justify}>
      {children}
    </RowContainer>
  );
};
