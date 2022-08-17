import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";

const validationSchema = object().shape({
  email: string().required("Adres e-mail jest wymagany"),
  password: string().required("Hasło jest wymagane"),
});

const initialValues = { email: "", password: "" };

const LoginFormContainer = () => {
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
    <LoginForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default LoginFormContainer;
