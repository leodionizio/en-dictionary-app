"use client";
import { useEffect, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "../contexts/auth-context";

export const useApiClient = (): AxiosInstance => {
  const { token } = useContext(AuthContext);

  const client: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const authorizationToken = token || accessToken;

    if (authorizationToken) {
      client.defaults.headers["Authorization"] = `Bearer ${authorizationToken}`;
    }
  }, [token]);

  return client;
};
