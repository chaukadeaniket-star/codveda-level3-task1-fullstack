import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowDownRight,
  ArrowUpRight,
  MoveRight,
} from "lucide-react";

import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* =====================================
         HERO ANIMATION
      ====================================== */

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".about-eyebrow", {
        opacity: 0,
        y: 30,
        duration: 0.7,
      })

        .from(
          ".about-title-line",
          {
            opacity: 0,
            y: 100,
            rotateX: -25,
            transformOrigin: "center bottom",
            duration: 1,
            stagger: 0.12,
          },
          "-=0.3"
        )

        .from(
          ".about-intro",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )

        .from(
          ".about-hero-meta",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        );


      /* =====================================
         SCROLL REVEALS
      ====================================== */

      gsap.utils
        .toArray(".about-reveal")
        .forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          });
        });


      /* =====================================
         STAT NUMBER ANIMATION
      ====================================== */

      gsap.utils
        .toArray(".about-stat strong")
        .forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,

            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          });
        });


      /* =====================================
         VALUE HOVER
      ====================================== */

      gsap.utils
        .toArray(".about-value")
        .forEach((value) => {
          const arrow =
            value.querySelector("svg");

          if (!arrow) return;

          const enter = () => {
            gsap.to(arrow, {
              x: 8,
              y: -8,
              rotate: 5,
              duration: 0.35,
              ease: "power3.out",
            });
          };

          const leave = () => {
            gsap.to(arrow, {
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.45,
              ease: "power3.out",
            });
          };

          value.addEventListener(
            "mouseenter",
            enter
          );

          value.addEventListener(
            "mouseleave",
            leave
          );

          value._aboutEnter = enter;
          value._aboutLeave = leave;
        });

    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const currentYear =
    new Date().getFullYear();

  return (
    <main
      ref={pageRef}
      className="about-page"
    >

      {/* =====================================
          HERO
      ====================================== */}

      <section className="about-hero">

        <div className="about-hero-grid" />

        <div className="container">

          <div className="about-eyebrow">

            <span className="about-line" />

            <span>
              THE CHRONOVA PHILOSOPHY
            </span>

          </div>


          <h1 className="about-title">

            <span className="about-title-line">
              We don't
            </span>

            <span
              className="
                about-title-line
                about-title-outline
              "
            >
              measure time.
            </span>

            <span className="about-title-line">
              We design it.
            </span>

          </h1>


          <div className="about-intro">

            <p>
              CHRONOVA exists at the intersection
              of precision engineering, contemporary
              design and the human experience of time.
            </p>

            <div className="about-scroll-indicator">

              <span>
                SCROLL TO DISCOVER
              </span>

              <ArrowDownRight size={18} />

            </div>

          </div>


          <div className="about-hero-meta">

            <span>
              EST. 2026
            </span>

            <span>
              INDIA / WORLD
            </span>

            <span>
              PRECISION / DESIGN / TIME
            </span>

          </div>

        </div>

      </section>


      {/* =====================================
          STORY
      ====================================== */}

      <section
        className="
          about-story
          about-reveal
        "
      >

        <div
          className="
            container
            about-two-column
          "
        >

          <div className="about-section-number">
            01
          </div>

          <div>

            <span className="about-section-label">
              OUR STORY
            </span>

            <h2>
              Every second has
              <br />
              a character.
            </h2>

            <p>
              A watch should be more than an
              instrument that tells you what time
              it is. It should become part of how
              you experience that time.
            </p>

            <p>
              CHRONOVA was created around a simple
              idea: combine modern visual language
              with the discipline of traditional
              watchmaking.
            </p>

            <p>
              From the geometry of the case to the
              movement inside it, every detail
              exists for a reason.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          NUMBERS
      ====================================== */}

      <section
        className="
          about-numbers
          about-reveal
        "
      >

        <div className="container">

          <div className="about-section-label">
            BUILT AROUND PRECISION
          </div>

          <div className="about-stats">

            <div className="about-stat">

              <strong>
                01
              </strong>

              <span>
                Design Language
              </span>

            </div>


            <div className="about-stat">

              <strong>
                24
              </strong>

              <span>
                Hours / Day
              </span>

            </div>


            <div className="about-stat">

              <strong>
                60
              </strong>

              <span>
                Minutes / Hour
              </span>

            </div>


            <div className="about-stat">

              <strong>
                {currentYear}
              </strong>

              <span>
                Current Era
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          PHILOSOPHY
      ====================================== */}

      <section
        className="
          about-philosophy
          about-reveal
        "
      >

        <div className="container">

          <span className="about-section-label">
            02 / PHILOSOPHY
          </span>

          <h2 className="about-big-statement">

            Precision is not about

            <span>
              {" "}perfection.
            </span>

            <br />

            It is about intention.

          </h2>

        </div>

      </section>


      {/* =====================================
          VALUES
      ====================================== */}

      <section className="about-values">

        <div className="container">

          <div className="about-section-label">
            03 / WHAT WE BELIEVE
          </div>

          <div className="about-values-list">

            <article
              className="
                about-value
                about-reveal
              "
            >

              <span>
                01
              </span>

              <div>

                <h3>
                  Precision
                </h3>

                <p>
                  Every component begins with
                  purpose. Accuracy is built into
                  the smallest decisions.
                </p>

              </div>

              <ArrowUpRight size={22} />

            </article>


            <article
              className="
                about-value
                about-reveal
              "
            >

              <span>
                02
              </span>

              <div>

                <h3>
                  Character
                </h3>

                <p>
                  A CHRONOVA watch is designed to
                  develop a relationship with its
                  owner over time.
                </p>

              </div>

              <ArrowUpRight size={22} />

            </article>


            <article
              className="
                about-value
                about-reveal
              "
            >

              <span>
                03
              </span>

              <div>

                <h3>
                  Progress
                </h3>

                <p>
                  Tradition gives us the foundation.
                  Technology gives us the freedom
                  to evolve.
                </p>

              </div>

              <ArrowUpRight size={22} />

            </article>

          </div>

        </div>

      </section>


      {/* =====================================
          FINAL CTA
      ====================================== */}

      <section
        className="
          about-final
          about-reveal
        "
      >

        <div className="container">

          <span className="about-section-label">
            THE NEXT SECOND
          </span>

          <h2>
            Your time.
            <br />
            Your story.
          </h2>

          <Link
            to="/collections"
            className="about-cta"
          >

            <span>
              Explore the collection
            </span>

            <MoveRight size={20} />

          </Link>

        </div>

      </section>


      {/* =====================================
          FOOTER META
      ====================================== */}

      <div className="about-bottom">

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

    </main>
  );
}

export default About;