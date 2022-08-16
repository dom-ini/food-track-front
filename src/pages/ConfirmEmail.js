import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";

import useAuth from "../hooks/useAuth";

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verifyEmail } = useAuth();
  const { key } = useParams();

  useEffect(() => {
    const sendVerificationKey = async () => {
      try {
        await verifyEmail({ key }).then(() => {
          setIsSuccess(true);
        });
      } catch (err) {
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    sendVerificationKey();
  }, [key, verifyEmail]);
  return (
    <div>
      <h2 className="mb-3 text-center">Aktywacja konta</h2>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      ) : isSuccess ? (
        <p>Konto zostało aktywowane!</p>
      ) : (
        <p>Nieprawidłowy kod aktywujący!</p>
      )}
      {!isLoading && (
        <Link to="/logowanie">
          <Button variant="outline-primary" className="w-100">
            Przejdź do logowania
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ConfirmEmail;
