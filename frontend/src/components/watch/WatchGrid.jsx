import WatchCard from "./WatchCard";
import ScrollReveal from "../animation/ScrollReveal";

function WatchGrid({
  watches = [],
  onAddToCart,
  onWishlist,
}) {
  if (!watches.length) {
    return (
      <div className="watch-grid-empty">
        <p>No watches found.</p>
      </div>
    );
  }

  return (
    <div className="watch-grid">

      {watches.map((watch, index) => (
        <ScrollReveal
          key={watch.id}
          animation="up"
          delay={index * 0.08}
        >
          <WatchCard
            watch={watch}
            onAddToCart={onAddToCart}
            onWishlist={onWishlist}
          />
        </ScrollReveal>
      ))}

    </div>
  );
}

export default WatchGrid;