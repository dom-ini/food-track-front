import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";
import { GoPlus, GoDash } from "react-icons/go";

import MealBox from "./MealBox";
import ProductEntryFormBox from "./ProductEntryFormBox";

const ProductEntryContainer = ({ product, date, meal, closeModal, setDiaryEntries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    kcal: product.kcal_for_100,
    protein: product.protein_for_100,
    carb: product.carbo_for_100,
    fat: product.fat_for_100,
  };

  return (
    <>
      <MealBox
        name={product.name}
        data={data}
        button={
          <Button
            variant="primary"
            className="rounded-circle"
            onClick={() => setIsOpen((prev) => !prev)}
            disabled={isLoading}
          >
            {isOpen ? <GoDash /> : <GoPlus />}
          </Button>
        }
      />
      <Collapse in={isOpen}>
        <div>
          <ProductEntryFormBox
            product={product}
            date={date}
            meal={meal}
            closeModal={closeModal}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDiaryEntries={setDiaryEntries}
          />
        </div>
      </Collapse>
    </>
  );
};

export default ProductEntryContainer;
