import { object, string, ref } from "yup";

import PasswordChangeForm from "./PasswordChangeForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import ENDPOINTS from "../globals/endpoints";
import REGEX from "../globals/regex";

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

const initialValues = {
  old_password: "",
  new_password1: "",
  new_password2: "",
};

const PasswordChangeFormContainer = () => {
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
    <PasswordChangeForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default PasswordChangeFormContainer;
