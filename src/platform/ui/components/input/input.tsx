import { Adornment, InputWrapper, Input as InputBase } from "./input.style";
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
      <InputWrapper
        focused={focused}
        error={error}
        disabled={disabled}
        multiline={multiline}
      >
        <InputBase
          as={multiline ? "textarea" : "input"}
          ref={ref}
          type={multiline ? undefined : props.type}
          disabled={disabled}
          {...props}
        />
        {endAdornment && (
          <Adornment separator={true} transparent={false} right>
            {endAdornment}
          </Adornment>
        )}
      </InputWrapper>
    );
  }
);
