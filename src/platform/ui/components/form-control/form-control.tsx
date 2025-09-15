import React, { useId } from "react";
import { Row } from "../row";
import {
  FormControlContainer,
  InputLabel,
  FormHelperText,
  MandatorySymbol,
} from "./form-control.style";

export type FormControlProps = {
  label?: string;
  error?: boolean;
  helperText?: string;
  mandatory?: boolean;
  children: React.ReactNode;
};

export const FormControl = ({
  label,
  error,
  helperText,
  mandatory,
  children,
}: FormControlProps) => {
  const id = useId();

  return (
    <FormControlContainer error={error}>
      {label && (
        <Row spacing={2}>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          {mandatory && <MandatorySymbol>*</MandatorySymbol>}
        </Row>
      )}
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControlContainer>
  );
};
