import { createContext, useEffect } from "react";

const SocialLoginContext = createContext();

/* global FB, google */

export const SocialLoginProvider = ({ children }) => {
  useEffect(() => {
    initFacebookSdk();
  }, []);

  const initFacebookSdk = () => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        version: "v14.0",
      });
    };
  };

  const handleFacebookLogin = (onTokenObtain) => {
    let token = FB.getAccessToken();

    if (token) {
      onTokenObtain(token);
      return;
    }

    FB.Event.subscribe("auth.statusChange", (response) => {
      if (response?.status === "connected") {
        token = response.authResponse.accessToken;
        onTokenObtain(token);
      }
    });
    FB.login();
  };

  const handleGoogleLogin = (onTokenObtain) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "email profile openid",
      callback: (response) => {
        onTokenObtain(response.access_token);
      },
    });
    client.requestAccessToken();
  };

  return (
    <SocialLoginContext.Provider
      value={{
        handleFacebookLogin,
        handleGoogleLogin,
      }}
    >
      {children}
    </SocialLoginContext.Provider>
  );
};

export default SocialLoginContext;
