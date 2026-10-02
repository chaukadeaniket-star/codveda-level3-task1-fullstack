import {
  Gauge,
  ShieldCheck,
  Droplets,
  Gem,
} from "lucide-react";

function WatchSpecs({
  watch,
}) {
  const specs = [
    {
      icon: Gauge,
      label: "Movement",
      value: watch?.movement || "Automatic",
    },
    {
      icon: ShieldCheck,
      label: "Case",
      value: watch?.caseMaterial || "316L Steel",
    },
    {
      icon: Droplets,
      label: "Water Resistance",
      value: watch?.waterResistance || "100M",
    },
    {
      icon: Gem,
      label: "Crystal",
      value: watch?.crystal || "Sapphire",
    },
  ];

  return (
    <div className="watch-specs">

      {specs.map(
        ({
          icon: Icon,
          label,
          value,
        }) => (
          <div
            className="watch-spec"
            key={label}
          >
            <div className="watch-spec-icon">
              <Icon size={17} />
            </div>

            <div>
              <span>
                {label}
              </span>

              <strong>
                {value}
              </strong>
            </div>
          </div>
        )
      )}

    </div>
  );
}

export default WatchSpecs;