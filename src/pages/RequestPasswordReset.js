import { useState } from "react";
import { object, string } from "yup";

import RequestPasswordResetForm from "../components/RequestPasswordResetForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

const validationSchema = object().shape({
  email: string().required("Adres e-mail jest wymagany"),
});

const initialValues = { email: "" };

const RequestPasswordReset = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPasswordRequest } = useAuth();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await resetPasswordRequest(values).then(() => {
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
    <RequestPasswordResetForm
      isSuccess={isSuccess}
      validationSchema={validationSchema}
      initialValues={initialValues}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default RequestPasswordReset;
