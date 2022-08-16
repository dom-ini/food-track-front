import { useEffect, useState } from "react";
import { Formik } from "formik";
import { object, number } from "yup";
import { format } from "date-fns";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormErrorHandler from "../hooks/useFormErrorHandler";
import MacroFormField from "../components/MacroFormField";
import GoalCalculatedField from "../components/GoalCalculatedField";
import { MACRO_TO_KCAL } from "../globals/utils";
import ENDPOINTS from "../globals/endpoints";
import useAlert from "../hooks/useAlert";

const BASE_MACRO_VALIDATION = number()
  .required("Cel jest wymagany")
  .typeError("Cel musi być liczbą")
  .positive("Cel musi być większy 0")
  .max(100, "Cel nie może przekraczać 100%")
  .integer("Cel musi być liczbą całkowitą")
  .test(
    "sumsUpTo100%",
    "Cele muszą sumować się do 100%",
    (value, testContext) =>
      testContext.parent.protein_perc +
        testContext.parent.fat_perc +
        testContext.parent.carb_perc ===
      100
  );

const EMPTY_GOALS = {
  daily_kcal_goal: 0,
  protein_perc: 0,
  fat_perc: 0,
  carb_perc: 0,
  protein_abs: 0,
  fat_abs: 0,
  carb_abs: 0,
};

const validationSchema = object().shape({
  daily_kcal_goal: number()
    .required("Cel jest wymagany")
    .typeError("Cel musi być liczbą")
    .positive(`Cel musi być większy 0`)
    .max(99999, `Cel musi być mniejszy od 100000`)
    .integer("Cel musi być liczbą całkowitą"),
  protein_perc: BASE_MACRO_VALIDATION,
  fat_perc: BASE_MACRO_VALIDATION,
  carb_perc: BASE_MACRO_VALIDATION,
});

const SetGoals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(
    JSON.parse(JSON.stringify(EMPTY_GOALS))
  );
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();
  const setFormErrors = useFormErrorHandler();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getInitialValues = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(ENDPOINTS.GOALS_URL, {
          signal: controller.signal,
          params: {
            from_date: format(new Date(), "yyyy-MM-dd"),
          },
        });
        if (!response.data?.results.length || !isMounted) return;
        const values = transformGoalsDataFromApi(response.data.results[0]);
        setInitialValues(values);
      } catch (err) {
        if (err.name !== "CanceledError")
          alert.danger("Wystąpił błąd, spróbuj ponownie później");
      } finally {
        setIsLoading(false);
      }
    };

    const transformGoalsDataFromApi = (data) => {
      const kcal = parseInt(data.daily_kcal_goal);

      return {
        daily_kcal_goal: kcal,
        protein_perc: data.daily_protein_goal,
        fat_perc: data.daily_fat_goal,
        carb_perc: data.daily_carb_goal,
        protein_abs: 0,
        fat_abs: 0,
        carb_abs: 0,
      };
    };

    getInitialValues();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const handleFormSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      setSubmitting(true);
      await axiosPrivate
        .post(ENDPOINTS.GOALS_URL, {
          daily_kcal_goal: values.daily_kcal_goal,
          daily_protein_goal: values.protein_perc,
          daily_fat_goal: values.fat_perc,
          daily_carb_goal: values.carb_perc,
        })
        .then((response) => {
          alert.success("Cele zmienione pomyślnie");
        });
    } catch (err) {
      setFormErrors(err, setErrors, alert.danger);
    } finally {
      setSubmitting(false);
    }
  };

  const sumMacrosPercentage = (values) => {
    return values.protein_perc + values.fat_perc + values.carb_perc;
  };

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

export default SetGoals;
