import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Formik } from "formik";
import { object, string, ref } from "yup";

import PasswordRequirementsInput from "../components/PasswordRequirementsInput";
import useAuth from "../hooks/useAuth";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import REGEX from "../globals/regex";
import useAlert from "../hooks/useAlert";

const validationSchema = object().shape({
  new_password1: string()
    .required("Hasło jest wymagane")
    .max(32, "Hasło jest zbyt długie")
    .matches(REGEX.PASSWORD.ALL, "Hasło nie spełnia wymagań bezpieczeństwa"),
  new_password2: string()
    .required("Hasło jest wymagane")
    .oneOf([ref("new_password1"), null], "Hasła nie są takie same"),
});

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await resetPassword({ ...values, uid, token }).then(() => {
        resetForm();
        setIsSuccess(true);
      });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);

      const errorData = err?.response?.data;
      if (errorData && ("token" in errorData || "uid" in errorData))
        alert.danger("Link do zmiany hasła jest nieprawidłowy");
    } finally {
      setSubmitting(false);
    }
  };

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
            initialValues={{ new_password1: "", new_password2: "" }}
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

export default ResetPassword;
