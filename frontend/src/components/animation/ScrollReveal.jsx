import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const presets = {
  up: {
    from: {
      opacity: 0,
      y: 80,
    },
    to: {
      opacity: 1,
      y: 0,
    },
  },

  down: {
    from: {
      opacity: 0,
      y: -80,
    },
    to: {
      opacity: 1,
      y: 0,
    },
  },

  left: {
    from: {
      opacity: 0,
      x: -100,
    },
    to: {
      opacity: 1,
      x: 0,
    },
  },

  right: {
    from: {
      opacity: 0,
      x: 100,
    },
    to: {
      opacity: 1,
      x: 0,
    },
  },

  scale: {
    from: {
      opacity: 0,
      scale: 0.85,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  },

  blur: {
    from: {
      opacity: 0,
      filter: "blur(20px)",
    },
    to: {
      opacity: 1,
      filter: "blur(0px)",
    },
  },
};

function ScrollReveal({
  children,
  animation = "up",
  duration = 1,
  delay = 0,
  stagger = 0,
  start = "top 85%",
  once = true,
  scrub = false,
  className = "",
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const preset =
        presets[animation] || presets.up;

      const targets =
        container.children.length > 1
          ? container.children
          : container;

      gsap.fromTo(
        targets,
        preset.from,
        {
          ...preset.to,

          duration,

          delay,

          stagger,

          ease: "power4.out",

          scrollTrigger: {
            trigger: container,
            start,
            once: once && !scrub,
            scrub: scrub ? 1 : false,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [
    animation,
    duration,
    delay,
    stagger,
    start,
    once,
    scrub,
  ]);

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;