import { useState } from "react";
import { VITE_BACKEND_ENDPOINT } from "../config/envConfig";
import { useToast } from "../context/ToastContext";
import { Method } from "../types/methods";
import { ExpressValidatorError } from "../types/error";

export function useFetch<T>() {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const doFetch = async function (
    endpoint: string,
    method: Method,
    body?: string
  ) {
    setIsLoading(true);
    fetch(`${VITE_BACKEND_ENDPOINT}/api/${endpoint}`, {
      method: method,
      body: body,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.errors) {
          data.errors.forEach((error: ExpressValidatorError) => {
            addToast(error.msg, "error");
          });
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  return { isLoading, data, doFetch };
}
