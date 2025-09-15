import { StyledInput } from "./input.styles";
import { ReactNode } from "react";

export type InputProps = {
  value: string;
  endAdornment?: ReactNode;
  onChange: (value: string) => void;
};

export const Input = ({ value, onChange, endAdornment }: InputProps) => {
  return (
    <div>
      <StyledInput value={value} onChange={(e) => onChange(e.target.value)} />
      {endAdornment}
    </div>
  );
};
