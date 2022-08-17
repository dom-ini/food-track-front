import { useState, useEffect, useCallback } from "react";

import ProductEntryAdd from "./ProductEntryAdd";
import ProductSearch from "./ProductSearch";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import { convertArrayOfObjectsPropsToFloat } from "../globals/utils";
import ENDPOINTS from "../globals/endpoints";

const ProductEntryAddContainer = ({
  date,
  meal,
  closeModal,
  setDiaryEntries,
}) => {
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
      <ProductEntryAdd
        products={products}
        next={next}
        date={date}
        meal={meal}
        isLoading={isLoading}
        closeModal={closeModal}
        setDiaryEntries={setDiaryEntries}
        appendToListOfProducts={appendToListOfProducts}
      />
    </>
  );
};

export default ProductEntryAddContainer;
