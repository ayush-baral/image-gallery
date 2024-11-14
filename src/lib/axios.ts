import Axios, { type AxiosRequestConfig } from "axios";
import { BASE_URL } from "../config";

export function authRequestInterceptor(config: AxiosRequestConfig) {
  if (config.headers?.Accept !== undefined && config.headers?.Accept !== null) {
    config.headers.Accept = "application/json";
  }

  return config;
}

export const axios = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.interceptors.request.use(authRequestInterceptor as never);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);
