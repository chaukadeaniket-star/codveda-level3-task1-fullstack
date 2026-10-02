
function Loader({
  size = "medium",
  text = "",
  fullscreen = false,
}) {
  return (
    <div
      className={`loader-wrapper loader-${size} ${
        fullscreen ? "loader-fullscreen" : ""
      }`}
    >
      <div className="luxury-loader">
        <span />
        <span />
        <span />
      </div>

      {text && <p>{text}</p>}
    </div>
  );
}

export default Loader;