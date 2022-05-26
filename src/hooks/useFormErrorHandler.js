const useFormErrorHandler = () => {
  const setFormErrors = (err, setErrors, setErrMsg) => {
    if (!err.response?.data) {
      setErrMsg("Wystąpił błąd. Spróbuj ponownie później");
      return;
    }
    const errors = err?.response?.data;
    setErrors(errors);

    const message = errors?.non_field_errors && errors?.non_field_errors[0];
    if (message) setErrMsg(message);
  };

  return setFormErrors;
};

export default useFormErrorHandler;
