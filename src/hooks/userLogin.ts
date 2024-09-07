import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../config/apollo-client";
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
      } else {
        setError("Ops! Something went wrong");
      }
      return;
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };
  return { login, error };
};

export { useLogin };
