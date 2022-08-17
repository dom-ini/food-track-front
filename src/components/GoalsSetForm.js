import { Formik } from "formik";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

import GoalCalculatedField from "../components/GoalCalculatedField";
import MacroFormField from "../components/MacroFormField";

import { MACRO_TO_KCAL } from "../globals/utils";

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
                  <Form.Group
                    controlId="formKcal"
                    className="mb-2 mx-auto"
                    as={Col}
                    xs={6}
                    sm={5}
                  >
                    <MacroFormField
                      label="Zapotrzebowanie"
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
                  </Form.Group>
                </Row>
                <Row className="justify-content-around">
                  <Col xs={6} sm={5}>
                    <Form.Group controlId="formProteinPerc" className="mb-2">
                      <MacroFormField
                        label="Białko (%)"
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
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={5}>
                    <Form.Group controlId="formProteinAbs" className="mb-2">
                      <GoalCalculatedField
                        label="Białko (g)"
                        name="protein_abs"
                        value={values.protein_abs}
                        basedOn="protein_perc"
                        multiplier={MACRO_TO_KCAL.PROTEIN}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col xs={6} sm={5}>
                    <Form.Group controlId="formFatPerc" className="mb-2">
                      <MacroFormField
                        label="Tłuszcze (%)"
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
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={5}>
                    <Form.Group controlId="formFatAbs" className="mb-2">
                      <GoalCalculatedField
                        label="Tłuszcze (g)"
                        name="fat_abs"
                        value={values.fat_abs}
                        basedOn="fat_perc"
                        multiplier={MACRO_TO_KCAL.FAT}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-around">
                  <Col xs={6} sm={5}>
                    <Form.Group controlId="formCarbPerc" className="mb-2">
                      <MacroFormField
                        label="Węglowodany (%)"
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
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={5}>
                    <Form.Group controlId="formCarbAbs" className="mb-2">
                      <GoalCalculatedField
                        label="Węglowodany (g)"
                        name="carb_abs"
                        value={values.carb_abs}
                        basedOn="carb_perc"
                        multiplier={MACRO_TO_KCAL.CARB}
                      />
                    </Form.Group>
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
