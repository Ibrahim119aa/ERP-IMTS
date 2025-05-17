import axios from "axios";
import { useCallback } from "react";

function useFetch() {
  const fetchData = useCallback(async ({ method, url, data, params }) => {
    try {
      // const token = sessionStorage.getItem("token");

      const axiosConfig = {
        method,
        url,
        ...(data && { data }),
        ...(params && { params }),
        headers: {
          "Content-Type": "application/json", // Adjust based on your API
          //Accept: "application/json",
          // Authorization: `Bearer ${token}`, // Uncomment if needed
        },
      };

      const result = await axios(axiosConfig);
      return result.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error fetching data from ${url}:`,
        error.message,
        error.stack
      );
      throw error; // Rethrow the error to propagate it
    }
  }, []);

  return [fetchData];
}

export default useFetch;
