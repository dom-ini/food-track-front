import { useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import LoggedInLayout from "./LoggedInLayout";

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
