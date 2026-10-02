import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Parallax({
  children,
  speed = 20,
  direction = "y",
  className = "",
  scrub = true,
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const ctx = gsap.context(() => {
      const movement = speed * -1;

      const animation = {
        [direction]: movement,
      };

      gsap.to(content, {
        ...animation,

        ease: "none",

        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: scrub ? 1 : false,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [speed, direction, scrub]);

  return (
    <div
      ref={containerRef}
      className={`parallax-container ${className}`}
    >
      <div
        ref={contentRef}
        className="parallax-content"
      >
        {children}
      </div>
    </div>
  );
}

export default Parallax;