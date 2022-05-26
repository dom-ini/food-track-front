import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { number, object, string } from "yup";

import useAlert from "../hooks/useAlert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import ProductFormField from "./ProductFormField";
import ENDPOINTS from "../globals/endpoints";

const BASE_MACRO_VALIDATION = number()
  .required("Wartość jest wymagana")
  .typeError("Wartość musi być liczbą")
  .positive(`Wartość musi być większa od 0`)
  .max(9999, `Wartość musi być mniejsza od 10000`);

const FORM_FIELDS = [
  { name: "name", type: "text", label: "Nazwa produktu" },
  {
    name: "kcal_for_100",
    type: "number",
    label: "Kcal (kcal/100g)",
    suffix: "kcal",
  },
  {
    name: "protein_for_100",
    type: "number",
    label: "Białko (g/100g)",
    suffix: "g",
  },
  {
    name: "carbo_for_100",
    type: "number",
    label: "Węglowodany (g/100g)",
    suffix: "g",
  },
  {
    name: "sugar_for_100",
    type: "number",
    label: "Cukry (g/100g)",
    suffix: "g",
  },
  {
    name: "fat_for_100",
    type: "number",
    label: "Tłuszcze (g/100g)",
    suffix: "g",
  },
  {
    name: "saturated_fat_for_100",
    type: "number",
    label: "Tłuszcze nasycone (g/100g)",
    suffix: "g",
  },
  { name: "portion_size", type: "number", label: "Porcja", suffix: "g" },
];

const validationSchema = object().shape({
  name: string().required("Nazwa jest wymagana").max(128, "Nazwa zbyt długa"),
  kcal_for_100: BASE_MACRO_VALIDATION,
  protein_for_100: BASE_MACRO_VALIDATION,
  carbo_for_100: BASE_MACRO_VALIDATION,
  sugar_for_100: BASE_MACRO_VALIDATION,
  fat_for_100: BASE_MACRO_VALIDATION,
  saturated_fat_for_100: BASE_MACRO_VALIDATION,
  portion_size: BASE_MACRO_VALIDATION,
});

const ProductAdd = () => {
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await axiosPrivate
        .post(ENDPOINTS.PRODUCTS_URL, values)
        .then((response) => {
          resetForm();
          alert.success(
            "Produkt pojawi się w bazie po zweryfikowaniu przez administratora"
          );
        });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-medium mx-auto mb-3">
      <h1 className="title-divider text-center mb-3">Dodaj produkt</h1>
      <Formik
        initialValues={{
          name: "",
          kcal_for_100: 0,
          protein_for_100: 0,
          carbo_for_100: 0,
          sugar_for_100: 0,
          fat_for_100: 0,
          saturated_fat_for_100: 0,
          portion_size: 0,
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
            {FORM_FIELDS.map((field, i) => (
              <ProductFormField
                key={i}
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

export default ProductAdd;
