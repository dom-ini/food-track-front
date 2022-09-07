import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";

import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import Separator from "./Separator";
import FormField from "./FormField";

import "../styles/components/LoginForm.scss";

const LoginForm = ({
  initialValues,
  validationSchema,
  handleFormSubmit,
  loginByFacebook,
  loginByGoogle,
}) => {
  return (
    <div>
      <h2 className="mb-3 text-center">Zaloguj się</h2>
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
          setSubmitting,
          setErrors,
          resetForm,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormField
              className="mb-2"
              type="email"
              name="email"
              placeholder="Adres e-mail"
              value={values.email}
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.email && errors?.email}
              errors={errors?.email}
            />
            <FormField
              className="mb-2"
              type="password"
              name="password"
              placeholder="Hasło"
              value={values.password}
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && errors?.password}
              errors={errors?.password}
            />
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
            <p className="mt-3 mb-2">Nie masz jeszcze konta?</p>
            <Link to="/rejestracja">
              <Button variant="outline-primary" className="w-100">
                Załóż konto
              </Button>
            </Link>
            <Link
              to="/aktywuj-konto/wyslij-link"
              className="d-block mt-2 link-primary"
            >
              Wyślij ponownie link aktywacyjny
            </Link>
            <Separator content="lub" className="mt-2" />
            <FacebookLogin
              onTokenObtain={(token) =>
                loginByFacebook(
                  { token },
                  { setSubmitting, resetForm, setErrors }
                )
              }
              className="mt-2"
              disabled={isSubmitting}
            />
            <GoogleLogin
              onTokenObtain={(token) =>
                loginByGoogle(
                  { token },
                  { setSubmitting, resetForm, setErrors }
                )
              }
              className="mt-2"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
