import { RefObject, useEffect } from "react";

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
