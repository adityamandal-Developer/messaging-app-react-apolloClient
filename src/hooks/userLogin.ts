import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../config/apollo-client";
import {
  INVALID_CREDENTIALS_ERROR_SNACK_MESSAGE,
  UNKNOWN_ERROR_MESSSAGE,
} from "../constants/errors";
import { snackVar } from "../utils/snack";
import { SUCCESS_LOGIN__SNACK_MESSAGE } from "../constants/success";
interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>();

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      if (res.status === 401) {
        setError("Invalid credentials");
        snackVar(INVALID_CREDENTIALS_ERROR_SNACK_MESSAGE);
      } else {
        setError(UNKNOWN_ERROR_MESSSAGE);
      }
      return;
    }
    setError("");
    snackVar(SUCCESS_LOGIN__SNACK_MESSAGE);
    await client.refetchQueries({ include: "active" });
  };
  return { login, error };
};

export { useLogin };
