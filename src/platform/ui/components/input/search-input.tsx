import React from "react";
import { SearchIcon } from "lucide-react";
import { Input, InputProps } from "./input";

export type SearchInputProps = InputProps & {
  onSearch: (value: string) => void;
  onClear: () => void;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { onSearch, onClear, ...rest } = props;
    return (
      <Input
        ref={ref}
        {...rest}
        variant="white"
        type="search"
        onChange={(value) => onSearch?.(value.target.value)}
        endAdornment={<SearchIcon cursor={"pointer"} />}
      />
    );
  }
);
