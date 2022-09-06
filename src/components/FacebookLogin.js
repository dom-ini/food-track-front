import FacebookLoginButton from "./FacebookLoginButton";

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

  return <FacebookLoginButton onClick={onClick} className={className} />;
};

export default FacebookLogin;
