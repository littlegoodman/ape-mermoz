import type * as Stitches from "@stitches/react";
import type { JSX } from "react";
import React from "react";
import {
  Button as ButtonBase,
  ButtonVariantProps,
  ButtonIcon,
} from "./button.style";
import { To } from "react-router-dom";
import { Spinner } from "../loader";

type NativeAttrs = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonVariantProps
>;
type Props = {
  /** Renders the button as a pure icon button. */
  icon?: React.ReactNode;
  /** Element placed before the children. */
  startIcon?: React.ReactNode;
  /** Element placed after the children. */
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  loadingIndicator?: string;
  css?: Stitches.CSS;
  as?: React.ElementType;
  to?: To; // for react-router
  relative?: string; // for react-router
};

export type ButtonProps = Omit<ButtonVariantProps, "icon"> &
  Props &
  NativeAttrs;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): JSX.Element => {
    const {
      as = "button",
      icon,
      startIcon,
      endIcon,
      children,
      loading = false,
      loadingIndicator,
      ...rest
    } = props;
    if (icon) {
      return (
        <ButtonBase as={as} ref={ref} icon={true} {...rest}>
          <ButtonIcon>{icon}</ButtonIcon>
        </ButtonBase>
      );
    }
    return loading ? (
      <ButtonBase as={as} ref={ref} {...rest} disabled>
        {startIcon && (
          <ButtonIcon slot="left">
            <Spinner />
          </ButtonIcon>
        )}
        {!startIcon && !endIcon && (loadingIndicator ?? <Spinner />)}
        {(startIcon || endIcon) && children}
        {endIcon && (
          <ButtonIcon slot="right">
            <Spinner />
          </ButtonIcon>
        )}
      </ButtonBase>
    ) : (
      <ButtonBase as={as} ref={ref} {...rest}>
        {startIcon && <ButtonIcon slot="left">{startIcon}</ButtonIcon>}
        {children}
        {endIcon && <ButtonIcon slot="right">{endIcon}</ButtonIcon>}
      </ButtonBase>
    );
  }
);
