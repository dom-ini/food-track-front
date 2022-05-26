import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { object, string } from "yup";
import { useLocation, useNavigate, Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAlert from "../hooks/useAlert";

const validationSchema = object().shape({
  email: string().required("Adres e-mail jest wymagany"),
  password: string().required("Hasło jest wymagane"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();
  const returnURL = location.state?.from?.pathname || "/";

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await login(values).then(() => {
        resetForm();
        navigate(returnURL, { replace: true });
      });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div>
        <h2 className="mb-3 text-center">Zaloguj się</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
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
              <Form.Group controlId="formPassword" className="mb-2">
                <Form.Label hidden>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Hasło"
                  autoComplete="off"
                  value={values.password}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && errors?.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Link to="/resetuj-haslo" className="d-block mb-2 link-primary">
                Zapomniałem hasła
              </Link>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-100"
              >
                Zaloguj się
              </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-3 mb-2">Nie masz jeszcze konta?</p>
        <Link to="/rejestracja">
          <Button variant="outline-primary" className="w-100">
            Załóż konto
          </Button>
        </Link>
      </div>
  );
};

export default Login;
