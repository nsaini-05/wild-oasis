import { useEffect, useRef } from "react";
export const useOutsideClick = (handler, listenCapturing) => {
  const modalEl = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (modalEl.current && !modalEl.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick);
  }, [handler, listenCapturing]);

  return { modalEl };
};
