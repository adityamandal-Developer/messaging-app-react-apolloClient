import { useState } from "react";
import client from "../config/apollo-client";
import { API_URL } from "../constants/urls";

const useLogout = () => {
  const [error, setError] = useState<string>();
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      setError("Ops! Something went wrong");
      return;
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };
  return { logout, error };
};

export { useLogout };
