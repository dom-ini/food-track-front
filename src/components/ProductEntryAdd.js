import { Row, Col, Spinner, Button } from "react-bootstrap";

import ProductEntryAddFormContainer from "./ProductEntryAddFormContainer";

import useWindowSize from "../hooks/useWindowSize";

import "../styles/EntryAddContainer.scss";

const ProductEntryAdd = ({
  products,
  next,
  date,
  meal,
  isLoading,
  closeModal,
  setDiaryEntries,
  appendToListOfProducts,
}) => {
  const { isScreenSmall } = useWindowSize();

  return (
    <>
      <div className="entry-add-header d-flex">
        <span>{isScreenSmall ? "na 100 g:" : "wartości na 100 g:"}</span>
        <Row className="text-center">
          <Col>B</Col>
          <Col>WW</Col>
          <Col>T</Col>
        </Row>
      </div>
      {products?.length ? (
        products.map((product, i) => (
          <ProductEntryAddFormContainer
            product={product}
            date={date}
            meal={meal}
            closeModal={closeModal}
            setDiaryEntries={setDiaryEntries}
            key={i}
          />
        ))
      ) : isLoading ? (
        <div className="text-center mt-3 mb-1">
          <Spinner animation="border" />
        </div>
      ) : (
        <p className="text-center mt-3">Nie znaleziono produktów :C</p>
      )}
      {next && !isLoading && (
        <Button
          className="d-block mx-auto mt-3"
          disabled={isLoading}
          onClick={() => appendToListOfProducts(next)}
          role="button"
        >
          Wczytaj więcej...
        </Button>
      )}
    </>
  );
};

export default ProductEntryAdd;
