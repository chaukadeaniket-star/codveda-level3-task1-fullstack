import { Heart } from "lucide-react";

import watches from "../data/watches";
import WatchGrid from "../components/watch/WatchGrid";

function Wishlist() {
  const wishlist = watches.slice(0, 3);

  return (
    <div className="wishlist-page section">

      <div className="container">

        <div className="page-heading">

          <span className="section-label">
            Your Collection
          </span>

          <h1>
            Wishlist
          </h1>

          <p>
            Timepieces you've chosen to keep an eye on.
          </p>

        </div>

        {wishlist.length > 0 ? (
          <WatchGrid watches={wishlist} />
        ) : (
          <div className="empty-page">
            <Heart size={30} />

            <h2>
              Your wishlist is empty.
            </h2>

            <p>
              Save watches you love and find them here.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Wishlist;