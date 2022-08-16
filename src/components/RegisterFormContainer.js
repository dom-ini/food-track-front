import { useState } from "react";
import { object, string, ref } from "yup";

import RegisterForm from "./RegisterForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

import REGEX from "../globals/regex";

const validationSchema = object().shape({
  email: string()
    .email("Podaj poprawny adres e-mail")
    .required("Adres e-mail jest wymagany")
    .max(255, "Adres e-mail jest zbyt długi"),
  password1: string()
    .required("Hasło jest wymagane")
    .max(32, "Hasło jest zbyt długie")
    .matches(REGEX.PASSWORD.ALL, "Hasło nie spełnia wymagań bezpieczeństwa"),
  password2: string()
    .required("Hasło jest wymagane")
    .oneOf([ref("password1"), null], "Hasła nie są takie same"),
});

const initialValues = { email: "", password1: "", password2: "" };

const RegisterFormContainer = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { register } = useAuth();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await register(values).then(() => {
        resetForm();
        setIsSuccess(true);
      });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RegisterForm
      isSuccess={isSuccess}
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default RegisterFormContainer;
