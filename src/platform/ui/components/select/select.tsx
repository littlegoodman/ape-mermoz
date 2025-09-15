import { StyledSelect } from "./select.style";

export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({ value, onChange }: SelectProps) => {
  return (
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)} />
  );
};
