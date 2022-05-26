import { createContext, useState } from "react";
import { Alert } from "react-bootstrap";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const onAlertHide = () => setIsVisible(false);

  const resetAlertTimeout = () => {
    clearTimeout(window.alertTimeout);
    window.alertTimeout = setTimeout(() => setIsVisible(false), 5000);
  }

  const show = (message, alertVariant) => {
    resetAlertTimeout();
    setMessage(message);
    setVariant(alertVariant);
    setIsVisible(true);
  };

  const danger = (message) => {
    show(message, "danger");
  };

  const success = (message) => {
    show(message, "primary");
  };

  const warning = (message) => {
    show(message, "warning");
  }

  return (
    <AlertContext.Provider value={{ danger, success, warning }}>
      {children}
      <Alert
        variant={variant}
        className="global-alert"
        show={isVisible}
        dismissible
        onClose={onAlertHide}
      >
        {message}
      </Alert>
    </AlertContext.Provider>
  );
};

export default AlertContext;
