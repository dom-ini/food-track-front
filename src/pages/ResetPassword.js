import { useState } from "react";
import { useParams } from "react-router-dom";
import { object, string, ref } from "yup";

import PasswordResetForm from "../components/PasswordResetForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

import REGEX from "../globals/regex";

const validationSchema = object().shape({
  new_password1: string()
    .required("Hasło jest wymagane")
    .max(32, "Hasło jest zbyt długie")
    .matches(REGEX.PASSWORD.ALL, "Hasło nie spełnia wymagań bezpieczeństwa"),
  new_password2: string()
    .required("Hasło jest wymagane")
    .oneOf([ref("new_password1"), null], "Hasła nie są takie same"),
});

const initialValues = { new_password1: "", new_password2: "" };

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
    <PasswordResetForm
      isSuccess={isSuccess}
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default ResetPassword;
