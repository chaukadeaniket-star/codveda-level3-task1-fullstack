
function Skeleton({
  width = "100%",
  height = "20px",
  radius = "4px",
  className = "",
}) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
    />
  );
}

export default Skeleton;