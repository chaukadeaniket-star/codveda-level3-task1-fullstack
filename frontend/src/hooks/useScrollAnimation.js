import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useScrollAnimation({
  animation,
  start = "top 85%",
  end = "bottom 20%",
  scrub = false,
  once = true,
} = {}) {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element || !animation) {
      return;
    }

    const context = gsap.context(() => {
      animation(element, {
        trigger: element,
        start,
        end,
        scrub: scrub ? 1 : false,
        once: once && !scrub,
      });
    }, element);

    return () => {
      context.revert();
    };
  }, [
    animation,
    start,
    end,
    scrub,
    once,
  ]);

  return elementRef;
}

export default useScrollAnimation;