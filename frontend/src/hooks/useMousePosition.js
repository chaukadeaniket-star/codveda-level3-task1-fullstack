import { useEffect, useRef, useState } from "react";

function useMousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const frameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        setPosition({
          x: event.clientX,
          y: event.clientY,

          normalizedX:
            event.clientX / window.innerWidth - 0.5,

          normalizedY:
            event.clientY / window.innerHeight - 0.5,
        });
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return position;
}

export default useMousePosition;