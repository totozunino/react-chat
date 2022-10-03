import { RefObject, useEffect } from "react";

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (ref?: RefObject<HTMLElement>) => void,
  togglerRef?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const el = ref?.current;

      if (togglerRef?.current === event.target) {
        return;
      }

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
