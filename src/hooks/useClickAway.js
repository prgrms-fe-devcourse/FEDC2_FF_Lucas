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
      console.log(element, e.target);
      !element.contains(e.target) && savedHandler.current(e);
    };

    document.addEventListener("click", eventHandler);

    return () => {
      document.removeEventListener("click", eventHandler);
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
