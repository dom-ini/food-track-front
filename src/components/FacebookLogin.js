import { FaFacebookF } from "react-icons/fa";

import SocialLoginButton from "./SocialLoginButton";

const FacebookLogin = ({ onTokenObtain, className }) => {
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

  return (
    <SocialLoginButton
      onClick={onClick}
      className={className}
      variant="facebook"
      text="Zaloguj przez Facebook"
      icon={<FaFacebookF className="me-3" />}
    />
  );
};

export default FacebookLogin;
