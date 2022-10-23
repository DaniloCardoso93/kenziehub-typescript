import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/user";

export function ProtectedRoutes() {
  const { user, loading } = useUserContext();
  const location = useLocation();

  if (loading) {
    return null;
  }
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
