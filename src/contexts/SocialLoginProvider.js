import { createContext, useEffect, useState } from "react";

const SocialLoginContext = createContext();

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/* global FB, google */

export const SocialLoginProvider = ({ children }) => {
  const [isFacebookReady, setIsFacebookReady] = useState(false);

  useEffect(() => {
    initFacebookSdk();
  }, []);

  const initFacebookSdk = () => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: facebookAppId,
        version: "v14.0",
      });
      setIsFacebookReady(true);
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
      client_id: googleClientId,
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
        isFacebookReady,
        handleFacebookLogin,
        handleGoogleLogin,
      }}
    >
      {children}
    </SocialLoginContext.Provider>
  );
};

export default SocialLoginContext;
