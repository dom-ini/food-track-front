import { useState } from "react";
import { Button } from "react-bootstrap";
import { GoPlus, GoChevronUp } from "react-icons/go";
import { number, object } from "yup";
import { format } from "date-fns";

import ProductEntryAddForm from "./ProductEntryAddForm";
import MealEntry from "./MealEntry";

import useAlert from "../hooks/useAlert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useFormErrorHandler from "../hooks/useFormErrorHandler";

import ENDPOINTS from "../globals/endpoints";

const validationSchema = object().shape({
  weight: number()
    .required("Waga jest wymagana")
    .typeError("Waga musi być liczbą")
    .positive(`Waga musi być większa 0`)
    .max(99999, `Waga musi być mniejsza od 100 000`)
    .integer("Waga musi być liczbą całkowitą"),
});

const initialValues = { weight: 0, kcal: 0, protein: 0, carb: 0, fat: 0 };

const ProductEntryAddFormContainer = ({
  product,
  date,
  meal,
  closeModal,
  setDiaryEntries,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { alertDanger } = useAlert();
  const setFormErrors = useFormErrorHandler();

  const handleFormSubmit = async (values, { resetForm, setErrors }) => {
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
          setDiaryEntries((prev) => [...prev, newEntry]);
        });
    } catch (err) {
      setFormErrors(err, setErrors, alertDanger);
    } finally {
      resetForm();
      closeModal();
      setIsLoading(false);
    }
  };

  return (
    <>
      <MealEntry
        name={product.name}
        data={product}
        button={
          <Button
            variant="primary"
            className="rounded-circle"
            onClick={() => setIsOpen((prev) => !prev)}
            disabled={isLoading}
            aria-label={`${
              isOpen ? "Zwiń" : "Rozwiń"
            } formularz dodawania wpisu`}
          >
            {isOpen ? <GoChevronUp /> : <GoPlus />}
          </Button>
        }
      />
      <ProductEntryAddForm
        isOpen={isOpen}
        product={product}
        isLoading={isLoading}
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default ProductEntryAddFormContainer;
