import { Link } from "react-router-dom";
import MagneticButton from "../components/animation/MagneticButton";

function NotFound() {
  return (
    <div className="not-found-page">

      <span className="not-found-number">
        404
      </span>

      <h1>
        This moment
        <br />
        doesn't exist.
      </h1>

      <p>
        The page you're looking for has moved
        somewhere beyond time.
      </p>

      <Link to="/">
        <MagneticButton>
          Return Home
        </MagneticButton>
      </Link>

    </div>
  );
}

export default NotFound;