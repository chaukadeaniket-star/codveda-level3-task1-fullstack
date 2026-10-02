import { ArrowRight, Sparkles } from "lucide-react";

import Hero from "../components/hero/Hero";
import WatchGrid from "../components/watch/WatchGrid";
import ScrollReveal from "../components/animation/ScrollReveal";
import MagneticButton from "../components/animation/MagneticButton";

import watches from "../data/watches";


function Home() {
  const featuredWatches = watches.filter(
    (watch) => watch.featured
  );

  return (
    <div className="home-page">

      <Hero />

      {/* INTRO */}
      <section className="home-intro section">
        <div className="container home-intro-grid">

          <ScrollReveal animation="left">
            <div className="home-intro-number">
              01
            </div>
          </ScrollReveal>

          <ScrollReveal animation="up">
            <div className="home-intro-content">

              <span className="section-label">
                The Chronova Philosophy
              </span>

              <h2>
                Time should not simply be measured.
                <span> It should be experienced.</span>
              </h2>

              <p>
                Every Chronova watch is designed around
                precision, proportion and the belief that
                great design should remain timeless.
              </p>

              <MagneticButton
                variant="secondary"
                icon={false}
              >
                Discover Our Story
                <ArrowRight size={16} />
              </MagneticButton>

            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* FEATURED */}
      <section className="home-featured section">

        <div className="container">

          <ScrollReveal animation="up">
            <div className="section-header">

              <div>
                <span className="section-label">
                  02 / Collection
                </span>

                <h2 className="section-title">
                  Featured
                </h2>
              </div>

              <p className="section-description">
                Discover a selection of our most
                distinctive timepieces.
              </p>

            </div>
          </ScrollReveal>

          <WatchGrid
            watches={featuredWatches}
          />

        </div>

      </section>

      {/* BRAND STATEMENT */}
      <section className="home-statement section">

        <div className="container">

          <ScrollReveal animation="scale">

            <div className="statement-card">

              <div className="statement-icon">
                <Sparkles size={20} />
              </div>

              <span>
                Crafted for the extraordinary
              </span>

              <h2>
                Precision
                <br />
                <em>in every second.</em>
              </h2>

              <p>
                From the movement inside to the smallest
                finishing detail outside.
              </p>

            </div>

          </ScrollReveal>

        </div>

      </section>

      {/* CTA */}
      <section className="home-cta">

        <div className="container">

          <span className="section-label">
            Begin Your Journey
          </span>

          <h2>
            Find the watch
            <br />
            that defines your time.
          </h2>

          <MagneticButton>
            Explore Collection
          </MagneticButton>

        </div>

      </section>

    </div>
  );
}

export default Home;