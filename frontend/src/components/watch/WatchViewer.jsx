import { useState } from "react";
import {
  Maximize2,
  Rotate3D,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

function WatchViewer({
  image,
  name = "Luxury Watch",
}) {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const handleDrag = (event) => {
    if (event.movementX) {
      setRotation(
        (previous) =>
          previous + event.movementX * 0.4
      );
    }
  };

  return (
    <div className="watch-viewer">

      <div className="watch-viewer-header">

        <div>
          <span>Interactive Viewer</span>
          <small>
            Drag to rotate
          </small>
        </div>

        <Rotate3D size={18} />

      </div>

      <div
        className="watch-viewer-stage"
        onMouseMove={(event) => {
          if (event.buttons === 1) {
            handleDrag(event);
          }
        }}
      >

        <div
          className="watch-viewer-object"
          style={{
            transform: `
              perspective(1000px)
              rotateY(${rotation}deg)
              scale(${scale})
            `,
          }}
        >
          <img
            src={image}
            alt={name}
            draggable="false"
          />
        </div>

      </div>

      <div className="watch-viewer-controls">

        <button
          onClick={() =>
            setScale(
              Math.max(0.7, scale - 0.1)
            )
          }
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>

        <span>
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={() =>
            setScale(
              Math.min(1.5, scale + 0.1)
            )
          }
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>

        <button
          onClick={() => setRotation(0)}
          aria-label="Reset rotation"
        >
          <Maximize2 size={15} />
        </button>

      </div>

    </div>
  );
}

export default WatchViewer;