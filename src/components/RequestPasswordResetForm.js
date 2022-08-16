import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";

const RequestPasswordResetForm = ({
  isSuccess,
  initialValues,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div>
      <h2 className="mb-3 text-center">Zresetuj hasło</h2>
      {isSuccess ? (
        <>
          <p>
            Jeśli podany adres e-mail istnieje w bazie, otrzymasz na niego
            wiadomość z linkiem do zresetowania hasła
          </p>
          <Link to="/logowanie">
            <Button variant="outline-primary" className="w-100">
              Przejdź do logowania
            </Button>
          </Link>
        </>
      ) : (
        <>
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
                <Form.Group controlId="formEmail" className="mb-2">
                  <Form.Label hidden>Adres e-mail</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Adres e-mail"
                    value={values.email}
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors?.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100 mb-2"
                >
                  Zresetuj hasło
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

export default RequestPasswordResetForm;
