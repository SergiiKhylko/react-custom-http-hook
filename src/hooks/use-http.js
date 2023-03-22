import {useCallback, useState} from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(async (requestOptions, manageData) => {
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