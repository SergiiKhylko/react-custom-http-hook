import {useState} from "react";

const useHttp = (requestOptions, manageData) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = async (productText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestOptions.endpoint, {
          method: requestOptions.method ? requestOptions.method : "GET",
          headers: requestOptions.headers ? requestOptions.headers : {},
          body: requestOptions.body ? JSON.stringify(requestOptions.body) : null
        }
      );

      if (!response.ok) {
        throw new Error("Request error.");
      }

      const data = await response.json();
      manageData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    error,
    sendHttpRequest
  };
};

export default useHttp;