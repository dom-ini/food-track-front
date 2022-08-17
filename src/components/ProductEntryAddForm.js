import { Formik } from "formik";
import { Form, Row, Col, Button, Container, Collapse } from "react-bootstrap";

import ProductEntryAddFormCalculatedField from "./ProductEntryAddFormCalculatedField";
import MacroFormField from "./MacroFormField";

import "../styles/ProductEntryFormBox.scss";

const ProductEntryAddForm = ({
  isOpen,
  product,
  isLoading,
  initialValues,
  validationSchema,
  handleFormSubmit
}) => {
  return (
    <Collapse in={isOpen}>
      <div>
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
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="pt-3 pb-4 product-entry-add-form"
            >
              <Container>
                <Row className="pb-3 d-flex justify-content-center">
                  <Col xs={6} sm={4} md={3}>
                    <MacroFormField
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
                    <ProductEntryAddFormCalculatedField
                      label="kcal"
                      suffix="kcal"
                      name="kcal"
                      value={values.kcal}
                      macroIn100={product.kcal_for_100}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <ProductEntryAddFormCalculatedField
                      label="Białko (g)"
                      suffix="g"
                      name="protein"
                      value={values.protein}
                      macroIn100={product.protein_for_100}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <ProductEntryAddFormCalculatedField
                      label="Węglowodany (g)"
                      suffix="g"
                      name="carb"
                      value={values.carb}
                      macroIn100={product.carbo_for_100}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <ProductEntryAddFormCalculatedField
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
      </div>
    </Collapse>
  );
};

export default ProductEntryAddForm;
