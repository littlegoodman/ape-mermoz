import React, { useLayoutEffect } from "react";
import {
  usePopover,
  DismissButton,
  Overlay,
  AriaPopoverProps,
  useOverlayTrigger,
} from "@react-aria/overlays";
import {
  OverlayTriggerState,
  useOverlayTriggerState,
} from "@react-stately/overlays";
import { styled } from "../../theme";
import { OverlayTriggerProps, PositionProps } from "@react-types/overlays";
import { useButton } from "@react-aria/button";
import { useOptionalRef } from "./use-optional-ref";

const Underlay = styled("div", {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const StyledPopover = styled("div", {
  boxSizing: "border-box",
  position: "absolute",
  zIndex: 100000,
  backgroundColor: "$white",
  borderRadius: "$8",
  border: "1px solid $gray400",
  //boxShadow: '0px 0px 8px rgba(50, 66, 82, 0.4)',
  boxShadow: "0px 0px 8px rgba(69, 84, 96, 0.2)",
});

const ArrowSvgContainer = styled("svg", {
  position: "absolute",
  fill: "$white",
  stroke: "$gray400",
  strokeWidth: 1,
  width: 12,
  height: 12,
  '&[data-placement="top"]': {
    top: "100%",
    transform: "translateX(-50%)",
  },
  '&[data-placement="bottom"]': {
    bottom: "100%",
    transform: "translateX(-50%) rotate(180deg)",
  },
  '&[data-placement="left"]': {
    left: "100%",
    transform: "translateY(-50%) rotate(-90deg)",
  },
  '&[data-placement="right"]': {
    right: "100%",
    transform: "translateY(-50%) rotate(90deg)",
  },
});

type PopoverOverlayProps = Omit<AriaPopoverProps, "popoverRef"> & {
  __BEURK__useNastyHack?: boolean;
  children: React.ReactNode;
  state: OverlayTriggerState;
  offset?: number;
  arrow?: boolean;
};

export const Popover = React.forwardRef(
  (props: PopoverOverlayProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const {
      state,
      children,
      arrow = true,
      offset = 8,
      __BEURK__useNastyHack = false,
    } = props;
    const popoverRef = useOptionalRef<HTMLDivElement>(ref);
    const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
      {
        ...props,
        offset,
        popoverRef,
      },
      state
    );

    // ACHTUNG!!! This is a nasty hack to fix an issue with the usePreventScroll react-aria hook
    // for some reason, when a popover's content is scrollable and is greater than a certain height,
    // it tries to add padding even if it is not needed
    useLayoutEffect(() => {
      if (__BEURK__useNastyHack) {
        document.documentElement.style.paddingRight = "0px";
      }
    }, [state.isOpen, __BEURK__useNastyHack]);

    return (
      <Overlay>
        <Underlay {...underlayProps} />
        <StyledPopover {...popoverProps} ref={popoverRef}>
          {arrow && (
            <ArrowSvgContainer {...arrowProps} data-placement={placement}>
              <path d="M0 0,L6 6,L12 0" />
            </ArrowSvgContainer>
          )}
          <DismissButton onDismiss={state.close} />
          {children}
          <DismissButton onDismiss={state.close} />
        </StyledPopover>
      </Overlay>
    );
  }
);

type PopoverTriggerProps = OverlayTriggerProps &
  Omit<PositionProps, "isOpen"> & {
    __BEURK__useNastyHack?: boolean;
    trigger: React.ReactElement;
    children: React.ReactNode;
  };

export const PopoverContext = React.createContext<
  OverlayTriggerState | undefined
>(undefined);

export const PopoverTrigger = ({
  trigger,
  children,
  ...props
}: PopoverTriggerProps) => {
  const ref = React.useRef(null);
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <>
      {React.cloneElement(trigger, {
        ...buttonProps,
      })}
      {state.isOpen && (
        <PopoverContext.Provider value={state}>
          <Popover {...props} triggerRef={ref} state={state}>
            {React.cloneElement(children as React.ReactElement, overlayProps)}
          </Popover>
        </PopoverContext.Provider>
      )}
    </>
  );
};
