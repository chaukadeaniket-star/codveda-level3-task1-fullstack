import { useState } from "react";
import WatchViewer from "./WatchViewer";

function WatchConfigurator({
  watch,
}) {
  const [selectedStrap, setSelectedStrap] =
    useState(watch?.straps?.[0] || "Steel");

  const [selectedDial, setSelectedDial] =
    useState(watch?.dials?.[0] || "Black");

  const [selectedCase, setSelectedCase] =
    useState(watch?.cases?.[0] || "Silver");

  if (!watch) return null;

  return (
    <section className="watch-configurator">

      <div className="configurator-preview">

        <WatchViewer
          image={watch.image}
          name={watch.name}
        />

      </div>

      <div className="configurator-options">

        <span className="configurator-label">
          Configure your watch
        </span>

        <h2>
          Make it yours.
        </h2>

        <div className="config-option">

          <label>
            Case
          </label>

          <div className="config-buttons">

            {watch.cases?.map((item) => (
              <button
                key={item}
                className={
                  selectedCase === item
                    ? "config-selected"
                    : ""
                }
                onClick={() =>
                  setSelectedCase(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        <div className="config-option">

          <label>
            Dial
          </label>

          <div className="config-buttons">

            {watch.dials?.map((item) => (
              <button
                key={item}
                className={
                  selectedDial === item
                    ? "config-selected"
                    : ""
                }
                onClick={() =>
                  setSelectedDial(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        <div className="config-option">

          <label>
            Strap
          </label>

          <div className="config-buttons">

            {watch.straps?.map((item) => (
              <button
                key={item}
                className={
                  selectedStrap === item
                    ? "config-selected"
                    : ""
                }
                onClick={() =>
                  setSelectedStrap(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

        </div>

        <div className="configuration-summary">

          <div>
            <span>Case</span>
            <strong>{selectedCase}</strong>
          </div>

          <div>
            <span>Dial</span>
            <strong>{selectedDial}</strong>
          </div>

          <div>
            <span>Strap</span>
            <strong>{selectedStrap}</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WatchConfigurator;