import { createContext, useCallback, useState } from "react";
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
  };

  const show = useCallback((message, alertVariant) => {
    resetAlertTimeout();
    setMessage(message);
    setVariant(alertVariant);
    setIsVisible(true);
  }, []);

  const alertDanger = useCallback(
    (message) => {
      show(message, "danger");
    },
    [show]
  );

  const alertSuccess = useCallback(
    (message) => {
      show(message, "primary");
    },
    [show]
  );

  const alertWarning = useCallback(
    (message) => {
      show(message, "warning");
    },
    [show]
  );

  return (
    <AlertContext.Provider value={{ alertDanger, alertSuccess, alertWarning }}>
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
