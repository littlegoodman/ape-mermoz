import { StyledStack } from "./stack.style";

export type StackProps = {
  children: React.ReactNode;
  spacing: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  align: "start" | "center" | "end" | "stretch";
  justify: "start" | "center" | "end" | "space";
};

export const Stack = ({ children, spacing, align, justify }: StackProps) => {
  return (
    <StyledStack spacing={spacing} align={align} justify={justify}>
      {children}
    </StyledStack>
  );
};
