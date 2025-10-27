import { forwardRef, useRef } from "react";
import {
  Trigger,
  TriggerIcon,
  TriggerText,
  TriggerWrapper,
} from "./select.style";
import { ChevronDown } from "lucide-react";
import { AriaButtonProps, useButton } from "@react-aria/button";
import { Popover } from "../popover";
import { useOptionalRef } from "./use-optional-ref";
import { useSelect, HiddenSelect } from "react-aria";
import { useSelectState } from "@react-stately/select";
import { CollectionChildren } from "@react-types/shared";
import { ListBox } from "./list-box";
import { Item } from "@react-stately/collections";

export { Item };

export type SelectProps<T extends object> = {
  label: string;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items?: Iterable<T>;
  children?: CollectionChildren<T>;
};

const TriggerButton = forwardRef<HTMLButtonElement, AriaButtonProps>(
  (props, ref) => {
    const buttonRef = useOptionalRef<HTMLButtonElement>(
      ref as React.ForwardedRef<HTMLButtonElement> as React.RefObject<HTMLButtonElement>
    );
    const { buttonProps } = useButton(props, buttonRef);
    const { children } = props;

    return (
      <Trigger {...buttonProps} ref={buttonRef}>
        {children}
      </Trigger>
    );
  }
);

export function Select<T extends object>({
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  ...props
}: SelectProps<T>) {
  const state = useSelectState({
    ...props,
    selectedKey: value,
    onSelectionChange: (key) => {
      if (onChange && key !== null) {
        // Create a synthetic event for compatibility with react-hook-form
        const syntheticEvent = {
          target: {
            value: key as string,
            name: name || "",
          },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(syntheticEvent);
      }
    },
  });
  const ref = useRef<HTMLButtonElement>(
    null
  ) as React.ForwardedRef<HTMLButtonElement> as React.RefObject<HTMLButtonElement>;
  const stateWithDefaults = {
    ...state,
    focusStrategy: state.focusStrategy ?? "first",
  };
  const { triggerProps, valueProps, menuProps } = useSelect(
    props,
    stateWithDefaults,
    ref
  );

  return (
    <>
      <HiddenSelect
        state={stateWithDefaults}
        triggerRef={ref}
        label={props.label}
        name={name}
      />
      <TriggerWrapper data-trigger-wrapper>
        <TriggerButton
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          {...triggerProps}
          isDisabled={props.isDisabled}
          onBlur={onBlur as (e: React.FocusEvent<Element, Element>) => void}
        >
          {props.icon}
          <TriggerText {...valueProps}>
            {state.selectedItem
              ? state.selectedItem.rendered
              : placeholder ?? undefined}
          </TriggerText>
          <TriggerIcon>
            <ChevronDown />
          </TriggerIcon>
        </TriggerButton>
      </TriggerWrapper>
      {state.isOpen && (
        <Popover
          arrow={false}
          offset={0}
          state={state}
          triggerRef={
            ref as React.ForwardedRef<HTMLButtonElement> as React.RefObject<Element | null>
          }
          placement="bottom start"
        >
          <ListBox
            label={props.label}
            variant="select"
            {...menuProps}
            state={state as any}
          />
        </Popover>
      )}
    </>
  );
}
