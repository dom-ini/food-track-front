import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";

import FormField from "./FormField";

const ProductAddForm = ({
  formFields,
  initialValues,
  validationSchema,
  handleFormSubmit,
}) => {
  return (
    <div className="form-medium mx-auto mb-3">
      <h1 className="title-divider text-center mb-3">Dodaj produkt</h1>
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
            {formFields.map((field, i) => (
              <FormField
                key={i}
                className="mb-2"
                type={field.type}
                name={field.name}
                label={field.label}
                placeholder={field.label}
                suffix={field.suffix}
                value={values[field.name]}
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched[field.name] && errors?.[field.name]}
                errors={errors?.[field.name]}
              />
            ))}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-100 mt-3"
            >
              Dodaj produkt
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductAddForm;
