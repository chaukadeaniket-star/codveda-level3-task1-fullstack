import { create } from "zustand";

import watches from "../data/watches";
import {
  getProducts,
} from "../services/productService";

const useProductStore = create(
  (set, get) => ({
    products: watches,

    selectedProduct: null,

    loading: false,

    error: null,

    filters: {
      category: "all",
      search: "",
      sort: "featured",
    },

    setProducts: (products) =>
      set({
        products,
      }),

    setSelectedProduct: (product) =>
      set({
        selectedProduct: product,
      }),

    setCategory: (category) =>
      set((state) => ({
        filters: {
          ...state.filters,
          category,
        },
      })),

    setSearch: (search) =>
      set((state) => ({
        filters: {
          ...state.filters,
          search,
        },
      })),

    setSort: (sort) =>
      set((state) => ({
        filters: {
          ...state.filters,
          sort,
        },
      })),

    resetFilters: () =>
      set({
        filters: {
          category: "all",
          search: "",
          sort: "featured",
        },
      }),

    fetchProducts: async () => {
      set({
        loading: true,
        error: null,
      });

      try {
        const response =
          await getProducts();

        const products =
          response.products ||
          response.data ||
          response;

        set({
          products,
          loading: false,
        });

        return products;
      } catch (error) {
        set({
          loading: false,
          error: error.message,
        });

        // Keep local demo products
        // available if backend isn't running.
        set({
          products: watches,
        });

        return watches;
      }
    },

    getFilteredProducts: () => {
      const {
        products,
        filters,
      } = get();

      let result = [...products];

      if (
        filters.category !== "all"
      ) {
        result = result.filter(
          (product) =>
            product.category
              .toLowerCase() ===
            filters.category.toLowerCase()
        );
      }

      if (filters.search) {
        const query =
          filters.search.toLowerCase();

        result = result.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(query) ||
            product.category
              .toLowerCase()
              .includes(query)
        );
      }

      switch (filters.sort) {
        case "low":
          result.sort(
            (a, b) =>
              a.price - b.price
          );
          break;

        case "high":
          result.sort(
            (a, b) =>
              b.price - a.price
          );
          break;

        case "rating":
          result.sort(
            (a, b) =>
              b.rating - a.rating
          );
          break;

        default:
          result.sort(
            (a, b) =>
              Number(b.featured) -
              Number(a.featured)
          );
      }

      return result;
    },
  })
);

export default useProductStore;