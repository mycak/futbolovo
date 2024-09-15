import { useEffect, useState } from "react";

export const useDebounce = (val: string | number | object, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(val);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val, delay]);
  return debounceValue;
};
