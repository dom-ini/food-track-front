import { useState, useEffect, useCallback } from "react";
import { Row, Col, Spinner, Button } from "react-bootstrap";
import ProductEntryFormContainer from "./ProductEntryFormContainer";

import ProductSearch from "./ProductSearch";
import useAlert from "../hooks/useAlert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ENDPOINTS from "../globals/endpoints";
import { convertArrayOfObjectsPropsToFloat } from "../globals/utils";
import "../styles/EntryAddContainer.scss";

const SMALL_SCREEN_BREAKPOINT = 575;

const ProductEntryAddContainer = ({ date, meal, closeModal, setDiaryEntries }) => {
  const [products, setProducts] = useState([]);
  const [next, setNext] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();

  const getProducts = useCallback(
    async (url, controller) => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(url, {
          signal: controller?.signal,
          params: {
            name__icontains: search,
          },
        });
        const products = convertArrayOfObjectsPropsToFloat(
          response.data?.results,
          [
            "kcal_for_100",
            "protein_for_100",
            "carbo_for_100",
            "fat_for_100",
            "portion_size",
          ]
        );
        setNext(response.data.next);
        setIsLoading(false);
        return products;
      } catch (err) {
        if (err.name !== "CanceledError") {
          setIsLoading(false);
          alert.danger("Wystąpił błąd, spróbuj ponownie później");
        }
        return [];
      }
    },
    [axiosPrivate, search]
  );

  const getNewListOfProducts = useCallback(
    async (controller) => {
      const newProducts = await getProducts(ENDPOINTS.PRODUCTS_URL, controller);
      setProducts(newProducts);
    },
    [getProducts]
  );

  const appendToListOfProducts = useCallback(
    async (url) => {
      const newProducts = await getProducts(url);
      setProducts((prev) => {
        setProducts([...prev, ...newProducts]);
      });
    },
    [getProducts]
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    isMounted && getNewListOfProducts(controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [search, getProducts, getNewListOfProducts]);

  return (
    <>
      <ProductSearch className="mb-3" search={search} setSearch={setSearch} />
      <div className="entry-add-header d-flex">
        <span>
          {window.innerWidth < SMALL_SCREEN_BREAKPOINT
            ? "na 100 g:"
            : "wartości na 100 g:"}
        </span>
        <Row className="text-center">
          <Col>B</Col>
          <Col>WW</Col>
          <Col>T</Col>
        </Row>
      </div>
      {products?.length ? (
        products.map((product, i) => (
          <ProductEntryFormContainer
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

export default ProductEntryAddContainer;
