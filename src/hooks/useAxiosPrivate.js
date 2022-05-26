import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth, getAccessToken, getRefreshTokenValidity, logout, refresh } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        const valid = getRefreshTokenValidity();

        if (!valid) {
          logout();
          navigate("/logowanie");
        }

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          axiosPrivate.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [
    auth,
    getAccessToken,
    getRefreshTokenValidity,
    logout,
    navigate,
    refresh,
  ]);

  return axiosPrivate;
};

export default useAxiosPrivate;
