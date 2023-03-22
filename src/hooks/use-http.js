import {useCallback, useState} from "react";

const useHttp = () => {

  console.log("useHttp");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(async (requestOptions, manageData) => {
    console.log("sendHttpRequest");
    console.log("setIsLoading");
    setIsLoading(true);
    console.log("setError");
    setError(null);
    try {
      console.log("fetch");
      const response = await fetch(
        requestOptions.endpoint, {
          method: requestOptions.method ? requestOptions.method : "GET",
          headers: requestOptions.headers ? requestOptions.headers : {},
          body: requestOptions.body ? JSON.stringify(requestOptions.body) : null
        }
      );
      console.log("fetch is done");

      if (!response.ok) {
        throw new Error("Request error.");
      }
      console.log("response.json()");
      const data = await response.json();
      console.log("manageData(data);");
      manageData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    console.log("setIsLoading(false)");
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendHttpRequest
  };
};

export default useHttp;