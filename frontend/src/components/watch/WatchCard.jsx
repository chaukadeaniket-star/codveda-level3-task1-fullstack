import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

function PageTransition() {
  const transitionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const element = transitionRef.current;

    if (!element) return;

    const timeline = gsap.timeline();

    timeline
      .set(element, {
        transformOrigin: "bottom",
        scaleY: 1,
      })
      .to(element, {
        scaleY: 0,
        duration: 0.9,
        ease: "power4.inOut",
      });

  }, [location.pathname]);

  return (
    <div
      ref={transitionRef}
      className="page-transition"
    >
      <div className="page-transition-content">
        CHRONOVA
      </div>
    </div>
  );
}

export default PageTransition;