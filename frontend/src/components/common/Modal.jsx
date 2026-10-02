import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  children,
  title = "",
  size = "medium",
}) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("no-scroll");

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className={`modal modal-${size}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2>{title}</h2>}

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;