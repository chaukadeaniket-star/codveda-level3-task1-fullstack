import { ArrowRight } from "lucide-react";

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant} ${className}`}
    >
      <span>{children}</span>

      {variant === "primary" && (
        <ArrowRight size={16} />
      )}
    </button>
  );
}

export default Button;