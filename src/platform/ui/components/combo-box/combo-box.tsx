import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ComboBox as AriaComboBox } from "react-aria-components";
import { Key } from "@react-types/shared";
import {
  ComboBoxWrapper,
  ComboBoxInput,
  ComboBoxButton,
  ComboBoxPopover,
  ComboBoxListBox,
  ComboBoxListBoxItem,
} from "./combo-box.style";

export type ComboBoxItem = {
  key: string;
  value: string;
};

export type ComboBoxProps = {
  items: ComboBoxItem[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  value?: string;
  onSelectionChange?: (key: Key | null) => void;
  onInputChange?: (value: string) => void;
  className?: string;
  width?: "small" | "medium" | "large" | "full";
};

export const ComboBox = ({
  items,
  placeholder,
  disabled = false,
  error = false,
  value,
  onSelectionChange,
  onInputChange,
  className,
  width = "full",
}: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const comboBoxRef = useRef<HTMLDivElement>(null);

  // Sync inputValue with value prop changes
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onInputChange?.(newValue);
    setIsOpen(true); // Open when typing
  };

  const handleSelectionChange = (key: Key | null) => {
    if (key) {
      const selectedItem = items.find((item) => item.key === key.toString());
      if (selectedItem) {
        setInputValue(selectedItem.value);
      }
    }
    onSelectionChange?.(key);
    setIsOpen(false); // Close after selection
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    // Delay closing to allow for selection
    setTimeout(() => setIsOpen(false), 150);
  };

  // Calculate popover position when opening
  const updatePopoverPosition = () => {
    if (comboBoxRef.current) {
      const rect = comboBoxRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePopoverPosition();

      // Update position on scroll and resize
      const handleScroll = () => updatePopoverPosition();
      const handleResize = () => updatePopoverPosition();

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen]);

  // Filter items based on input value
  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <AriaComboBox
      className={className}
      isDisabled={disabled}
      onSelectionChange={handleSelectionChange}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      selectedKey={
        value ? items.find((item) => item.value === value)?.key : null
      }
    >
      <ComboBoxWrapper
        ref={comboBoxRef}
        focused={isOpen}
        disabled={disabled}
        error={error}
        width={width}
      >
        <ComboBoxInput
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <ComboBoxButton onClick={() => setIsOpen(!isOpen)}>
          <ChevronDown size={16} />
        </ComboBoxButton>{" "}
      </ComboBoxWrapper>
      {isOpen &&
        createPortal(
          <ComboBoxPopover
            style={{
              position: "fixed",
              top: popoverPosition.top,
              left: popoverPosition.left,
              width: popoverPosition.width,
              zIndex: 10000,
            }}
          >
            <ComboBoxListBox>
              {filteredItems?.map((item) => (
                <ComboBoxListBoxItem
                  key={item.key}
                  onClick={() => handleSelectionChange(item.key)}
                >
                  {item.value}
                </ComboBoxListBoxItem>
              ))}
            </ComboBoxListBox>
          </ComboBoxPopover>,
          document.body
        )}
    </AriaComboBox>
  );
};
