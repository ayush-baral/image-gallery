import { useQuery } from "@tanstack/react-query";
import { apiCallHandler } from "../lib/api";
import { ImageData } from "../types";

export const useAllImageList = () => {
  const queryData = useQuery({
    queryKey: ["image-list"],
    queryFn: apiCallHandler<ImageData[], unknown>({
      method: "get",
      url: "/v2/list",
    }),
  });
  return queryData;
};
