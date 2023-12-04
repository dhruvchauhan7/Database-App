import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  const fetchProduct = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:8080/backend/products/products/${productId}`);
      console.log(res.data);
      setCurrentProduct(res.data);
    } catch (error) {
      // Handle error, perhaps set a default product or display an error message
      console.error("Error fetching product:", error);
    }
  };

  const clearCurrentProduct = () => {
    setCurrentProduct(null);
  };

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(currentProduct));
  }, [currentProduct]);

  return (
    <ProductContext.Provider
      value={{
        currentProduct,
        fetchProduct,
        clearCurrentProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
