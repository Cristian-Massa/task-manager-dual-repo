import { useState } from "react";
import { VITE_BACKEND_ENDPOINT } from "../config/envConfig";
import { useToast } from "../context/ToastContext";
import { Method } from "../types/methods";
import { ExpressValidatorError } from "../types/error";

export function useFetch<T>() {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [data, setData] = useState<T>();
  const doFetch = async function (
    endpoint: string,
    method: Method,
    body?: string
  ) {
    setIsLoading(true);
    fetch(`${VITE_BACKEND_ENDPOINT}/api/${endpoint}`, {
      method: method,
      credentials: "include",
      body: body,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        // Errors by server / database errors
        if (data.error) {
          addToast(data.error, "error");
          setErrors([...(errors ?? []), data.error]);
        }
        // Errors by express Validator (req values)
        else if (data.errors) {
          data.errors.forEach((error: ExpressValidatorError) => {
            addToast(error.msg, "error");
            setErrors([...(errors ?? []), error.msg]);
          });
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        setErrors([
          ...(errors ?? []),
          error || "Cannot comunicate with server",
        ]);
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  function clearErrors() {
    setErrors(null);
  }

  return { isLoading, data, doFetch, errors, clearErrors };
}
