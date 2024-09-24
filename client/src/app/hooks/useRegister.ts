import { AxiosError } from "axios";
import { useState } from "react";
import { registerUserApi } from "../utils/api";
import { UserCredentialType } from "../types/types";
import { toast } from "sonner";

const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const register = async (credentials: UserCredentialType) => {
    setLoading(true);
    setError(null);
    try {
      await registerUserApi(credentials);
      toast.success("User created successfully.", {
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
    } finally {
      setLoading(false);
    }
  };
  return { register, loading, error };
};

export default useRegister;
