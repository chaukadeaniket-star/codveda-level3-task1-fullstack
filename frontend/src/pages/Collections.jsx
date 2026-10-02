import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";

import { Link } from "react-router-dom";

import watches from "../data/watches";

gsap.registerPlugin(ScrollTrigger);

function Collections() {
  const pageRef = useRef(null);

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("featured");

  const categories = [
    {
      label: "ALL WATCHES",
      value: "all",
    },
    {
      label: "AUTOMATIC",
      value: "automatic",
    },
    {
      label: "CHRONOGRAPH",
      value: "chronograph",
    },
    {
      label: "DIVE",
      value: "dive",
    },
    {
      label: "LUXURY",
      value: "luxury",
    },
    {
      label: "MINIMAL",
      value: "minimal",
    },
    {
      label: "SKELETON",
      value: "skeleton",
    },
  ];

  /* =========================================
     FILTER
  ========================================= */

  let filteredWatches =
    activeCategory === "all"
      ? [...watches]
      : watches.filter(
          (watch) =>
            watch.category === activeCategory
        );

  /* =========================================
     SORT
  ========================================= */

  if (sortBy === "price-low") {
    filteredWatches.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "price-high") {
    filteredWatches.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "rating") {
    filteredWatches.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sortBy === "featured") {
    filteredWatches.sort(
      (a, b) =>
        Number(b.featured) -
        Number(a.featured)
    );
  }

  /* =========================================
     PAGE ANIMATION
  ========================================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".collection-eyebrow", {
          opacity: 0,
          y: 25,
          duration: 0.6,
        })
        .from(
          ".collection-title",
          {
            opacity: 0,
            y: 80,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".collection-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".collection-toolbar",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.4"
        );

      gsap.utils
        .toArray(".watch-card")
        .forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            y: 70,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power3.out",

            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        });
    }, pageRef);

    return () => ctx.revert();
  }, [activeCategory, sortBy]);

  /* =========================================
     CATEGORY CHANGE
  ========================================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <main
      ref={pageRef}
      className="collections-page"
    >

      {/* =====================================
          HEADER
      ====================================== */}

      <section className="collections-header">

        <div className="container">

          <div className="collection-eyebrow">

            <span className="collection-eyebrow-line" />

            <span>
              THE CHRONOVA COLLECTION
            </span>

          </div>


          <h1 className="collection-title">

            Watches
            <span> with character.</span>

          </h1>


          <p className="collection-description">
            Explore precision timepieces designed
            around movement, material and modern
            watchmaking.
          </p>

        </div>

      </section>


      {/* =====================================
          CATEGORY FILTER
      ====================================== */}

      <section className="collection-filter-section">

        <div className="container">

          <div className="collection-categories">

            {categories.map((category) => (

              <button
                key={category.value}
                type="button"
                className={
                  activeCategory ===
                  category.value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(
                    category.value
                  )
                }
              >
                {category.label}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================
          TOOLBAR
      ====================================== */}

      <section className="collection-toolbar-section">

        <div className="container">

          <div className="collection-toolbar">

            <div className="collection-result">

              <span>
                {String(
                  filteredWatches.length
                ).padStart(2, "0")}
              </span>

              <span>
                {activeCategory === "all"
                  ? "ALL WATCHES"
                  : activeCategory.toUpperCase()}
              </span>

            </div>


            <div className="collection-sort">

              <SlidersHorizontal size={16} />

              <label htmlFor="watch-sort">
                SORT
              </label>

              <select
                id="watch-sort"
                className="sort-select"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >

                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Rating
                </option>

              </select>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          WATCH GRID
      ====================================== */}

      <section className="collection-products">

        <div className="container">

          {filteredWatches.length > 0 ? (

            <div className="watch-grid">

              {filteredWatches.map(
                (watch, index) => (

                  <Link
                    key={watch.id}
                    to={`/product/${watch.id}`}
                    className="watch-card"
                  >

                    {/* IMAGE */}

                    <div className="watch-card-image">

                      <div className="watch-card-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>


                      <img
                        src={watch.image}
                        alt={watch.name}
                        loading={
                          index < 4
                            ? "eager"
                            : "lazy"
                        }
                      />


                      <div className="watch-card-overlay">

                        <span>
                          VIEW WATCH
                        </span>

                        <ArrowUpRight
                          size={18}
                        />

                      </div>

                    </div>


                    {/* INFO */}

                    <div className="watch-card-info">

                      <div>

                        <span className="watch-card-category">

                          {watch.categoryLabel ||
                            watch.category}

                        </span>

                        <h2>
                          {watch.name}
                        </h2>

                      </div>


                      <div className="watch-card-price">

                        ₹
                        {watch.price.toLocaleString(
                          "en-IN"
                        )}

                      </div>

                    </div>


                    {/* BOTTOM */}

                    <div className="watch-card-meta">

                      <span>
                        {watch.rating} / 5
                      </span>

                      <span>
                        {watch.featured
                          ? "FEATURED"
                          : "CHRONOVA"}
                      </span>

                    </div>

                  </Link>

                )
              )}

            </div>

          ) : (

            <div className="collection-empty">

              <span>
                NO WATCHES FOUND
              </span>

              <p>
                Try another collection.
              </p>

              <button
                type="button"
                onClick={() =>
                  setActiveCategory("all")
                }
              >
                VIEW ALL WATCHES
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          BOTTOM STATEMENT
      ====================================== */}

      <section className="collection-statement">

        <div className="container">

          <span>
            CHRONOVA / 2026
          </span>

          <h2>
            Designed to be worn.
            <br />
            Built to be remembered.
          </h2>

          <Link
            to="/configurator"
            className="collection-configurator-link"
          >
            <span>
              Build your own
            </span>

            <ArrowUpRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Collections;