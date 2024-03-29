import { useState, useEffect, useCallback } from "react";

import ProductEntryAdd from "./ProductEntryAdd";
import ProductSearch from "./ProductSearch";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import ENDPOINTS from "../globals/endpoints";

const ProductEntryAddContainer = ({ closeModal }) => {
  const [products, setProducts] = useState([]);
  const [next, setNext] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { alertDanger } = useAlert();

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
        const products = response.data?.results;
        setNext(response.data.next);
        setIsLoading(false);
        return products;
      } catch (err) {
        if (err.name !== "CanceledError") {
          setIsLoading(false);
          alertDanger("Wystąpił błąd, spróbuj ponownie później");
        }
        return [];
      }
    },
    [axiosPrivate, search, alertDanger]
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
        isLoading={isLoading}
        closeModal={closeModal}
        appendToListOfProducts={appendToListOfProducts}
      />
    </>
  );
};

export default ProductEntryAddContainer;
