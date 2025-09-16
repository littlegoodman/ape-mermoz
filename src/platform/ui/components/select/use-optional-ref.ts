import React from "react";

export const useOptionalRef = <T>(ref: React.ForwardedRef<T>) => {
  const fallbackRef = React.useRef<T>(null);
  if (ref === null) {
    return fallbackRef as React.RefObject<T>;
  }
  return ref as React.RefObject<T>;
};
