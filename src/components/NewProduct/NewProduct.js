import Section from "../UI/Section";
import ProductForm from "./ProductForm";
import useHttp from "../../hooks/use-http";

const NewProduct = (props) => {

  const {isLoading, error, sendHttpRequest: addProduct} = useHttp();
  const enterProductHandler = (productText) => {
    const manageProduct = productData => {
      const generatedId = productData.name;
      const createdProduct = {id: generatedId, text: productText};
      props.onAddProduct(createdProduct);
    };

    addProduct({
      endpoint: "https://react-http-custom-hook-10a71-default-rtdb.firebaseio.com/products.json",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: { text: productText }
    }, manageProduct);
  }

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
