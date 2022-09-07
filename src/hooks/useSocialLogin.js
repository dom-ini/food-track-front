import { useContext } from "react";

import SocialLoginContext from "../contexts/SocialLoginProvider";

const useSocialLogin = () => {
  return useContext(SocialLoginContext);
};

export default useSocialLogin;
