import { Formik } from "formik";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

import MacroCalculatedFormControl from "./MacroCalculatedFormControl";
import FormField from "./FormField";

import { MACRO_TO_KCAL } from "../globals/constants";

const GoalsSetForm = ({
  isLoading,
  initialValues,
  validationSchema,
  handleFormSubmit,
  sumMacrosPercentage,
}) => {
  return (
    <div className="form-wide mx-auto">
      {isLoading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : (
        <>
          <h1 className="title-divider text-center mb-3">Ustaw cele dzienne</h1>
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
                <Row>
                  <Col xs={6} sm={5} className="mx-auto">
                    <FormField
                      label="Zapotrzebowanie"
                      className="mb-2"
                      type="number"
                      suffix="kcal"
                      name="daily_kcal_goal"
                      placeholder="kcal"
                      value={values.daily_kcal_goal}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.daily_kcal_goal && errors?.daily_kcal_goal
                      }
                      errors={errors?.daily_kcal_goal}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col xs={6} sm={5}>
                    <FormField
                      label="Białko (%)"
                      className="mb-2"
                      type="number"
                      suffix="%"
                      name="protein_perc"
                      placeholder="Ilość białka (%)"
                      value={values.protein_perc}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.protein_perc && errors?.protein_perc}
                      errors={errors?.protein_perc}
                    />
                  </Col>
                  <Col xs={6} sm={5}>
                    <FormField
                      label="Białko (g)"
                      className="mb-2"
                      name="protein_abs"
                      suffix="g"
                      customInput={
                        <MacroCalculatedFormControl
                          name="protein_abs"
                          inputValue={values.protein_abs}
                          baseValue={values.daily_kcal_goal}
                          percentage={values.protein_perc}
                          multiplier={MACRO_TO_KCAL.PROTEIN}
                        />
                      }
                    />
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col xs={6} sm={5}>
                    <FormField
                      label="Tłuszcze (%)"
                      className="mb-2"
                      type="number"
                      suffix="%"
                      name="fat_perc"
                      placeholder="Ilość tłuszczów (%)"
                      value={values.fat_perc}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.fat_perc && errors?.fat_perc}
                      errors={errors?.fat_perc}
                    />
                  </Col>
                  <Col xs={6} sm={5}>
                    <FormField
                      label="Tłuszcze (g)"
                      className="mb-2"
                      name="fat_abs"
                      suffix="g"
                      customInput={
                        <MacroCalculatedFormControl
                          name="fat_abs"
                          inputValue={values.fat_abs}
                          baseValue={values.daily_kcal_goal}
                          percentage={values.fat_perc}
                          multiplier={MACRO_TO_KCAL.FAT}
                        />
                      }
                    />
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col xs={6} sm={5}>
                    <FormField
                      label="Węglowodany (%)"
                      className="mb-2"
                      type="number"
                      suffix="%"
                      name="carb_perc"
                      placeholder="Ilość węglodowanów (%)"
                      value={values.carb_perc}
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.carb_perc && errors?.carb_perc}
                      errors={errors?.carb_perc}
                    />
                  </Col>
                  <Col xs={6} sm={5}>
                    <FormField
                      label="Węglowodany (g)"
                      className="mb-2"
                      name="carb_abs"
                      suffix="g"
                      customInput={
                        <MacroCalculatedFormControl
                          name="carb_abs"
                          inputValue={values.carb_abs}
                          baseValue={values.daily_kcal_goal}
                          percentage={values.carb_perc}
                          multiplier={MACRO_TO_KCAL.CARB}
                        />
                      }
                    />
                  </Col>
                </Row>
                <p
                  className={`mb-2 ms-4 fw-bold ${
                    sumMacrosPercentage(values) !== 100 ? "text-danger" : null
                  }`}
                >
                  Suma: {sumMacrosPercentage(values)}%
                </p>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  Ustaw cele
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default GoalsSetForm;
