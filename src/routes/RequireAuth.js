import { useLocation, Navigate } from "react-router-dom";

import LoggedInLayout from "../layouts/LoggedInLayout";

import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn() ? (
    <LoggedInLayout />
  ) : (
    <Navigate to="/logowanie" state={{ from: location }} replace />
  );
};

export default RequireAuth;
