import { useEffect, useRef } from "react";

// https://usehooks.com/usePrevious/
export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
