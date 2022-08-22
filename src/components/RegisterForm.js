import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";

import PasswordRequirementsFormControl from "./PasswordRequirementsFormControl";
import FormField from "./FormField";

const RegisterForm = ({
  isSuccess,
  initialValues,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div>
      <h2 className="mb-3 text-center">Zarejestruj się</h2>
      {isSuccess ? (
        <>
          <p>
            Wiadomość z linkiem aktywującym konto został wysłany na podany przy
            rejestracji adres e-mail
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
                  name="password1"
                  errors={errors?.password1}
                  customInput={
                    <PasswordRequirementsFormControl
                      name="password1"
                      placeholder="Hasło"
                      value={values.password1}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password1 && errors?.password1}
                    />
                  }
                />
                <FormField
                  className="mb-2"
                  type="password"
                  name="password2"
                  placeholder="Powtórz hasło"
                  value={values.password2}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password2 && errors?.password2}
                  errors={errors?.password2}
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  Załóż konto
                </Button>
              </Form>
            )}
          </Formik>
          <p className="mt-3 mb-2">Masz już konto?</p>
          <Link to="/logowanie">
            <Button variant="outline-primary" className="w-100">
              Zaloguj się
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
