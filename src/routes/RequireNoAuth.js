import { useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import NotLoggedInLayout from "../layouts/NotLoggedInLayout";

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
