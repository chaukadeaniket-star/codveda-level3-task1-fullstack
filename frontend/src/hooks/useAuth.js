import { useMemo } from "react";
import useAuthStore from "../store/authStore";

function useAuth() {
  const user = useAuthStore(
    (state) => state.user
  );

  const token = useAuthStore(
    (state) => state.token
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  const error = useAuthStore(
    (state) => state.error
  );

  const login = useAuthStore(
    (state) => state.login
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const register = useAuthStore(
    (state) => state.register
  );

  const isAuthenticated = useMemo(
    () => Boolean(user && token),
    [user, token]
  );

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
  };
}

export default useAuth;