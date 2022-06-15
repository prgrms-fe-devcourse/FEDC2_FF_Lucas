import { useEffect, useRef } from "react";

const events = ["mousedown", "touchstart"];

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

    events.forEach(eventName =>
      document.addEventListener(eventName, eventHandler),
    );

    return () => {
      events.forEach(eventName =>
        document.removeEventListener(eventName, eventHandler),
      );
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
