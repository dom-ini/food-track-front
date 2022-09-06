import { useEffect } from "react";

import FacebookLoginButton from "./FacebookLoginButton";

const FacebookLogin = ({ onTokenObtain, appId, className }) => {
  useEffect(() => {
    initFacebookSdk();
  }, []);

  const initFacebookSdk = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        version: "v14.0",
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/pl_PL/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  const onClick = () => {
    let token = window.FB.getAccessToken();

    if (token) {
      onTokenObtain(token);
      return;
    }

    window.FB.Event.subscribe("auth.statusChange", (response) => {
      if (response?.status === "connected") {
        token = response.authResponse.accessToken;
        onTokenObtain(token);
      }
    });
    window.FB.login();
  };

  return <FacebookLoginButton onClick={onClick} className={className} />;
};

export default FacebookLogin;
