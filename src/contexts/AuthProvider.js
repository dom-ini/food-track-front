import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

import axios from "../api/axios";
import AuthStorageService from "../services/AuthStorageService";

import ENDPOINTS from "../globals/endpoints";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() =>
    AuthStorageService.getUserFromStorage()
  );

  const isLoggedIn = () => {
    const user = AuthStorageService.getUserFromStorage();
    return !!user;
  };

  const getAccessToken = () => {
    const accessToken = AuthStorageService.getAccessTokenFromStorage();
    return accessToken;
  };

  const getTokenValidity = (token) => {
    const decodedToken = jwt_decode(token);
    const dateNow = new Date();
    const timeStamp = dateNow.getTime() / 1000;

    if (decodedToken.exp < timeStamp) {
      return false;
    }
    return true;
  };

  const getRefreshTokenValidity = () => {
    const refreshToken = AuthStorageService.getRefreshTokenFromStorage();

    if (refreshToken) {
      return getTokenValidity(refreshToken);
    }

    return false;
  };

  const login = async ({ email, password }) => {
    return await axios
      .post(ENDPOINTS.LOGIN_URL, { email, password })
      .then((response) => {
        if (response?.data?.access_token) {
          const user = response.data;
          AuthStorageService.setUserInStorage(user);
          setAuth(user);
        }
      });
  };

  const logout = () => {
    AuthStorageService.removeUserFromStorage();
    setAuth({});
  };

  const refresh = async () => {
    const refreshToken = AuthStorageService.getRefreshTokenFromStorage();

    const response = await axios
      .post(ENDPOINTS.REFRESH_URL, { refresh: refreshToken })
      .then((res) => {
        if (res.status === 200) {
          const user = AuthStorageService.updateTokensInStorage(res.data);
          setAuth(user);
          return res.data.access;
        }
      });
    return response;
  };

  const register = async ({ email, password1, password2 }) => {
    return await axios
      .post(ENDPOINTS.REGISTER_URL, { email, password1, password2 })
      .then((response) => {});
  };

  const resetPasswordRequest = async ({ email }) => {
    return await axios
      .post(ENDPOINTS.RESET_PASSWORD_REQUEST_URL, { email })
      .then((response) => {});
  };

  const verifyEmail = async ({ key }) => {
    return await axios
      .post(ENDPOINTS.VERIFY_EMAIL_URL, { key })
      .then((response) => {});
  };

  const resendVerificationEmail = async ({ email }) => {
    return await axios
      .post(ENDPOINTS.RESEND_VERIFY_EMAIL_URL, { email })
      .then((response) => {});
  };

  const resetPassword = async ({
    new_password1,
    new_password2,
    uid,
    token,
  }) => {
    return await axios
      .post(ENDPOINTS.RESET_PASSWORD_URL, {
        new_password1,
        new_password2,
        uid,
        token,
      })
      .then((response) => {});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isLoggedIn,
        getAccessToken,
        getRefreshTokenValidity,
        login,
        logout,
        refresh,
        register,
        resetPasswordRequest,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
