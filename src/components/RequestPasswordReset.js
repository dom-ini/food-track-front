import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { object, string } from "yup";

import useAuth from "../hooks/useAuth";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAlert from "../hooks/useAlert";

const validationSchema = object().shape({
  email: string().required("Adres e-mail jest wymagany"),
});

const RequestPasswordReset = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPasswordRequest } = useAuth();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await resetPasswordRequest(values).then(() => {
        resetForm();
        setIsSuccess(true);
      });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      setSubmitting(false);
    }
  };

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
            initialValues={{ email: "" }}
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

export default RequestPasswordReset;
