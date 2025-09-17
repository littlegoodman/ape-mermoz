import React, { forwardRef } from "react";
import type * as Stitches from "@stitches/react";
import type {
  AriaListBoxProps,
  AriaListBoxSectionProps,
} from "@react-aria/listbox";
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox";
import { useSeparator } from "@react-aria/separator";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import {
  List,
  ListHeader,
  ListItem,
  ListItemButton,
  ListVariantProps,
} from "../list";
import { useFocusRing } from "@react-aria/focus";
import { useOptionalRef } from "./use-optional-ref";

export const ListBox = forwardRef(
  <T extends object>(
    props: Omit<AriaListBoxProps<T>, "children"> & {
      state: ListState<T>;
      css?: Stitches.CSS;
    } & ListVariantProps,
    ref: React.ForwardedRef<HTMLUListElement>
  ) => {
    //const state = useListState(props as AriaListBoxProps<T>);
    const { state, variant, css } = props;
    const listBoxRef = useOptionalRef<HTMLUListElement>(ref);
    const { listBoxProps } = useListBox(props, state, listBoxRef);

    return (
      <List
        {...listBoxProps}
        ref={listBoxRef}
        css={{ maxHeight: 300, overflow: "auto", ...css }}
        variant={variant}
      >
        {Array.from(state.collection).map((item) =>
          item.type === "section" ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <Option key={item.key} item={item} state={state} />
          )
        )}
      </List>
    );
  }
);

function ListBoxSection<T extends object>({
  section,
  state,
}: AriaListBoxSectionProps & {
  section: Node<T>;
  state: ListState<T>;
}) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  const { separatorProps } = useSeparator({
    elementType: "li",
  });

  // If the section is not the first, add a separator element.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <ListItem
          {...separatorProps}
          style={{
            borderTop: "1px solid gray",
            margin: "2px 5px",
          }}
        />
      )}
      <ListItem {...itemProps}>
        {section.rendered && (
          <ListHeader
            {...headingProps}
            style={{
              fontWeight: "bold",
              fontSize: "1.1em",
              padding: "2px 5px",
            }}
          >
            {section.rendered}
          </ListHeader>
        )}
        <List
          {...groupProps}
          style={{
            padding: 0,
            listStyle: "none",
          }}
        >
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </List>
      </ListItem>
    </>
  );
}

function Option<T extends object>({
  item,
  state,
}: {
  item: Node<T>;
  state: ListState<T>;
}) {
  const ref = React.useRef(null);
  const { optionProps, isSelected, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <ListItem
      {...optionProps}
      {...focusProps}
      ref={ref}
      focusRing={isFocusVisible}
    >
      <ListItemButton as="div" selected={isSelected} disabled={isDisabled}>
        {item.rendered}
      </ListItemButton>
    </ListItem>
  );
}
