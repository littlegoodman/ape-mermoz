import { Search } from "lucide-react";
import { Input, InputProps } from "./input";

export type SearchInputProps = InputProps & {
  onSearch: (value: string) => void;
  onClear: () => void;
};

export const SearchInput = (props: SearchInputProps) => {
  const { onSearch, onClear, ...rest } = props;
  return (
    <Input
      {...rest}
      onChange={(value) => onSearch?.(value)}
      endAdornment={<Search cursor={"pointer"} />}
    />
  );
};
