import { backendURL } from "@config/config";
import { useState } from "react";
import axios from "axios";
const useRegister = async ({ name, email, password }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  setIsLoading(true);
  await axios
    .post(`${backendURL}api/applicants`, { name, email, password })
    .then(() => setIsRegister(true))
    .then(() => setIsLoading(false))
    .catch(() => setError(true))
    .finally(() => setIsLoading(false));

    return {isRegister,isLoading,error}
};

export default useRegister;