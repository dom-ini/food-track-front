import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { object, string, ref } from "yup";

import PasswordRequirementsInput from "./PasswordRequirementsInput";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import REGEX from "../globals/regex";
import ENDPOINTS from "../globals/endpoints";
import useAlert from "../hooks/useAlert";

const validationSchema = object().shape({
  old_password: string().required("Obecne hasło jest wymagane"),
  new_password1: string()
    .required("Nowe hasło jest wymagane")
    .max(32, "Nowe hasło jest zbyt długie")
    .matches(
      REGEX.PASSWORD.ALL,
      "Nowe hasło nie spełnia wymagań bezpieczeństwa"
    ),
  new_password2: string()
    .required("Nowe hasło jest wymagane")
    .oneOf([ref("new_password1"), null], "Hasła nie są takie same"),
});

const PasswordChange = () => {
  const axiosPrivate = useAxiosPrivate();
  const setFormErrors = useFormErrorHandler();
  const alert = useAlert();

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await axiosPrivate
        .post(ENDPOINTS.CHANGE_PASSWORD_URL, values)
        .then((response) => {
          resetForm();
          alert.success("Hasło zmienione pomyślnie");
        });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Zmiana hasła</h2>
      <Formik
        initialValues={{
          old_password: "",
          new_password1: "",
          new_password2: "",
        }}
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
            <Form.Group controlId="formOldPassword" className="mb-2">
              <Form.Label hidden>Obecne hasło</Form.Label>
              <Form.Control
                type="password"
                name="old_password"
                placeholder="Obecne hasło"
                autoComplete="off"
                value={values.old_password}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.old_password && errors?.old_password}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.old_password}
              </Form.Control.Feedback>
            </Form.Group>
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

export default PasswordChange;
