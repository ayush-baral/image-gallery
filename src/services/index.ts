import { useQuery } from "@tanstack/react-query";

import { apiCallHandler } from "../lib/api";
import { ImageData } from "../types";

export const useAllImageList = (page: number, limit: number) => {
  const queryData = useQuery({
    queryKey: ["image-list", page, limit],
    queryFn: apiCallHandler<ImageData[], unknown>({
      method: "get",
      url: `/v2/list?page=${page}&limit=${limit}`,
    }),
  });
  return queryData;
};
