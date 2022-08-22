import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";

import PasswordRequirementsFormControl from "./PasswordRequirementsFormControl";
import FormField from "./FormField";

const PasswordChangeForm = ({
  initialValues,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div>
      <h2>Zmiana hasła</h2>
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
              type="password"
              name="old_password"
              placeholder="Obecne hasło"
              value={values.old_password}
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.old_password && errors?.old_password}
              errors={errors?.old_password}
            />
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
              className="w-100"
            >
              Ustaw nowe hasło
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordChangeForm;
