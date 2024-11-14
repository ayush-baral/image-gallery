import { axios } from "./axios";
import { AxiosResponse, isAxiosError } from "axios";

interface apiConfigDataType {
  url: string;
  method: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, unknown>;
}

export const apiCallHandler = <TData, TVariable>(
  apiConfig: apiConfigDataType
) => {
  return async (data?: TVariable): Promise<AxiosResponse<TData>> => {
    try {
      const response: AxiosResponse<TData> = await axios({
        method: apiConfig.method,
        url: apiConfig.url,
        params: apiConfig.queryParams,
        headers: {
          "Content-Type": "application/json",
          ...apiConfig.headers,
        },
        data,
      });
      return response;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return Promise.reject(error);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    }
  };
};
