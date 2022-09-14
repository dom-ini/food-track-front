import { useEffect, useState } from "react";
import { object, number } from "yup";
import { format } from "date-fns";

import GoalsSetForm from "../components/GoalsSetForm";

import useFormErrorHandler from "../hooks/useFormErrorHandler";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import ENDPOINTS from "../globals/endpoints";

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
  const { alertDanger, alertSuccess } = useAlert();
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
          alertDanger("Wystąpił błąd, spróbuj ponownie później");
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
      await axiosPrivate.post(ENDPOINTS.GOALS_URL, {
        daily_kcal_goal: values.daily_kcal_goal,
        daily_protein_goal: values.protein_perc,
        daily_fat_goal: values.fat_perc,
        daily_carb_goal: values.carb_perc,
      });
      alertSuccess("Cele zmienione pomyślnie");
    } catch (err) {
      setFormErrors(err, setErrors, alertDanger);
    } finally {
      setSubmitting(false);
    }
  };

  const sumMacrosPercentage = (values) => {
    return values.protein_perc + values.fat_perc + values.carb_perc;
  };

  return (
    <GoalsSetForm
      isLoading={isLoading}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleFormSubmit={handleFormSubmit}
      sumMacrosPercentage={sumMacrosPercentage}
    />
  );
};

export default SetGoals;
