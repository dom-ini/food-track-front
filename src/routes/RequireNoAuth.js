import { useLocation, Navigate } from "react-router-dom";

import NotLoggedInLayout from "../layouts/NotLoggedInLayout";

import useAuth from "../hooks/useAuth";

const RequireNoAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn() ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <NotLoggedInLayout />
  );
};

export default RequireNoAuth;
