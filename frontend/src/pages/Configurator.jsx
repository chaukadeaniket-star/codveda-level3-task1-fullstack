import { useState } from "react";

import watches from "../data/watches";
import WatchConfigurator from "../components/watch/WatchConfigurator";
import ScrollReveal from "../components/animation/ScrollReveal";

function Configurator() {
  const [selectedWatch, setSelectedWatch] =
    useState(watches[0]);

  return (
    <div className="configurator-page">

      <section className="configurator-header section">

        <div className="container">

          <ScrollReveal animation="up">

            <span className="section-label">
              CHRONOVA / CONFIGURATOR
            </span>

            <h1 className="collection-title">
              Build your
              <br />
              <em>perfect timepiece.</em>
            </h1>

          </ScrollReveal>

        </div>

      </section>

      <section className="configurator-section section">

        <div className="container">

          <div className="config-watch-selector">

            {watches.slice(0, 4).map((watch) => (
              <button
                key={watch.id}
                className={
                  selectedWatch.id === watch.id
                    ? "selected-config-watch"
                    : ""
                }
                onClick={() =>
                  setSelectedWatch(watch)
                }
              >
                {watch.name}
              </button>
            ))}

          </div>

          <WatchConfigurator
            watch={selectedWatch}
          />

        </div>

      </section>

    </div>
  );
}

export default Configurator;