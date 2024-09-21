import { AxiosError } from "axios";
import { useState } from "react";
import { loginUserApi } from "../utils/api";
import { UserCredentialType } from "../types/types";
import { toast } from "sonner";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const login = async (credentials: Partial<UserCredentialType>) => {
    setLoading(true);
    setError(null);
    try {
      await loginUserApi(credentials);
      toast.success("Login successfull.", {
        className: "text-green-500 text-base",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } else {
        setError("An unexpected error occurred");
      }
      throw err ? err : "Something went wrong.";
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
