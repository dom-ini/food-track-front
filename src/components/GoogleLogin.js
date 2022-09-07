import { FaGoogle } from "react-icons/fa";

import SocialLoginButton from "./SocialLoginButton";

import useSocialLogin from "../hooks/useSocialLogin";

const GoogleLogin = ({ onTokenObtain, className }) => {
  const { handleGoogleLogin } = useSocialLogin();

  return (
    <SocialLoginButton
      onClick={() => handleGoogleLogin(onTokenObtain)}
      className={className}
      variant="google"
      text="Zaloguj przez Google"
      icon={<FaGoogle className="me-3" />}
    />
  );
};

export default GoogleLogin;
