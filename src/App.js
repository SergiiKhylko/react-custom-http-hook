import React, {useEffect, useState} from "react";

import Products from "./components/Products/Products";
import NewProduct from "./components/NewProduct/NewProduct";
import useHttp from "./hooks/use-http";


function App() {

  console.log("App")
  const [products, setProducts] = useState([]);
  const {isLoading, error, sendHttpRequest: fetchProducts} = useHttp();



  useEffect(() => {
    console.log("fetchProducts in useEffect");

    const manageProducts = productsData => {
      console.log("manageProducts")
      const loadedProducts = [];
      for (const productKey in productsData) {
        loadedProducts.push({ id: productKey, text: productsData[productKey].text });
      }
      setProducts(loadedProducts);
    };

    fetchProducts({
      endpoint: "https://react-http-custom-hook-10a71-default-rtdb.firebaseio.com/products.json"
    }, manageProducts);
  }, [fetchProducts]);

  const productAddHandler = (product) => {
    setProducts((prevProducts) => prevProducts.concat(product));
  };

  return (
    <React.Fragment>
      <NewProduct onAddProduct={productAddHandler} />
      <Products
        items={products}
        loading={isLoading}
        error={error}
        onFetch={fetchProducts}
      />
    </React.Fragment>
  );
}

export default App;
