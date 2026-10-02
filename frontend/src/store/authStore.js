import { create } from "zustand";
import {
  persist,
} from "zustand/middleware";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/authService";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({
          isLoading: true,
          error: null,
        });

        try {
          const response =
            await loginUser(credentials);

          const user =
            response.user;

          const token =
            response.token;

          if (token) {
            localStorage.setItem(
              "chronova_token",
              token
            );
          }

          set({
            user,
            token,
            isLoading: false,
            error: null,
          });

          return response;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });

          throw error;
        }
      },

      register: async (userData) => {
        set({
          isLoading: true,
          error: null,
        });

        try {
          const response =
            await registerUser(userData);

          const user =
            response.user;

          const token =
            response.token;

          if (token) {
            localStorage.setItem(
              "chronova_token",
              token
            );
          }

          set({
            user,
            token,
            isLoading: false,
            error: null,
          });

          return response;
        } catch (error) {
          set({
            isLoading: false,
            error: error.message,
          });

          throw error;
        }
      },

      logout: async () => {
        try {
          await logoutUser();
        } catch {
          // Backend logout failure should
          // not prevent local logout.
        }

        localStorage.removeItem(
          "chronova_token"
        );

        set({
          user: null,
          token: null,
          error: null,
        });
      },

      clearError: () =>
        set({
          error: null,
        }),
    }),
    {
      name: "chronova-auth",
    }
  )
);

export default useAuthStore;