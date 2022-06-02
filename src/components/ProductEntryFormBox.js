import { Formik } from "formik";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { number, object } from "yup";
import { format } from "date-fns";

import useAlert from "../hooks/useAlert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import GoalFormField from "./GoalFormField";
import ProductEntryFormCalculatedField from "./ProductEntryFormCalculatedField";
import ENDPOINTS from "../globals/endpoints";
import "../styles/ProductEntryFormBox.scss";

const validationSchema = object().shape({
  weight: number()
    .required("Waga jest wymagana")
    .typeError("Waga musi być liczbą")
    .positive(`Waga musi być większa 0`)
    .max(99999, `Waga musi być mniejsza od 100 000`)
    .integer("Waga musi być liczbą całkowitą"),
});

const ProductEntryFormBox = ({
  product,
  date,
  meal,
  closeModal,
  isLoading,
  setIsLoading,
  setDiaryEntries,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (
    values,
    { resetForm, setErrors }
  ) => {
    try {
      setIsLoading(true);
      await axiosPrivate
        .post(ENDPOINTS.DIARY_ENTRIES_URL, {
          product_entry: {
            product: product.id,
            weight: values.weight,
          },
          meal: meal,
          date: format(date, "yyyy-MM-dd"),
        })
        .then((response) => {
          const newEntry = response?.data;
          if (!newEntry) return;
          setDiaryEntries((prev) => [...prev, newEntry ]);
        });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      resetForm();
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ weight: 0, kcal: 0, protein: 0, carb: 0, fat: 0 }}
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
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="pt-3 pb-4 product-entry-add-form"
        >
          <Container>
            <Row className="pb-3 d-flex justify-content-center">
              <Col xs={6} sm={4} md={3}>
                <GoalFormField
                  label="Waga (g)"
                  suffix="g"
                  name="weight"
                  placeholder="Waga"
                  value={values.weight}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.weight && errors?.weight}
                  errors={errors?.weight}
                />
              </Col>
              <Col xs={3} sm={3} md={2}>
                <Button type="submit" disabled={isLoading}>
                  Dodaj
                </Button>
              </Col>
            </Row>
            <Row className="gy-3">
              <Col xs={12} sm={6} lg={3}>
                <ProductEntryFormCalculatedField
                  label="kcal"
                  suffix="kcal"
                  name="kcal"
                  value={values.kcal}
                  macroIn100={product.kcal_for_100}
                />
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <ProductEntryFormCalculatedField
                  label="Białko (g)"
                  suffix="g"
                  name="protein"
                  value={values.protein}
                  macroIn100={product.protein_for_100}
                />
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <ProductEntryFormCalculatedField
                  label="Węglowodany (g)"
                  suffix="g"
                  name="carb"
                  value={values.carb}
                  macroIn100={product.carbo_for_100}
                />
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <ProductEntryFormCalculatedField
                  label="Tłuszcze (g)"
                  suffix="g"
                  name="fat"
                  value={values.fat}
                  macroIn100={product.fat_for_100}
                />
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ProductEntryFormBox;
