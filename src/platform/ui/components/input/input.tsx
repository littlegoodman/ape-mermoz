import { StyledInput } from "./input.style";
import { ReactNode, forwardRef, ComponentPropsWithoutRef } from "react";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  endAdornment?: ReactNode;
  disabled?: boolean;
  focused?: boolean;
  multiline?: boolean;
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ endAdornment, disabled, focused, multiline, error, ...props }, ref) => {
    return (
      <div>
        <StyledInput
          ref={ref}
          disabled={disabled}
          focused={focused}
          multiline={multiline}
          error={error}
          {...props}
        />
        {endAdornment}
      </div>
    );
  }
);
