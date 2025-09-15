import { StyledStack } from "./stack.style";

export type StackProps = {
  spacing?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space";
  children: React.ReactNode;
};

export const Stack = ({
  children,
  spacing = 3,
  align = "start",
  justify = "start",
}: StackProps) => {
  return (
    <StyledStack spacing={spacing} align={align} justify={justify}>
      {children}
    </StyledStack>
  );
};
