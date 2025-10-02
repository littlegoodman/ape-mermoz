import { useEffect, useState } from "react";

export function useDebounce<T>(
  value: T,
  delay?: number,
  onValueChange?: (value: T) => void
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      if (value !== debouncedValue) {
        onValueChange?.(value);
      }
    }, delay || 300);

    return () => {
      clearTimeout(timer);
    };
  }, [value, debouncedValue, delay, onValueChange]);

  return debouncedValue;
}
