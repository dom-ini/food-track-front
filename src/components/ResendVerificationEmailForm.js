import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";

import FormField from "./FormField";

const ResendVerificationEmailForm = ({
  isSuccess,
  initialValues,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div>
      <h2 className="mb-3 text-center">
        Wyślij link aktywacyjny
      </h2>
      {isSuccess ? (
        <>
          <p>
            Jeśli podany adres e-mail istnieje w bazie i jest niezweryfikowany,
            otrzymasz na niego wiadomość z linkiem do aktywowania konta
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
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100 mb-2"
                >
                  Wyślij link aktywacyjny
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

export default ResendVerificationEmailForm;
