import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmailConfirm = ({ isLoading, isSuccess }) => {
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

export default EmailConfirm;
