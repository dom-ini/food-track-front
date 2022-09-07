import { FaFacebookF } from "react-icons/fa";

import SocialLoginButton from "./SocialLoginButton";

import useSocialLogin from "../hooks/useSocialLogin";

const FacebookLogin = ({ onTokenObtain, className }) => {
  const { handleFacebookLogin, isFacebookReady } = useSocialLogin();

  return (
    <SocialLoginButton
      onClick={() => handleFacebookLogin(onTokenObtain)}
      className={className}
      variant="facebook"
      text="Zaloguj przez Facebook"
      icon={<FaFacebookF className="me-3" />}
      disabled={!isFacebookReady}
    />
  );
};

export default FacebookLogin;
