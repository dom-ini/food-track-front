import { object, string } from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

const validationSchema = object().shape({
  email: string().required("Adres e-mail jest wymagany"),
  password: string().required("Hasło jest wymagane"),
});

const initialValues = { email: "", password: "" };

const Login = () => {
  const { login, facebookLogin, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { alertDanger } = useAlert();
  const setFormErrors = useFormErrorHandler();
  const returnURL = location.state?.from?.pathname || "/";

  const loginByFacebook = async (values, formMethods) => {
    await submitLoginForm(facebookLogin, values, formMethods);
  };

  const loginByGoogle = async (values, formMethods) => {
    await submitLoginForm(googleLogin, values, formMethods);
  };

  const handleFormSubmit = async (values, formMethods) => {
    await submitLoginForm(login, values, formMethods);
  };

  const submitLoginForm = async (
    loginCallback,
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await loginCallback(values);
      resetForm();
      navigate(returnURL, { replace: true });
    } catch (err) {
      setFormErrors(err, setErrors, alertDanger);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginForm
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
      loginByFacebook={loginByFacebook}
      loginByGoogle={loginByGoogle}
    />
  );
};

export default Login;
