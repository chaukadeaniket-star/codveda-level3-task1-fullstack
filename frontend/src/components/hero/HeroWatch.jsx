import { useRef } from "react";
import gsap from "gsap";

function HeroWatch() {
  const watchRef = useRef(null);

  const handleMouseMove = (event) => {
    const element = watchRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(element, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(watchRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      className="hero-watch"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-watch-glow" />

      <div
        ref={watchRef}
        className="hero-watch-image"
      >
        <img
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=90"
          alt="Luxury Chronova watch"
        />
      </div>

      <div className="hero-watch-orbit hero-orbit-one" />
      <div className="hero-watch-orbit hero-orbit-two" />

      <div className="hero-watch-label">
        <span>01</span>
        <span>CHRONOVA</span>
      </div>
    </div>
  );
}

export default HeroWatch;