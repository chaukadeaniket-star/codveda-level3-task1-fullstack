import { Check, X, AlertTriangle, Info } from "lucide-react";

const icons = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
};

function Toast({
  message,
  type = "success",
  onClose,
}) {
  const Icon = icons[type] || Check;

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        <Icon size={16} />
      </div>

      <p>{message}</p>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export default Toast;