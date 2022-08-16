import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";

import PasswordRequirementsInput from "../components/PasswordRequirementsInput";

const PasswordResetForm = ({
  isSuccess,
  initialValues,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div>
      {isSuccess ? (
        <>
          <p>
            Hasło zostało zmienione poprawnie. Możesz teraz się zalogować,
            używając nowego hasła
          </p>
          <Link to="/logowanie">
            <Button variant="outline-primary" className="w-100">
              Przejdź do logowania
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h2 className="mb-3 text-center">Zresetuj hasło</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formPassword1" className="mb-2">
                  <Form.Label hidden>Nowe hasło</Form.Label>
                  <PasswordRequirementsInput
                    name="new_password1"
                    placeholder="Nowe hasło"
                    value={values.new_password1}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.new_password1 && errors?.new_password1}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.new_password1}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword2" className="mb-2">
                  <Form.Label hidden>Powtórz nowe hasło</Form.Label>
                  <Form.Control
                    type="password"
                    name="new_password2"
                    placeholder="Powtórz nowe hasło"
                    autoComplete="off"
                    value={values.new_password2}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.new_password2 && errors?.new_password2}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.new_password2}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100 mb-2"
                >
                  Ustaw nowe hasło
                </Button>
              </Form>
            )}
          </Formik>
          <Link to="/logowanie">
            <Button variant="outline-primary" className="w-100">
              Wróć do logowania
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default PasswordResetForm;
