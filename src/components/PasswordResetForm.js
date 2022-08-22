import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";

import PasswordRequirementsFormControl from "../components/PasswordRequirementsFormControl";
import FormField from "./FormField";

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
                <FormField
                  className="mb-2"
                  name="new_password1"
                  errors={errors?.new_password1}
                  customInput={
                    <PasswordRequirementsFormControl
                      name="new_password1"
                      placeholder="Nowe hasło"
                      value={values.new_password1}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.new_password1 && errors?.new_password1}
                    />
                  }
                />
                <FormField
                  className="mb-2"
                  type="password"
                  name="new_password2"
                  placeholder="Powtórz nowe hasło"
                  value={values.new_password2}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.new_password2 && errors?.new_password2}
                  errors={errors?.new_password2}
                />
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
