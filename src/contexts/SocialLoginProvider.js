import { createContext, useEffect } from "react";

const SocialLoginContext = createContext();

/* global FB, google */

const socialMediaScriptsConfigs = [
  {
    id: "facebook-jssdk",
    src: "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v14.0",
    nonce: "v5K8akxY",
    crossorigin: "anonymous",
    async: true,
    defer: true,
  },
  {
    id: "google-client",
    src: "https://accounts.google.com/gsi/client",
    async: true,
    defer: true,
  },
];

export const SocialLoginProvider = ({ children }) => {
  useEffect(() => {
    const initFacebookSdk = () => {
      window.fbAsyncInit = () => {
        FB.init({
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          version: "v14.0",
        });
      };
    };

    const appendSocialLoginScriptsToHead = () => {
      for (let scriptConfig of socialMediaScriptsConfigs) {
        appendScriptToHead(scriptConfig);
      }
    };

    initFacebookSdk();
    appendSocialLoginScriptsToHead();
  }, []);

  const appendScriptToHead = (tagConfig) => {
    if (document.getElementById(tagConfig.id)) return;
    let script = Object.assign(document.createElement("script"), tagConfig);
    document.head.appendChild(script);
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
