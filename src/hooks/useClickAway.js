import { useEffect, useRef } from "react";

const useClickAway = handler => {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    const eventHandler = e => {
      !element.contains(e.target) && savedHandler.current(e);
    };

    document.addEventListener("mousedown", eventHandler);

    return () => {
      document.removeEventListener("mousedown", eventHandler);
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
