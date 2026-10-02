import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function RevealText({
  children,
  className = "",
  type = "words",
  delay = 0,
  duration = 1,
  stagger = 0.06,
  y = 100,
  triggerStart = "top 85%",
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const elements = container.querySelectorAll(
        type === "lines"
          ? ".reveal-line"
          : ".reveal-word"
      );

      gsap.fromTo(
        elements,
        {
          y,
          opacity: 0,
          rotateX: type === "words" ? -70 : 0,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,

          duration,

          delay,

          stagger,

          ease: "power4.out",

          scrollTrigger: {
            trigger: container,
            start: triggerStart,
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [
    type,
    delay,
    duration,
    stagger,
    y,
    triggerStart,
  ]);

  const renderWords = () => {
    const text = String(children);

    return text.split(" ").map((word, index) => (
      <span
        key={`${word}-${index}`}
        className="reveal-word-wrapper"
      >
        <span className="reveal-word">
          {word}
        </span>
        {index < text.split(" ").length - 1 && " "}
      </span>
    ));
  };

  return (
    <span
      ref={containerRef}
      className={`reveal-text ${className}`}
    >
      {type === "words" ? renderWords() : children}
    </span>
  );
}

export default RevealText;