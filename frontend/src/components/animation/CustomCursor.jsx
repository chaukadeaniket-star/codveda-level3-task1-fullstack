import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const isTouchDevice =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    const cursorX = gsap.quickTo(cursor, "x", {
      duration: 0.12,
      ease: "power3",
    });

    const cursorY = gsap.quickTo(cursor, "y", {
      duration: 0.12,
      ease: "power3",
    });

    const followerX = gsap.quickTo(follower, "x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const followerY = gsap.quickTo(follower, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const moveCursor = (event) => {
      cursorX(event.clientX);
      cursorY(event.clientY);

      followerX(event.clientX);
      followerY(event.clientY);
    };

    const enterInteractive = (event) => {
      const element = event.currentTarget;

      const cursorText = element.dataset.cursorText;

      follower.classList.add("cursor-active");

      if (cursorText) {
        follower.dataset.text = cursorText;
        follower.classList.add("cursor-text");
      }

      gsap.to(follower, {
        scale: 1.8,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.25,
      });
    };

    const leaveInteractive = () => {
      follower.classList.remove("cursor-active");
      follower.classList.remove("cursor-text");
      delete follower.dataset.text;

      gsap.to(follower, {
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.25,
      });
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor], input, textarea, select"
    );

    window.addEventListener("mousemove", moveCursor);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", enterInteractive);
      element.addEventListener("mouseleave", leaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", enterInteractive);
        element.removeEventListener("mouseleave", leaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        aria-hidden="true"
      />

      <div
        ref={followerRef}
        className="cursor-follower"
        aria-hidden="true"
      />
    </>
  );
}

export default CustomCursor;