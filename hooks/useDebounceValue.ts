import { useEffect, useState } from "react";

export function useDebounceValue(query: string, time: number) {
  const [debouncevalue, setDebounceValue] = useState(query);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(query);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [query, time]);
  return debouncevalue;
}
