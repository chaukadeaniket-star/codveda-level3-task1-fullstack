import { useRef } from "react";
import gsap from "gsap";

function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  ...props
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x =
      event.clientX -
      (rect.left + rect.width / 2);

    const y =
      event.clientY -
      (rect.top + rect.height / 2);

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;

    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

export default MagneticButton;