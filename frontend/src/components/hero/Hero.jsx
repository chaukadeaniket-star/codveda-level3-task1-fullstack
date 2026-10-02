import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";

import HeroWatch from "./HeroWatch";
import MagneticButton from "../animation/MagneticButton";

function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 30,
          duration: 0.8,
        })

        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 80,
            rotateX: -35,
            transformOrigin: "center bottom",
            duration: 1,
            stagger: 0.15,
          },
          "-=0.4"
        )

        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )

        .from(
          ".hero-actions",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )

        .from(
          ".hero-watch-container",
          {
            opacity: 0,
            scale: 0.85,
            y: 60,
            rotateY: -15,
            duration: 1.2,
          },
          "-=0.8"
        )

        .from(
          ".hero-side-info",
          {
            opacity: 0,
            x: 30,
            duration: 0.8,
          },
          "-=0.7"
        )

        .from(
          ".hero-bottom",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
    >
      {/* Background */}
      <div className="hero-background-grid" />

      <div className="hero-container container">

        {/* HERO CONTENT */}
        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />

            <span>
              Swiss Inspired · 2026 Collection
            </span>
          </div>

          <h1 className="hero-title">

            <span className="hero-title-line">
              Time,
            </span>

            <span className="hero-title-line hero-title-outline">
              Reimagined.
            </span>

          </h1>

          <p className="hero-description">
            Precision engineering meets timeless
            design. Discover watches created for
            those who measure moments differently.
          </p>

          {/* ACTIONS */}
          <div className="hero-actions">

            <MagneticButton
              className="hero-primary-button"
            >
              Discover Collection
            </MagneticButton>

            <button
              className="hero-explore-button"
              data-cursor-text="Explore"
            >
              <span>
                Explore
              </span>

              <ArrowRight size={16} />
            </button>

          </div>

        </div>

        {/* WATCH */}
        <div className="hero-watch-container">
          <HeroWatch />
        </div>

        {/* SIDE INFORMATION */}
        <div className="hero-side-info">

          <div className="hero-side-item">

            <span>01</span>

            <p>
              Precision
              <br />
              Movement
            </p>

          </div>

          <div className="hero-side-item">

            <span>02</span>

            <p>
              Hand Finished
              <br />
              Components
            </p>

          </div>

          <div className="hero-scroll">

            <span>
              Scroll to explore
            </span>

            <ArrowDownRight size={18} />

          </div>

        </div>

      </div>

      {/* BOTTOM INFORMATION */}
      <div className="hero-bottom">

        <span>
          CHRONOVA
        </span>

        <span>
          EST. 2026
        </span>

        <span>
          INDIA / WORLD
        </span>

      </div>

    </section>
  );
}

export default Hero;