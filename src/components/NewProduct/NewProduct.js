import { useState } from "react";

import Section from "../UI/Section";
import ProductForm from "./ProductForm";

const NewProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterProductHandler = async (productText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-custom-hook-10a71-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          body: JSON.stringify({ text: productText }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request error.");
      }

      const data = await response.json();

      const generatedId = data.name;
      const createdProduct = { id: generatedId, text: productText };

      props.onAddProduct(createdProduct);
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
