import { Formik } from "formik";
import { Form, Row, Col, Button, Container, Collapse } from "react-bootstrap";

import MacroCalculatedField from "./MacroCalculatedField";
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
                    <MacroCalculatedField
                      label="kcal"
                      name="kcal"
                      suffix="kcal"
                      inputValue={values.kcal}
                      baseValue={values.weight}
                      percentage={product.kcal}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <MacroCalculatedField
                      label="Białko (g)"
                      name="protein"
                      suffix="g"
                      inputValue={values.protein}
                      baseValue={values.weight}
                      percentage={product.protein}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <MacroCalculatedField
                      label="Węglowodany (g)"
                      name="carb"
                      suffix="g"
                      inputValue={values.carb}
                      baseValue={values.weight}
                      percentage={product.carb}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={3}>
                    <MacroCalculatedField
                      label="Tłuszcze (g)"
                      name="fat"
                      suffix="g"
                      inputValue={values.fat}
                      baseValue={values.weight}
                      percentage={product.fat}
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
